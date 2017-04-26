﻿using System;
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

// For testing
//using System.Diagnostics;

// TODO: camera class, camera initialization
// TODO: LED indicators class, define LED indicators values ?
// Detector controller?

// State
// IsCardMounted
// IsConnectedToNetwork



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
        // Move to config
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
        private Bitmap emptyTemplate;

        private byte threshold = 40;

        NetworkConnector gsm;
        MessagesSender messagesSender;


        // Config
        ConfigManager configManager;

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
            display.SimpleGraphics.Clear();
            display.SimpleGraphics.DisplayText("SD card mounted", font, GT.Color.Red, 0, 0);

            // Reading config
            string configText = sdController.GetTextFile(CONFIG_FILENAME);
            this.configManager = new ConfigManager(configText);

            this.emptyTemplate = sdController.GetTemplate(this.configManager.EmptyTemplatePath);

            if (this.emptyTemplate == null)
            {
                display.SimpleGraphics.Clear();
                display.SimpleGraphics.DisplayText("Template not found. Reload required.", font, GT.Color.Red, 0, 0);
                throw new EGDNoTemplateFile("Could not load template file. Check SD card content if EMPTY_TEMPLATE_FILENAME exists.");
            }

            // SD card initialized
            // Initializing GSM network

            //this.gsm = new NetworkConnector(cellularRadio, display);
            //this.gsm.NetworkRegistered += gsm_NetworkRegistered;
            //this.gsm.EnsureNetwork();

            // Async code. End point: Method No. 3

            // 
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

        #region Registering / unregistering phone numbers
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
        #endregion

        #region Async cycle

        // Picture taken event simulation
        void button_ButtonPressed(Button sender, Button.ButtonState state)
        {

            //this.displayOutline(configManager.Padding);
            var x = sdCard.GetStorageDevice();
            var y = x.LoadBitmap("test_comparing_photo.bmp", Bitmap.BitmapImageType.Bmp);

            //display.SimpleGraphics.DisplayLine(GT.Color.Red, 2, 10, 10, 10, 310);
            //display.SimpleGraphics.DisplayText("SOMETHING", font, GT.Color.Red, 10, 20);

            //display.SimpleGraphics.DisplayImage(BitmapComparer.BitmapToThresholdedBitmap(this.emptyTemplate, threshold), 0, 0);


            //Detector detector = new Detector(this.emptyTemplate);

            //Debug.Print("Before PrepareTemplate " + System.DateTime.Now.ToString());


            //detector.GrayscaleTemplates();
            //detector.PrepareTemplates(threshold);



            //Debug.Print("After PrepareTemplate " + System.DateTime.Now.ToString());
            //Debug.Print("\r\n");
            //Debug.Print("Before checkHowLoaded" + System.DateTime.Now.ToString());
            //Debug.Print(detector.CheckHowLoaded(y, threshold, 0, 0).ToString());
            //Debug.Print("After checkHowLoader " + System.DateTime.Now.ToString());
            //Debug.Print("\r\n");
            Debug.Print("Before CompareFast" + System.DateTime.Now.ToString());
            Debug.Print(BitmapComparer.CompareBitmapsFast(this.emptyTemplate, y, threshold, configManager.Padding).ToString());
            Debug.Print("After checkHowLoaded" + System.DateTime.Now.ToString());

            //Thread.Sleep(3000);

            //display.SimpleGraphics.DisplayImage(BitmapComparer.BitmapToThresholdedBitmap(y, threshold), 0, 0);

            //double matchFast = BitmapComparer.CompareBitmapsFast(this.emptyTemplate, y, threshold);

            //double match = BitmapComparer.CompareBitmaps(this.emptyTemplate, y, threshold);

            //display.SimpleGraphics.Clear();
            //display.SimpleGraphics.DisplayText(match.ToString(), font, GT.Color.Red, 0, 0);


            //this.messagesSender.SendMessages(this.configManager.PhoneNumbers, "Belekas :) :)");

            //camera.TakePicture();
        }

        // All messages delivered
        void messagesSender_MessagesDelivered(CellularRadio cellular, NetworkConnector gsm)
        {
            display.SimpleGraphics.Clear();
            display.SimpleGraphics.DisplayText("All messages delivered.", font, GT.Color.Red, 0, 0);
        }
        #endregion

        // --------------- new program --------------------



        //void lifeCycleTimer_Tick(GT.Timer timer)
        //{
        //    led.TurnGreen();
        //    camera.TakePicture();
        //}

        // starts periodical check
        //void button_ButtonPressed(Button sender, Button.ButtonState state)
        //{
        //    //Bitmap x = BitmapComparer.BitmapToThresholdedBitmap(emptyTamplate, threshold);
        //    //display.SimpleGraphics.DisplayImage(this.emptyTamplate, 0, 0);
        //    this.messagesSender.SendMessages(this.configManager.PhoneNumbers, "Belekas :) :)");

        //    ////this.lifeCycleTimer.Start();
        //    //led.TurnGreen();
        //    //camera.TakePicture();
        //}

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

        private void displayOutline(Padding padding)
        {

            GT.Color lineColor = GT.Color.Red;
            uint thickness = 2;
            ushort fillOpacity = 0;

            display.SimpleGraphics.DisplayImage(this.emptyTemplate, 0, 0);
            display.SimpleGraphics.DisplayRectangle(
                lineColor, thickness, GT.Color.Black,
                (uint)padding.Left,
                (uint)padding.Top,
                (uint)(display.Width - padding.Left - padding.Right),
                (uint)(display.Height - padding.Top - padding.Bottom),
                fillOpacity
            );
        }

        private void displayMatch(string text, int matchResult, GT.Color color)
        {
            display.SimpleGraphics.DisplayRectangle(GT.Color.White, 0, color, 0, 200, 320, 40);
            display.SimpleGraphics.DisplayText(text, fontArial18, GT.Color.White, 40, 208);
        }
    }
}