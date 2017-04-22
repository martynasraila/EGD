using System;
using Microsoft.SPOT;
using Gadgeteer.Modules.GHIElectronics;
using GT = Gadgeteer;
using System.Threading;

namespace EGDRAPTOR
{
    public class SDCardNotInsertedException : System.Exception
    {
        public SDCardNotInsertedException() : base() { }
        public SDCardNotInsertedException(string message) : base(message) { }
        public SDCardNotInsertedException(string message, System.Exception inner) : base(message, inner) { }
    }

    class SDCardController
    {
        private SDCard sdCard;

        private Display_T35 display;
        private Font mainFont = Resources.GetFont(Resources.FontResources.NinaB);

        public SDCardController(SDCard sdCard, Display_T35 display)
        {
            this.sdCard = sdCard;
            this.display = display;

            // checking if card inserted INITIALLY
            if (sdCard.IsCardInserted == false)
            {
                display.SimpleGraphics.DisplayText("No card on start up.", mainFont, GT.Color.Red, 0, 0);
            }
        }

        public void EnsureCardIsMounted()
        {
            if (sdCard.IsCardMounted == false)
            {
                sdCard.SDCardMounted += sdCard_SDCardMounted;

                GT.Timer cardMountTimer = new GT.Timer(1000);
                cardMountTimer.Tick += cardMountTimer_Tick;
                cardMountTimer.Start();
                this.displayFailedToMountError();
            }
            else
            {
                this.CardMounted(sdCard, this);
            }
        }

        private void cardMountTimer_Tick(GT.Timer timer)
        {
            if (sdCard.IsCardMounted)
            {
                timer.Stop();
            }
            else
            {
                sdCard.MountSDCard();
                this.displayFailedToMountError();
            }
        }

        private void displayFailedToMountError()
        {
            display.SimpleGraphics.DisplayText("Failed to mount SD card.", mainFont, GT.Color.Red, 0, 0);
        }

        private void sdCard_SDCardMounted(SDCard sender, GT.StorageDevice SDCard)
        {
            CardMounted(sender, this);
        }


        // Proxy event handler to SDCardMountedEventHandler 
        public event CardMountedEventHandler CardMounted;

        public delegate void CardMountedEventHandler(SDCard sender, SDCardController controller);

        public Bitmap GetTemplate(string fileName)
        {
            GT.StorageDevice sdStorage = sdCard.GetStorageDevice();
            string[] fileList = sdStorage.ListRootDirectoryFiles();

            if (this.indexOf(fileList, fileName) >= 0)
            {
                return sdStorage.LoadBitmap(fileName, Bitmap.BitmapImageType.Bmp);
            }

            return null;
        }

        private int indexOf(string[] array, string item)
        {
            for (int i = 0; i < array.Length; i++)
            {
                if (array[i] == item)
                {
                    return i;
                }
            }

            return -1;
        }
    }
}
