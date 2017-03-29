using System;
using System.Collections;
using System.Threading;
using Microsoft.SPOT;
using Microsoft.SPOT.Presentation;
using Microsoft.SPOT.Presentation.Controls;
using Microsoft.SPOT.Presentation.Media;
using Microsoft.SPOT.Presentation.Shapes;
using Microsoft.SPOT.Touch;

using Gadgeteer.Networking;
using GT = Gadgeteer;
using GTM = Gadgeteer.Modules;
using Gadgeteer.Modules.GHIElectronics;
using Gadgeteer.Modules.Seeed;
using System.Text;


namespace EGDRAPTOR
{
    public partial class Program
    {
        private ArrayList NUMBERS_TO_CONTACT = new ArrayList() { 
                "37064261586",
                "37069191020",
                "37061963244"
            };

        const string CONTAINER_ID = "c-kaunas-1";
        const string CONTAINER_ADDRESS = "K. Barsausko g. 59 51423, Kaunas, Lietuva";

        private int fullLimitNumber = 70;
        private int halfFullLimitNumber = 50;
        private int emptyLimitNumber = 25;

        private enum ContainerStatus
        {
            Empty,
            HalfFull,
            Full,
            Overloaded
        };

        private ContainerStatus containerStatus = ContainerStatus.Empty;
        private bool isOverLoadedMessageSent = false;
        private bool isFullMessageSent = false;

        // TODO: Implement life cycle
        private GT.Timer lifeCycleTimer = new GT.Timer(15000);      // single life cycle duration 15000 miliseconds


        private FezRaptor.GSMController gsm;

        private bool cameraInitialized = false;

        private Font font = Resources.GetFont(Resources.FontResources.NinaB);

        private Font fontArial18 = Resources.GetFont(Resources.FontResources.Arial_18);
        private Font fontConsolas24 = Resources.GetFont(Resources.FontResources.consolas_24);
        private Font fontConsolas72 = Resources.GetFont(Resources.FontResources.consolas_72);

        private string[] fileList = null;

        private int Threshold = 80;
        private int MovementX = 0;
        private int MovementY = 0;

        Microsoft.SPOT.Bitmap templateBitmap = null;

        Detector detector;

        void ProgramStarted()
        {
            this.gsm = new FezRaptor.GSMController(cellularRadio, true, led7c);

            this.lifeCycleTimer.Tick += lifeCycleTimer_Tick;

            button.ButtonPressed += new Button.ButtonEventHandler(button_ButtonPressed);

            // initializing camera
            camera.PictureCaptured += new Camera.PictureCapturedEventHandler(camera_PictureCaptured);
            Thread.Sleep(1000);
            camera.TakePicture();

            //button1.ButtonPressed += new Button.ButtonEventHandler(button1_ButtonPressed);

            // Do one-time tasks here
            Debug.Print("Program Started");
            led.TurnRed();

            // Getting empty garbage container pattern
            if (sdCard.IsCardInserted)
            {
                // Loads template from SD card
                this.templateBitmap = this.getEmptyTemplate();

                //this.readPhoneNumbers();

                // No template found indication
                if (templateBitmap == null)
                {
                    led.BlinkRepeatedly(GT.Color.Red);
                }

                led.BlinkRepeatedly(GT.Color.Green);
                this.detector = new Detector(templateBitmap);

                this.detector.PrepareTemplates(Threshold);

                Debug.Print("Ready");

                //this.getPhoneNumberFromFile();
                led.TurnGreen();
            }
            else
            {
                Debug.Print("No SDCard detected");
                led.BlinkRepeatedly(GT.Color.Blue);
            }
        }

        void lifeCycleTimer_Tick(GT.Timer timer)
        {
            led.TurnGreen();
            camera.TakePicture();
        }

        // starts periodical check
        void button_ButtonPressed(Button sender, Button.ButtonState state)
        {
            //this.lifeCycleTimer.Start();
            led.TurnGreen();
            camera.TakePicture();
        }

        //void button1_ButtonPressed(Button sender, Button.ButtonState state)
        //{
        //    // this button will be used to show a slideshow of the pictures on the SD card
        //    GT.StorageDevice sdStorage = sdCard.GetStorageDevice();
        //    fileList = sdStorage.ListRootDirectoryFiles();

        //    for (int i = 0; i < fileList.Length; i++)
        //    {
        //        if (fileList[i] != "._.Trashes")
        //        {
        //            Microsoft.SPOT.Bitmap picture = sdStorage.LoadBitmap(fileList[i], Bitmap.BitmapImageType.Bmp);
        //            display.SimpleGraphics.DisplayImage(picture, 0, 0);
        //            display.SimpleGraphics.DisplayText(fileList[i], font, GT.Color.Black, 10, 220);
        //            Thread.Sleep(1000);  // this code just used to wait one second (needs 'using System.Threading' at the top)
        //        }

        //    }
        //}

