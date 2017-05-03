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

// For testing

// TODO: LED indicators class, define LED indicators values ?

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

        private bool isOverLoadedMessageSent = false;
        private bool isFullMessageSent = false;

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

        private NetworkConnector gsm;
        private MessagesSender messagesSender;
        private CameraController cameraController;

        private WorkMode mode = WorkMode.Work;

        enum WorkMode
        {
            Demo,
            Work
        }

        private enum ContainerStatus
        {
            Empty,
            HalfFull,
            Full,
            Overloaded
        };

        private ContainerStatus containerStatus = ContainerStatus.Empty;

        // Config
        ConfigManager configManager;

        // Method No. 1
        void ProgramStarted()
        {
            SDCardController sdCardController = new SDCardController(sdCard, display);
            sdCardController.CardMounted += sdCardController_CardMounted;
            sdCardController.EnsureCardIsMounted();

            // Async code. End point: Method No. 2
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

            this.gsm = new NetworkConnector(cellularRadio, display);
            this.gsm.NetworkRegistered += gsm_NetworkRegistered;
            this.gsm.EnsureNetwork();

            // Async code. End point: Method No. 3
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

            // Async code. End point Method 4.
            this.cameraController = new CameraController(camera, display);
            this.cameraController.CameraInitialized += cameraController_CameraInitialized;
        }

        // Method No. 4
        void cameraController_CameraInitialized(CameraController cameraController, Camera camera)
        {
            display.SimpleGraphics.Clear();
            display.SimpleGraphics.DisplayText("Camera initialized", font, GT.Color.Red, 0, 0);
            this.cameraController.PictureTaken += cameraController_PictureTaken;

            // Adding picture taking button event
            this.button.ButtonPressed += button_ButtonPressed;

            // Adding demo button event
            this.button2.ButtonPressed += button2_ButtonPressed;
        }

        // Waiting for a trigger action - request of demo or work or incomming call.

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

        // Demo event
        void button2_ButtonPressed(Button sender, Button.ButtonState state)
        {
            this.mode = WorkMode.Demo;
            this.cameraController.TakePicture();
        }

        // Button for taking a photo
        void button_ButtonPressed(Button sender, Button.ButtonState state)
        {
            this.cameraController.TakePicture();
        }

        void cameraController_PictureTaken(CameraController cameraController, Bitmap picture)
        {
            switch (this.mode)
            {
                case WorkMode.Work:
                    {
                        display.SimpleGraphics.DisplayImage(this.emptyTemplate, 0, 0);
                        this.displayOutline(configManager.Padding);

                        Thread.Sleep(2000);

                        display.SimpleGraphics.DisplayImage(picture, 0, 0);
                        this.displayOutline(configManager.Padding);
                    } break;
                case WorkMode.Demo:
                    {
                        int sleepTime = 3000;
                        // Displaying emptyTemplate
                        display.SimpleGraphics.DisplayImage(this.emptyTemplate, 0, 0);
                        this.displayOutline(configManager.Padding);

                        Thread.Sleep(sleepTime);

                        // Displaying grayscale version of an empty template
                        display.SimpleGraphics.DisplayImage(BitmapComparer.BitmapToGrayscale(this.emptyTemplate), 0, 0);

                        Thread.Sleep(sleepTime);

                        // Displaying thresholded version of an empty template
                        display.SimpleGraphics.DisplayImage(BitmapComparer.BitmapToThresholdedBitmap(this.emptyTemplate, threshold), 0, 0);

                        Thread.Sleep(sleepTime);

                        // Displaying picture of a full container
                        display.SimpleGraphics.DisplayImage(picture, 0, 0);

                        // Displaying grayscale version of a full container
                        display.SimpleGraphics.DisplayImage(BitmapComparer.BitmapToGrayscale(picture), 0, 0);

                        Thread.Sleep(sleepTime);

                        // Displaying thresholded version of a full container
                        display.SimpleGraphics.DisplayImage(BitmapComparer.BitmapToThresholdedBitmap(picture, threshold), 0, 0);

                        Thread.Sleep(sleepTime);
                    } break;
            }

            double match = BitmapComparer.CompareBitmapsFast(this.emptyTemplate, picture, threshold, configManager.Padding);

            setStatusByMatchResult(match);

            string statusString = this.getMessageByStatus();

            this.displayMatch(statusString, this.getColorByStatus());

            string messageString = this.generateMessageString(statusString, configManager.ContainerId, configManager.ContainerId);

            if (this.containerStatus == ContainerStatus.Full)
            {
                if (!this.isFullMessageSent)
                {
                    this.messagesSender.SendMessages(configManager.PhoneNumbers, messageString);
                    this.isFullMessageSent = true;
                }
            }
            else
            {
                if (this.containerStatus == ContainerStatus.Overloaded)
                {
                    if (!this.isOverLoadedMessageSent)
                    {
                        this.messagesSender.SendMessages(configManager.PhoneNumbers, messageString);
                        this.isOverLoadedMessageSent = true;
                    }
                }
                else
                {
                    this.isFullMessageSent = false;
                    this.isOverLoadedMessageSent = false;
                }
            }
        }

        string generateMessageString(string containerStatusString, string containerId, string containerAddress)
        {
            return containerStatusString + "\r\nContainer Id: " + containerId + "\r\nLocation: " + containerAddress;
        }
        // All messages delivered
        void messagesSender_MessagesDelivered(CellularRadio cellular, NetworkConnector gsm)
        {
            display.SimpleGraphics.Clear();
            display.SimpleGraphics.DisplayText("All messages delivered.", font, GT.Color.Red, 0, 0);
        }
        #endregion


        private void setStatusByMatchResult(double matchResult)
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

            display.SimpleGraphics.DisplayRectangle(
                lineColor, thickness, GT.Color.Black,
                (uint)padding.Left,
                (uint)padding.Top,
                (uint)(display.Width - padding.Left - padding.Right),
                (uint)(display.Height - padding.Top - padding.Bottom),
                fillOpacity
            );
        }

        private void displayMatch(string text, GT.Color color)
        {
            display.SimpleGraphics.DisplayRectangle(GT.Color.White, 0, color, 0, 200, 320, 40);
            display.SimpleGraphics.DisplayText(text, fontArial18, GT.Color.White, 40, 208);
        }
    }
}