using System;
using Microsoft.SPOT;
using GT = Gadgeteer;

namespace EGDRAPTOR
{
    class BitmapComparer
    {
        // white pixel - true,
        // black pixel - false
        // Rewrite to awoid bitmap.GetPixel     !!!
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

        public static byte GetGrayScaleFromPixel(byte red, byte green, byte blue)
        {
            return (byte)(red * GRAYSCALE_RED_FACTOR + green * GRAYSCALE_GREEN_FACTOR + blue * GRAYSCALE_BLUE_FACTOR);
        }

        public const double GRAYSCALE_RED_FACTOR = 0.299;
        public const double GRAYSCALE_GREEN_FACTOR = 0.587;
        public const double GRAYSCALE_BLUE_FACTOR = 0.114;

        // Demonstration reasons - don't use in production.
        // Transforms bitmap to grayscale bitmap.
        // Rewrite to awoid bitmap.GetPixel
        public static Bitmap BitmapToGrayscale(Bitmap bitmap)
        {
            byte[] map = bitmap.GetBitmap();
            Bitmap result = new Bitmap(bitmap.Width, bitmap.Height);

            for (int x = 0; x < bitmap.Width; x++)
            {
                for (int y = 0; y < bitmap.Height; y++)
                {
                    int pixelStartPosition = getPixelStartPosition(x, y, bitmap.Width);

                    // Position of red color value of current pixel
                    int redPosition = pixelStartPosition + (byte)BaseColor.Red;
                    // Position of green color value of current pixel
                    int greenPosition = pixelStartPosition + (byte)BaseColor.Green;
                    // Position of blue color value of current pixel
                    int bluePosition = pixelStartPosition + (byte)BaseColor.Blue;

                    byte grayPixelColor = (byte)(map[redPosition] * GRAYSCALE_RED_FACTOR + map[greenPosition] * GRAYSCALE_GREEN_FACTOR + map[bluePosition] * GRAYSCALE_BLUE_FACTOR);

                    result.SetPixel(x, y, GT.Color.FromRGB(grayPixelColor, grayPixelColor, grayPixelColor));
                }
            }

            return result;
        }

        // Demonstration reasons - don't use in production.
        // Transforms bitmap to thresholded bitmap.
        // Rewrite to awoid bitmap.GetPixel
        public static Bitmap BitmapToThresholdedBitmap(Bitmap bitmap, byte threshold)
        {
            byte[] map = bitmap.GetBitmap();
            Bitmap result = new Bitmap(bitmap.Width, bitmap.Height);

            for (int x = 0; x < bitmap.Width; x++)
            {
                for (int y = 0; y < bitmap.Height; y++)
                {
                    int pixelStartPosition = getPixelStartPosition(x, y, bitmap.Width);

                    // Position of red color value of current pixel
                    int redPosition = pixelStartPosition + (byte)BaseColor.Red;
                    // Position of green color value of current pixel
                    int greenPosition = pixelStartPosition + (byte)BaseColor.Green;
                    // Position of blue color value of current pixel
                    int bluePosition = pixelStartPosition + (byte)BaseColor.Blue;

                    byte grayPixelColor = (byte)(map[redPosition] * GRAYSCALE_RED_FACTOR + map[greenPosition] * GRAYSCALE_GREEN_FACTOR + map[bluePosition] * GRAYSCALE_BLUE_FACTOR);

                    byte newPixelValue = (byte)(grayPixelColor > threshold ? 255 : 0);

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

        public static double CompareBitmapsFast(Bitmap bitmap1, Bitmap bitmap2, byte threshold, Padding padding)
        {
            int matched = 0;

            // Colors map of first bitmap
            byte[] map1 = bitmap1.GetBitmap();

            // Colors map of second bitmap
            byte[] map2 = bitmap2.GetBitmap();

            int width = bitmap1.Width;
            int total = 0;

            // Comparing each pixel of bitmap
            for (int x = padding.Left; x < bitmap1.Width - padding.Right; x++)
            {
                for (int y = padding.Top; y < bitmap1.Height - padding.Bottom; y++)
                {
                    // Getting start position of pixel values in flatten bitmap array
                    int pixelStartPosition = getPixelStartPosition(x, y, width);

                    // Position of red color value of current pixel
                    int redPosition = pixelStartPosition + (byte)BaseColor.Red;
                    // Position of green color value of current pixel
                    int greenPosition = pixelStartPosition + (byte)BaseColor.Green;
                    // Position of blue color value of current pixel
                    int bluePosition = pixelStartPosition + (byte)BaseColor.Blue;

                    // Getting grayscale pixel value of first bitmap
                    byte grayScale1 = (byte)(map1[redPosition] * GRAYSCALE_RED_FACTOR + map1[greenPosition] * GRAYSCALE_GREEN_FACTOR + map1[bluePosition] * GRAYSCALE_BLUE_FACTOR);
                    // Getting grayscale pixel value of second bitmap
                    byte grayScale2 = (byte)(map2[redPosition] * GRAYSCALE_RED_FACTOR + map2[greenPosition] * GRAYSCALE_GREEN_FACTOR + map2[bluePosition] * GRAYSCALE_BLUE_FACTOR);
                    //Debug.Print(grayScale1.ToString() + " " + grayScale2.ToString());

                    // Getting thresholded pixel value of first bitmap
                    bool thresholdedValue1 = grayScale1 > threshold;
                    // Getting thresholded pixel value of second bitmap
                    bool thresholdedValue2 = grayScale2 > threshold;

                    if (!thresholdedValue1)
                    {
                        total++;
                        if (!thresholdedValue1 && (thresholdedValue1 == thresholdedValue2))
                        {
                            matched++;
                        }
                    }
                }
            }

            return matchFormula(total, matched);
        }

        enum BaseColor
        {
            Red = 0,
            Green = 1,
            Blue = 2
        }

        private static int getPixelStartPosition(int x, int y, int width)
        {
            int flatY = y * 4 * width;
            int flatX = x * 4;
            int flatPos = flatY + flatX;

            return flatPos;
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

            return matchFormula(total, matched);
        }

        private static double matchFormula(int total, int matched)
        {
            if (total == 0)
            {
                return 0;
            }

            return 100 - (((double)matched / (double)total) * 100);
        }
    }
}