        private void readPhoneNumbers()
        {
            GT.StorageDevice sdStorage = sdCard.GetStorageDevice();

            string phoneNumbersPath = "phone_numbers.txt";
            byte[] data = sdStorage.ReadFile(phoneNumbersPath);
            char[] characters = System.Text.Encoding.UTF8.GetChars(data);
            string text = new string(characters);
            string[] phoneNumbers = text.Split(',');

            foreach (string phoneNumber in phoneNumbers)
            {
                this.NUMBERS_TO_CONTACT.Add(phoneNumber);
            }
        }

        private Bitmap getEmptyTemplate()
        {
            GT.StorageDevice sdStorage = sdCard.GetStorageDevice();
            fileList = sdStorage.ListRootDirectoryFiles();

            for (int i = 0; i < fileList.Length; i++)
            {
                if (fileList[i] != "._.Trashes")
                {
                    if (fileList[i].ToLower().IndexOf("sleep") >= 0)
                    {
                        return sdStorage.LoadBitmap(fileList[i], Bitmap.BitmapImageType.Bmp);
                    }
                }
            }

            return null;        // no template found
        }

        void camera_PictureCaptured(Camera sender, GT.Picture picture)
        {
            if (this.cameraInitialized)
            {
                int x = 7;
                int x2 = 308;
                int y = 43;
                int y2 = 183;

                display.SimpleGraphics.DisplayImage(picture, 0, 0);
                led.TurnBlue();

                this.displayOutline(x, y, x2, y2);

                int matchResult = this.detector.CheckHowLoaded(picture.MakeBitmap(), Threshold, MovementX, MovementY);
                this.setStatusByMatchResult(matchResult);


                string resultMessage = this.getMessageByStatus();
                this.displayMatch(resultMessage, matchResult, this.getColorByStatus());
                this.sendMessage(resultMessage);

                Thread.Sleep(1000);

                led.TurnGreen();
            }
            else
            {
                this.cameraInitialized = true;
            }
        }

        private void sendMessage(string statusMessage)
        {
            string formedMessage = CONTAINER_ID + " status: " + statusMessage + " Address: " + CONTAINER_ADDRESS;

            if (this.containerStatus == ContainerStatus.Full && !this.isFullMessageSent)
            {
                this.gsm.SendMessage(this.NUMBERS_TO_CONTACT, formedMessage);
                this.isFullMessageSent = true;
            }

            if (this.containerStatus == ContainerStatus.Overloaded && !this.isOverLoadedMessageSent)
            {
                this.gsm.SendMessage(this.NUMBERS_TO_CONTACT, formedMessage);
                this.isOverLoadedMessageSent = true;
            }
        }

        private void setStatusByMatchResult(int matchResult)
        {
            if (matchResult >= this.fullLimitNumber)
            {
                containerStatus = ContainerStatus.Overloaded;
            }
            else
            {
                if (matchResult < this.fullLimitNumber && matchResult >= this.halfFullLimitNumber)
                {
                    containerStatus = ContainerStatus.Full;
                }
                else
                {
                    if (matchResult < this.halfFullLimitNumber && matchResult >= this.emptyLimitNumber)
                    {
                        containerStatus = ContainerStatus.HalfFull;

                        this.isOverLoadedMessageSent = false;
                        this.isFullMessageSent = false;
                    }
                    else
                    {
                        containerStatus = ContainerStatus.Empty;
                        this.isOverLoadedMessageSent = false;
                        this.isFullMessageSent = false;
                    }
                }
            }
        }

        private GT.Color getColorByStatus()
        {
            switch (this.containerStatus)
            {
                default:
                case ContainerStatus.Empty:
                    {
                        return GT.Color.Green;
                    }
                case ContainerStatus.HalfFull:
                    {
                        return GT.Color.Orange;
                    }
                case ContainerStatus.Full:
                case ContainerStatus.Overloaded:
                    {
                        return GT.Color.Red;
                    }
            }
        }

        private string getMessageByStatus()
        {
            switch (this.containerStatus)
            {
                default:
                case ContainerStatus.Empty:
                    {
                        return "Container is empty.";
                    }
                case ContainerStatus.HalfFull:
                    {
                        return "Container is half full.";
                    }
                case ContainerStatus.Full:
                    {
                        return "Container is full.";
                    }
                case ContainerStatus.Overloaded:
                    {
                        return "Container is overloaded.";
                    }
            }
        }

        private void displayOutline(int x, int y, int x2, int y2)
        {
            display.SimpleGraphics.DisplayLine(GT.Color.Red, 1, x, y, x, y2);
            display.SimpleGraphics.DisplayLine(GT.Color.Red, 1, x2, y, x2, y2);

            display.SimpleGraphics.DisplayLine(GT.Color.Red, 1, x, y, x2, y);
            display.SimpleGraphics.DisplayLine(GT.Color.Red, 1, x, y2, x2, y2);
        }

        private void displayMatch(string text, int matchResult, GT.Color color)
        {
            display.SimpleGraphics.DisplayRectangle(GT.Color.White, 0, color, 0, 200, 320, 40);
            display.SimpleGraphics.DisplayText(text, fontArial18, GT.Color.White, 40, 208);
        }
    }
}