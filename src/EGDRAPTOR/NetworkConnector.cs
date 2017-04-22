using System;
using Microsoft.SPOT;
using Gadgeteer.Modules.GHIElectronics;
using Gadgeteer.Modules.Seeed;
using GT = Gadgeteer;

namespace EGDRAPTOR
{
    class NetworkConnector
    {
        const int NETWORK_CONNECTION_TICK_TIME = 1000;
        const int KEEP_CONNECTION_ALIVE_TICK_TIME = 5000;

        // State
        private CellularRadio.NetworkRegistrationState gsmState;
        private CellularRadio.NetworkRegistrationState gprsState;

        private CellularRadio gsm;

        private Font mainFont = Resources.GetFont(Resources.FontResources.NinaB);
        private Display_T35 display;

        public NetworkConnector(CellularRadio gsm, Display_T35 display)
        {
            this.gsm = gsm;
            this.display = display;
            gsm.GsmNetworkRegistrationChanged += gsm_GsmNetworkRegistrationChanged;
            gsm.GprsNetworkRegistrationChanged += gsm_GprsNetworkRegistrationChanged;

            gsm.DebugPrintEnabled = true;
            gsm.PowerOn(1);
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
                GT.Timer networkConnectionTimer = new GT.Timer(NETWORK_CONNECTION_TICK_TIME);
                networkConnectionTimer.Tick += networkConnectionTimer_Tick;
                networkConnectionTimer.Start();
            }
        }

        void networkConnectionTimer_Tick(GT.Timer timer)
        {
            if (IsRegisteredToNetwork())
            {
                timer.Stop();
                timer = null;

                GT.Timer connectionAliveTimer = new GT.Timer(KEEP_CONNECTION_ALIVE_TICK_TIME);
                connectionAliveTimer.Tick += keepConnectionAliveTimerTick;
                connectionAliveTimer.Start();

                NetworkRegistered(this.gsm, this);
            }
            else
            {
                this.displayFailedConnectToNetworkError();
                this.RegisterToNetwork();
            }
        }

        void keepConnectionAliveTimerTick(GT.Timer timer)
        {
            if (!IsRegisteredToNetwork())
            {
                timer.Stop();
                this.displayFailedConnectToNetworkError();
                GT.Timer networkConnectionTimer = new GT.Timer(NETWORK_CONNECTION_TICK_TIME);
                networkConnectionTimer.Tick += networkConnectionTimer_Tick;
                networkConnectionTimer.Start();
            }
        }

        private void displayFailedConnectToNetworkError()
        {
            display.SimpleGraphics.Clear();
            display.SimpleGraphics.DisplayText("Connecting to network.", mainFont, GT.Color.Red, 0, 0);
        }

        public bool IsRegisteredToNetwork()
        {
            return gsmState == CellularRadio.NetworkRegistrationState.Registered;
            //&&
            //    gprsState == CellularRadio.NetworkRegistrationState.Registered;
        }

        public void RegisterToNetwork()
        {
            // Forcing registration to network if unregistered yet
            if (this.gsmState != CellularRadio.NetworkRegistrationState.Registered)
            {
                this.gsm.SendATCommand("AT+CREG=1");
            }
            //else
            //{
            //    if (this.gprsState != CellularRadio.NetworkRegistrationState.Registered)
            //    {
            //        this.gsm.SendATCommand("AT+CGREG=1");
            //    }
            //}
        }

        public event NetworkRegisteredHandler NetworkRegistered;

        public delegate void NetworkRegisteredHandler(CellularRadio sender, NetworkConnector controller);
    }
}
