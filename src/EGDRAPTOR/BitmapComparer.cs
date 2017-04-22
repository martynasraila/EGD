using System;
using Microsoft.SPOT;
using GT = Gadgeteer;

namespace EGDRAPTOR
{
    class BitmapComparer
    {
        // white pixel - true,
        // black pixel - false
        public static bool[][] GetComparableMatrix(Bitmap bitmap, byte threshold)
        {
            bool[][] comparableMatrix = new bool[bitmap.Width][];

            for (int x = 0; x < bitmap.Width; x++)
            {
                comparableMatrix[x] = new bool[bitmap.Height];
                for (int y = 0; y < bitmap.Height; y++)
                {
                    comparableMatrix[x][y] = ExtractComparableFactor(bitmap.GetPixel(x, y), threshold);
                }
            }

            return comparableMatrix;
        }

        public static bool ExtractComparableFactor(GT.Color pixel, byte threshold)
        {
            // byte values range 0..255
            // byte is enough - single color value range 0..255
            byte grayScale = GetGrayScaleFromPixel(pixel);

            return GetThresholdedGrayscaleFactor(grayScale, threshold);
        }

        public static bool GetThresholdedGrayscaleFactor(byte grayScale, byte threshold)
        {
            return grayScale > threshold;
        }

        // Factors by RGB to Gray-Scale conversion
        // From OpenCV's cvtColor method following ITU-R Recomendation BT.601 standard.
        // GRAYSCALE_RED_FACTOR: 0.299
        // GRAYSCALE_GREEN_FACTOR: 0.587
        // GRAYSCALE_BLUE_FACTOR: 0.114B
        // Equation: GrayScale = RedValue * GRAYSCALE_RED_FACTOR + GreenValue * GRAYSCALE_GREEN_FACTOR + BlueValue * GRAYSCALE_BLUE_FACTOR;
        public static byte GetGrayScaleFromPixel(GT.Color pixel)
        {
            return (byte)(pixel.R * GRAYSCALE_RED_FACTOR + pixel.G * GRAYSCALE_GREEN_FACTOR + pixel.B * GRAYSCALE_BLUE_FACTOR);
        }

        public const double GRAYSCALE_RED_FACTOR = 0.299;
        public const double GRAYSCALE_GREEN_FACTOR = 0.587;
        public const double GRAYSCALE_BLUE_FACTOR = 0.114;

        // Demonstration reasons - don't use in production.
        // Transforms bitmap to grayscale bitmap.
        public static Bitmap BitmapToGrayscale(Bitmap bitmap)
        {
            Bitmap result = new Bitmap(bitmap.Width, bitmap.Height);

            for (int x = 0; x < bitmap.Width; x++)
            {
                for (int y = 0; y < bitmap.Height; y++)
                {
                    GT.Color currentPixel = bitmap.GetPixel(x, y);
                    byte grayscalePixelValue = GetGrayScaleFromPixel(currentPixel);
                    result.SetPixel(x, y, GT.Color.FromRGB(grayscalePixelValue, grayscalePixelValue, grayscalePixelValue));
                }
            }

            return result;
        }

        // Demonstration reasons - don't use in production.
        // Transforms bitmap to thresholded bitmap.
        public static Bitmap BitmapToThresholdedBitmap(Bitmap bitmap, byte threshold)
        {
            Bitmap result = new Bitmap(bitmap.Width, bitmap.Height);

            for (int x = 0; x < bitmap.Width; x++)
            {
                for (int y = 0; y < bitmap.Height; y++)
                {
                    GT.Color currentPixel = bitmap.GetPixel(x, y);
                    byte grayscalePixelValue = GetGrayScaleFromPixel(currentPixel);
                    byte newPixelValue = (byte)(GetThresholdedGrayscaleFactor(grayscalePixelValue, threshold) ? 255 : 0);

                    result.SetPixel(x, y, GT.Color.FromRGB(newPixelValue, newPixelValue, newPixelValue));
                }
            }

            return result;
        }

        // Compares two bitmaps with threshold
        public static double CompareBitmaps(Bitmap bitmap1, Bitmap bitmap2, byte threshold)
        {
            bool[][] comparableMatrix1 = GetComparableMatrix(bitmap1, threshold);
            bool[][] comparableMatrix2 = GetComparableMatrix(bitmap2, threshold);
            return CompareComparableMatrices(comparableMatrix1, comparableMatrix2);
        }

        // TODO: add padding
        // Compares two bool matrices
        // Dimensions must match!!!
        public static double CompareComparableMatrices(bool[][] matrix1, bool[][] matrix2)
        {
            int total = 0;
            int matched = 0;

            // initial value of x
            int xCounter = -1;

            foreach (bool[] x in matrix1)
            {
                xCounter++;
                int yCounter = -1;
                foreach (bool y in x)
                {
                    yCounter++;
                    total++;
                    if (matrix1[xCounter][yCounter] == matrix2[xCounter][yCounter])
                    {
                        matched++;
                    }
                }
            }

            if (total == 0)
            {
                return 0;
            }

            return 100 - (((double)matched / (double)total) * 100);
        }
    }
}
