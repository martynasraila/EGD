using System;
using Microsoft.SPOT;

using Gadgeteer.Modules.Seeed;
using GT = Gadgeteer;
using System.Threading;
using System.Collections;
using Gadgeteer.Modules.GHIElectronics;

namespace FezRaptor
{
    class GSMControllerDep
    {
        private bool showDebugMessages = false;
        private CellularRadio module;

        private int startupDuration = 0;//40;        // seconds

        private bool isGSMRegistered = false;

        private GT.Timer unsentMessagesTimer = new GT.Timer(2000);   // every 2 seconds retrying message
        private ArrayList unsentMessages = new ArrayList();

        private MulticolorLed led;

        public GSMControllerDep(CellularRadio module, bool showDebugMessages, MulticolorLed led)
        {
            this.led = led;

            this.led.TurnBlue();

            this.module = module;

            this.addEventListeners();

            this.showDebugMessages = showDebugMessages;

            module.DebugPrintEnabled = true;


            module.PowerOn(startupDuration);

            GT.Timer startupTimer = new GT.Timer(this.startupDuration * 1000);      // startupDuraton * 1000 miliseconds
            startupTimer.Tick += startupTimer_Tick;
            startupTimer.Start();

            this.unsentMessagesTimer.Tick += unsentMessagesTimer_Tick;
        }

        void unsentMessagesTimer_Tick(GT.Timer timer)
        {
            if (this.isGSMRegistered)
            {
                timer.Stop();

                foreach (SMSMessage message in this.unsentMessages)
                {
                    this.module.SendSms(message.PhoneNumber, message.Text);
                    Debug.Print("Sending message: " + message.PhoneNumber + " " + message.Text);
                }

                this.unsentMessages.Clear();
            }
            else
            {
                return;
            }
        }

        void startupTimer_Tick(GT.Timer timer)
        {
            Thread powerOnThread = new Thread(new ThreadStart(PowerOnSequenceThread));
            powerOnThread.Start();
            timer.Stop();
        }

        /// <summary>
        /// Sends SMS
        /// </summary>
        /// <param name="phoneNumber">Phone number for example (370691919020)</param>
        /// <param name="text">Message text</param>
        /// <returns>Wether message was sent</returns>
        public bool SendMessage(string phoneNumber, string text)
        {
            return this.SendMessage(new ArrayList() { phoneNumber }, text);
        }

        /// <summary>
        /// Sends SMSs
        /// </summary>
        /// <param name="phoneNumbers">Array list of phone numbers for example (370691919020)</param>
        /// <param name="text">Message text</param>
        /// <returns>Wether message was sent</returns>
        public bool SendMessage(ArrayList phoneNumbers, string text)
        {
            if (this.isGSMRegistered)
            {
                foreach (string phoneNumber in phoneNumbers)
                {
                    this.module.SendSms(phoneNumber, text);
                    Debug.Print("Sending message: " + phoneNumber + " " + text);
                    Thread.Sleep(5000);
                }


                Debug.Print("Messages have been sent.");
                return true;
            }
            else
            {
                Debug.Print("Unable to sent messages");
                foreach (string phoneNumber in phoneNumbers)
                {
                    this.unsentMessages.Add(new SMSMessage(phoneNumber, text));
                }

                this.unsentMessagesTimer.Start();
                return false;
            }
        }

        // maybe unnecessary
        private void PowerOnSequenceThread()
        {
            // Enable GSM network registration status
            this.module.SendATCommand("AT+CREG=1");

            // Enable GPRS network registration status
            this.module.SendATCommand("AT+CGREG=1");

            //Set SMS mode to text
            this.module.SendATCommand("AT+CMGF=1");
        }

        private void addEventListeners()
        {
            this.module.ModuleInitialized += new CellularRadio.ModuleInitializedHandler(module_ModuleInitialized);
            this.module.SmsReceived += new CellularRadio.SmsReceivedHandler(module_NewSMSEvent);
            this.module.SmsRetrieved += new CellularRadio.SmsRetrievedHandler(module_SMSReady);

            this.module.GprsNetworkRegistrationChanged += new CellularRadio.GprsNetworkRegistrationChangedHandler(module_GprsNetworkRegistrationChanged);
            this.module.GsmNetworkRegistrationChanged += new CellularRadio.GsmNetworkRegistrationChangedHandler(module_GsmNetworkRegistrationChanged);
            this.module.OperatorRetrieved += new CellularRadio.OperatorRetrievedHandler(module_OperatorReady);
            this.module.ResponseRetrieved += module_ResponseRetrieved;
        }

        void module_ResponseRetrieved(CellularRadio sender, string response)
        {
            Debug.Print(response);
        }

        void module_GsmNetworkRegistrationChanged(CellularRadio sender, CellularRadio.NetworkRegistrationState networkState)
        {
            if (Enum.Equals(networkState, CellularRadio.NetworkRegistrationState.Registered))
            {
                Debug.Print("NetworkRegistrationState -->" + networkState.ToString());
                this.led.TurnGreen();
                this.isGSMRegistered = true;
            }
            else
            {
                this.led.TurnBlue();
                this.isGSMRegistered = false;
            }

            Debug.Print("NetworkRegistrationState (notRegistered) ++>" + networkState.ToString());
        }

        void module_GprsNetworkRegistrationChanged(CellularRadio sender, CellularRadio.NetworkRegistrationState networkState)
        {
            Debug.Print("PROGRAM: Gprs Network Registration Changed");
        }

        void module_OperatorReady(CellularRadio sender, string operatorName)
        {
            if (operatorName != null)
                Debug.Print("OPERATOR: " + operatorName);
            else
                Debug.Print("NO OPERATOR WAS FOUND");
        }

        void module_ModuleInitialized(CellularRadio sender)
        {
            Debug.Print("MODULE INITIALIZED");
        }

        void module_SMSReady(CellularRadio sender, CellularRadio.Sms message)
        {
            Debug.Print("SMS READY");
        }

        void module_NewSMSEvent(CellularRadio sender, CellularRadio.Sms message)
        {
            Debug.Print("SMS NEW EVENT");
        }
    }

    class SMSMessage
    {
        public SMSMessage(string phoneNumber, string text)
        {
            PhoneNumber = phoneNumber;
            Text = text;
        }

        public string PhoneNumber
        {
            get;
            set;
        }

        public string Text
        {
            get;
            set;
        }
    }
}
