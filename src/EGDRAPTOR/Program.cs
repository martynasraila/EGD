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

// TODO: camera class, camera initialization
// TODO: LED indicators class, define LED indicators values 

// State
// IsCardMounted



namespace EGDRAPTOR
{
    public class EGDNoTemplateFile : System.Exception
    {
        public EGDNoTemplateFile() : base() { }
        public EGDNoTemplateFile(string message) : base(message) { }
        public EGDNoTemplateFile(string message, System.Exception inner) : base(message, inner) { }
    }

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


        private FezRaptor.GSMControllerDep gsm;

        private bool cameraInitialized = false;


        private Font fontArial18 = Resources.GetFont(Resources.FontResources.Arial_18);
        private Font fontConsolas24 = Resources.GetFont(Resources.FontResources.consolas_24);
        private Font fontConsolas72 = Resources.GetFont(Resources.FontResources.consolas_72);

        private string[] fileList = null;

        private int MovementX = 0;
        private int MovementY = 0;

        Microsoft.SPOT.Bitmap templateBitmap = null;

        Detector detector;

        // --------------- new program ----------------------

        // TODO: move constants to config
        // Constants
        private readonly string EMPTY_TEMPLATE_FILENAME = "empty_container_template.bmp";

        // Resources 
        private Font font = Resources.GetFont(Resources.FontResources.NinaB);

        // Templates
        private Bitmap emptyTamplate;


        private byte threshold = 40;


        // Method No. 1
        void ProgramStarted()
        {
            SDCardController sdCardController = new SDCardController(sdCard, display);
            sdCardController.CardMounted += sdCardController_CardMounted;
            sdCardController.EnsureCardIsMounted();

            // Async code. End point: Method No. 2

            #region
            //this.gsm = new FezRaptor.GSMController(cellularRadio, true, multicolorLed);


            //this.lifeCycleTimer.Tick += lifeCycleTimer_Tick;

            //button.ButtonPressed += new Button.ButtonEventHandler(button_ButtonPressed);

            //// initializing camera
            //camera.PictureCaptured += new Camera.PictureCapturedEventHandler(camera_PictureCaptured);
            //Thread.Sleep(1000);
            //camera.TakePicture();

            ////button1.ButtonPressed += new Button.ButtonEventHandler(button1_ButtonPressed);
            #endregion
        }

        // Method No. 2
        void sdCardController_CardMounted(SDCard sender, SDCardController controller)
        {
            this.emptyTamplate = controller.GetTemplate(EMPTY_TEMPLATE_FILENAME);

            if (this.emptyTamplate == null)
            {
                throw new EGDNoTemplateFile("Could not load template file. Check SD card content if EMPTY_TEMPLATE_FILENAME exists.");
            }


        }

        // --------------- new program --------------------



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

        void camera_PictureCaptured(Camera sender, GT.Picture picture)
        {
            if (this.cameraInitialized)
            {
                int x = 30;
                int x2 = 300;
                int y = 30;
                int y2 = 190;

                display.SimpleGraphics.DisplayImage(picture, 0, 0);
                led.TurnBlue();

                this.displayOutline(x, y, x2, y2);

                int matchResult = this.detector.CheckHowLoaded(picture.MakeBitmap(), threshold, MovementX, MovementY);
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