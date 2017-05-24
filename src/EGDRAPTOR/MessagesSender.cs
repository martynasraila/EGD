using System;
using Microsoft.SPOT;
using Gadgeteer.Modules.Seeed;
using System.Collections;
using System.Threading;

namespace EGDRAPTOR
{
    class MessagesSender
    {
        private CellularRadio cellular;
        private NetworkConnector gsm;

        private Stack numbersStack;
        private string message;

        public MessagesSender(CellularRadio cellular, NetworkConnector gsm)
        {
            this.numbersStack = new Stack();
            this.cellular = cellular;
            this.gsm = gsm;

            this.cellular.SmsSent += cellular_SmsSent;
        }

        private void cellular_SmsSent(CellularRadio sender, bool success, string messageReference)
        {
            Thread.Sleep(5000);
            this.sendMessage();
        }

        public void SendMessages(ArrayList numbers, string message)
        {
            this.message = message;

            for (int i = 0; i < numbers.Count; i++)
            {
                this.numbersStack.Push(numbers[i]);
            }

            this.sendMessage();
        }

        private void sendMessage()
        {
            if (numbersStack.Count > 0)
            {
                string number = (string)numbersStack.Pop();
                this.cellular.SendSms(number, this.message);
            }
            else
            {
                this.message = null;
                OnMessagesDelivered(cellular, gsm);
            }
        }

        public event MessageDeliveredHandler MessagesDelivered;
        public delegate void MessageDeliveredHandler(CellularRadio cellular, NetworkConnector gsm);
        private MessageDeliveredHandler onMessagesDelivered;

        public void OnMessagesDelivered(CellularRadio cellural, NetworkConnector gsm)
        {
            if (onMessagesDelivered == null) onMessagesDelivered = new MessageDeliveredHandler(MessagesDelivered);
            if (Program.CheckAndInvoke(MessagesDelivered, onMessagesDelivered, cellular, gsm))
            {
                MessagesDelivered(cellular, gsm);
            }
        }
    }
}
