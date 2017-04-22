using System;
using Microsoft.SPOT;
using Gadgeteer.Modules.GHIElectronics;
using Gadgeteer.Modules.Seeed;
using GT = Gadgeteer;

namespace EGDRAPTOR
{
    class GSMController
    {
        // State
        private CellularRadio.NetworkRegistrationState gsmState;
        private CellularRadio.NetworkRegistrationState gprsState;

        private CellularRadio gsm;

        private Font mainFont = Resources.GetFont(Resources.FontResources.NinaB);
        private Display_T35 display;

        public GSMController(CellularRadio gsm, Display_T35 display)
        {
            this.gsm = gsm;
            this.display = display;
            gsm.GsmNetworkRegistrationChanged += gsm_GsmNetworkRegistrationChanged;
            gsm.GprsNetworkRegistrationChanged += gsm_GprsNetworkRegistrationChanged;

            gsm.PowerOn(1000);
        }

        void gsm_GprsNetworkRegistrationChanged(CellularRadio sender, CellularRadio.NetworkRegistrationState networkState)
        {
            this.gprsState = networkState;
        }

        void gsm_GsmNetworkRegistrationChanged(CellularRadio sender, CellularRadio.NetworkRegistrationState networkState)
        {
            this.gsmState = networkState;
        }

        public void EnsureNetwork()
        {
            if (IsRegisteredToNetwork())
            {
                NetworkRegistered(this.gsm, this);
            }
            else
            {
                this.displayFailedConnectToNetworkError();
                GT.Timer networkConnectionTimer = new GT.Timer(500);
                networkConnectionTimer.Tick += networkConnectionTimer_Tick;
                networkConnectionTimer.Start();
            }
        }

        void networkConnectionTimer_Tick(GT.Timer timer)
        {
            if (IsRegisteredToNetwork())
            {
                timer.Stop();
                NetworkRegistered(this.gsm, this);
                timer = new GT.Timer(2000);
                timer.Tick += networkConnectionTimer_Tick;
                timer.Start();
            }
            else
            {
                timer.Stop();
                timer = new GT.Timer(500);
                timer.Start();
                this.displayFailedConnectToNetworkError();
                this.RegisterToNetwork();
            }
        }

        private void displayFailedConnectToNetworkError()
        {
            display.SimpleGraphics.DisplayText("Failed to connect to network.", mainFont, GT.Color.Red, 0, 0);
        }

        public bool IsRegisteredToNetwork()
        {
            return gsmState == CellularRadio.NetworkRegistrationState.Registered &&
                gprsState == CellularRadio.NetworkRegistrationState.Registered;
        }

        public void RegisterToNetwork()
        {
            // TODO: fill this
        }

        public event NetworkRegisteredHandler NetworkRegistered;

        public delegate void NetworkRegisteredHandler(CellularRadio sender, GSMController controller);
    }
}
