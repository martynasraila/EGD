using System;
using Microsoft.SPOT;
using Gadgeteer.Modules.GHIElectronics;
using System.Threading;

namespace EGDRAPTOR
{
    class CameraController
    {
        private Camera camera;
        private byte initialPictures = 0;
        private bool isCameraInitialized = false;

        public bool IsCameraInitialized
        {
            get
            {
                return isCameraInitialized;
            }
        }

        private Display_T35 display;

        public CameraController(Camera camera, Display_T35 display)
        {
            this.camera = camera;
            this.camera.PictureCaptured += camera_PictureCaptured;

            this.display = display;

            if (!this.camera.CameraReady)
            {
                this.camera.CameraConnected += camera_CameraConnected;
            }
            else
            {
                this.takeInitialPicture();
            }
        }

        private void takeInitialPicture()
        {
            this.TakePicture();
            Thread.Sleep(1500);
            initialPictures++;
        }

        // Camera connected event handler
        private void camera_CameraConnected(Camera sender)
        {
            if (!this.isCameraInitialized)
            {
                this.takeInitialPicture();
            }
        }

        // Picture captured event handler
        private void camera_PictureCaptured(Camera sender, Gadgeteer.Picture picture)
        {
            if (this.isCameraInitialized)
            {
                PictureTaken(this, picture.MakeBitmap());
            }
            else
            {
                if (this.initialPictures < 3)
                {
                    this.takeInitialPicture();
                }
                else
                {
                    this.isCameraInitialized = true;
                    CameraInitialized(this, this.camera);
                }
            }
        }

        public void TakePicture()
        {
            this.camera.TakePicture();
        }

        // Proxy event handler to PictureCaptured
        public event PictureTakenEventHandler PictureTaken;
        public delegate void PictureTakenEventHandler(CameraController cameraController, Bitmap picture);

        public event CameraInitializedEventHandler CameraInitialized;
        public delegate void CameraInitializedEventHandler(CameraController cameraController, Camera camera);

    }
}
