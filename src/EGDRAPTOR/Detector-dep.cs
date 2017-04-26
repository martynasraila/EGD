using System;
using Microsoft.SPOT;

using GT = Gadgeteer;

namespace EGDRAPTOR
{
    class Detector
    {
        public Bitmap EmptyPictureTemplate { get; private set; }
        public byte[][] EmptyPictureBytes { get; private set; }

        public Bitmap PreparedMatch { get; private set; }

        public Detector(Bitmap templateBitmap)
        {
            this.EmptyPictureTemplate = templateBitmap;
            this.PreparedMatch = new Bitmap(320, 240);
        }

        private Bitmap makeGrayscale(Bitmap bmp)
        {
            for (int i = 0; i < bmp.Width; i++)
            {
                for (int j = 0; j < bmp.Height; j++)
                {
                    GT.Color c1 = bmp.GetPixel(i, j);
                    double c2 = c1.R * 0.299 + c1.G * 0.587 + c1.B * 0.114;

                    bmp.SetPixel(i, j, GT.Color.FromRGB((byte)c2, (byte)c2, (byte)c2));
                }
            }

            return bmp;
        }

        //private Bitmap makeBitmap(Bitmap bmp, int threshold)
        //{

        //    for (int i = 0; i < bmp.Width; i++)
        //    {
        //        for (int j = 0; j < bmp.Height; j++)
        //        {
        //            GT.Color c1 = bmp.GetPixel(i, j);
        //            double c2 = c1.R * 0.299 + c1.G * 0.587 + c1.B * 0.114;
        //            if (c2 > threshold)
        //                c2 = 255;
        //            else
        //                c2 = 0;

        //            bmp.SetPixel(i, j, GT.Color.FromRGB((byte)c2, (byte)c2, (byte)c2));
        //        }
        //    }

        //    return bmp;
        //}

        private byte[][] prepareTemplate(Bitmap bmp, int threshold)
        {
            byte[] bb = bmp.GetBitmap();



            byte[][] result = new byte[320][];
            //for (int i = 43; i < 183; i++) //Y-grikai
            for (int i = 0; i < bmp.Height; i++)
            {
                int i4 = i * 4 * 320;
                result[i] = new byte[320];
                //for (int j = 7; j < 308; j++) //X-ai
                for (int j = 0; j < bmp.Width; j++)
                {
                    int j4 = j * 4;

                    int r = bb[i4 + j4];

                    if (r > threshold)
                        result[i][j] = 0;
                    else
                        result[i][j] = 1;

                }
            }

            return result;
        }

        public void GrayscaleTemplates()
        {
            EmptyPictureTemplate = this.makeGrayscale(EmptyPictureTemplate);
        }

        //public void BitmapTemplates(int threshold)
        //{
        //    EmptyPictureTemplate = this.makeBitmap(EmptyPictureTemplate, threshold);
        //}

        public void PrepareTemplates(int threshold)
        {
            this.EmptyPictureBytes = this.prepareTemplate(this.EmptyPictureTemplate, threshold);
        }

        private int MatchPrepared(byte[][] template, byte[][] picture, int shiftX, int shiftY)
        {
            int total = 0;
            int match = 0;

            //for (int i = 43; i < 183; i++)
            for (int i = 0; i < 240; i++)
            {
                for (int j = 0; j < 320; j++)
                {
                    //if (template[i][j] == 1)
                    //{
                    total++;
                    if (template[i][j] == picture[i][j])
                    {
                        match++;
                    }
                    //}
                }
            }

            return (int)((double)match / (double)total * 100.0);
        }

        public int CheckHowLoaded(Bitmap currentPicture, int threshold, int shiftX, int shiftY)
        {
            byte[][] template = EmptyPictureBytes;
            currentPicture = makeGrayscale(currentPicture);
            byte[][] currentPictureArray = this.prepareTemplate(currentPicture, threshold);

            return 100 - this.MatchPrepared(template, currentPictureArray, 0, 0);
        }
    }
}
