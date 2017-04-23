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

        private bool cameraInitialized = false;

        // --------------- new program ----------------------

        // Constants
        private readonly string CONFIG_FILENAME = "egd_config.txt";

        // Resources 
        private Font font = Resources.GetFont(Resources.FontResources.NinaB);
        private Font fontArial18 = Resources.GetFont(Resources.FontResources.Arial_18);
        private Font fontConsolas24 = Resources.GetFont(Resources.FontResources.consolas_24);
        private Font fontConsolas72 = Resources.GetFont(Resources.FontResources.consolas_72);

        // Templates
        private Bitmap emptyTamplate;

        private byte threshold = 40;

        NetworkConnector gsm;
        MessagesSender messagesSender;


        // Config
        ConfigManager configManager;
        private string emptyTemplateFileName;
        private string containerId;
        private string containerAddress;

        // Method No. 1
        void ProgramStarted()
        {
            SDCardController sdCardController = new SDCardController(sdCard, display);
            sdCardController.CardMounted += sdCardController_CardMounted;
            sdCardController.EnsureCardIsMounted();

            // Async code. End point: Method No. 2

            #region

            //// initializing camera
            //camera.PictureCaptured += new Camera.PictureCapturedEventHandler(camera_PictureCaptured);
            //Thread.Sleep(1000);
            //camera.TakePicture();

            ////button1.ButtonPressed += new Button.ButtonEventHandler(button1_ButtonPressed);
            #endregion
        }

        // Method No. 2
        void sdCardController_CardMounted(SDCard sender, SDCardController sdController)
        {
            // Reading config
            string configText = sdController.GetTextFile(CONFIG_FILENAME);
            this.configManager = new ConfigManager(configText);

            this.emptyTamplate = sdController.GetTemplate(this.configManager.EmptyTemplatePath);

            if (this.emptyTamplate == null)
            {
                display.SimpleGraphics.Clear();
                display.SimpleGraphics.DisplayText("Template not found. Reload required.", font, GT.Color.Red, 0, 0);
                throw new EGDNoTemplateFile("Could not load template file. Check SD card content if EMPTY_TEMPLATE_FILENAME exists.");
            }

            // SD card initialized
            // Initializing GSM network

            this.gsm = new NetworkConnector(cellularRadio, display);
            this.gsm.NetworkRegistered += gsm_NetworkRegistered;
            this.gsm.EnsureNetwork();

            // Async code. End point: Method No. 3

            // delete after testing
            this.button.ButtonPressed += button_ButtonPressed;
        }

        // Method No. 3
        void gsm_NetworkRegistered(CellularRadio sender, NetworkConnector controller)
        {
            display.SimpleGraphics.Clear();
            display.SimpleGraphics.DisplayText("Connected to network", font, GT.Color.Red, 0, 0);

            this.cellularRadio.IncomingCall += cellularRadio_IncomingCall;

            // Initialing connected module
            // Enable incoming call information
            cellularRadio.SendATCommand("AT+CLIP=1");
            this.messagesSender = new MessagesSender(this.cellularRadio, this.gsm);
            this.messagesSender.MessagesDelivered += messagesSender_MessagesDelivered;
        }

        // Waiting for a trigger action - request of image comparision


        // Incomming call event
        void cellularRadio_IncomingCall(CellularRadio sender, string caller)
        {
            // Hanging incomming call
            this.cellularRadio.SendATCommand("ATH");

            // Removing '+' from caller id;
            if (caller[0] == '+')
            {
                caller = caller.Substring(1);
            }

            // Registering / unregistering contact
            int numberIndex = configManager.PhoneNumbers.IndexOf(caller);

            if (numberIndex >= 0)
            {
                configManager.PhoneNumbers.RemoveAt(numberIndex);
            }
            else
            {
                configManager.PhoneNumbers.Add(caller);
            }
        }

        void messagesSender_MessagesDelivered(CellularRadio cellular, NetworkConnector gsm)
        {
            display.SimpleGraphics.Clear();
            display.SimpleGraphics.DisplayText("All messages delivered.", font, GT.Color.Red, 0, 0);
        }

        // --------------- new program --------------------



        //void lifeCycleTimer_Tick(GT.Timer timer)
        //{
        //    led.TurnGreen();
        //    camera.TakePicture();
        //}

        // starts periodical check
        void button_ButtonPressed(Button sender, Button.ButtonState state)
        {
            //Bitmap x = BitmapComparer.BitmapToThresholdedBitmap(emptyTamplate, threshold);
            //display.SimpleGraphics.DisplayImage(this.emptyTamplate, 0, 0);
            this.messagesSender.SendMessages(this.configManager.PhoneNumbers, "Belekas :) :)");

            ////this.lifeCycleTimer.Start();
            //led.TurnGreen();
            //camera.TakePicture();
        }

        //private void readPhoneNumbers()
        //{
        //    GT.StorageDevice sdStorage = sdCard.GetStorageDevice();

        //    string phoneNumbersPath = "phone_numbers.txt";
        //    byte[] data = sdStorage.ReadFile(phoneNumbersPath);
        //    char[] characters = System.Text.Encoding.UTF8.GetChars(data);
        //    string text = new string(characters);
        //    string[] phoneNumbers = text.Split(',');

        //    foreach (string phoneNumber in phoneNumbers)
        //    {
        //        this.NUMBERS_TO_CONTACT.Add(phoneNumber);
        //    }
        //}

        //void camera_PictureCaptured(Camera sender, GT.Picture picture)
        //{
        //    if (this.cameraInitialized)
        //    {
        //        int x = 30;
        //        int x2 = 300;
        //        int y = 30;
        //        int y2 = 190;

        //        display.SimpleGraphics.DisplayImage(picture, 0, 0);
        //        led.TurnBlue();

        //        this.displayOutline(x, y, x2, y2);

        //        int matchResult = this.detector.CheckHowLoaded(picture.MakeBitmap(), threshold, MovementX, MovementY);
        //        this.setStatusByMatchResult(matchResult);


        //        string resultMessage = this.getMessageByStatus();
        //        this.displayMatch(resultMessage, matchResult, this.getColorByStatus());
        //        //this.sendMessage(resultMessage);

        //        Thread.Sleep(1000);

        //        led.TurnGreen();
        //    }
        //    else
        //    {
        //        this.cameraInitialized = true;
        //    }
        //}

        //private void sendMessage(string statusMessage)
        //{
        //    string formedMessage = CONTAINER_ID + " status: " + statusMessage + " Address: " + CONTAINER_ADDRESS;

        //    if (this.containerStatus == ContainerStatus.Full && !this.isFullMessageSent)
        //    {
        //        this.gsm.SendMessage(this.NUMBERS_TO_CONTACT, formedMessage);
        //        this.isFullMessageSent = true;
        //    }

        //    if (this.containerStatus == ContainerStatus.Overloaded && !this.isOverLoadedMessageSent)
        //    {
        //        this.gsm.SendMessage(this.NUMBERS_TO_CONTACT, formedMessage);
        //        this.isOverLoadedMessageSent = true;
        //    }
        //}

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