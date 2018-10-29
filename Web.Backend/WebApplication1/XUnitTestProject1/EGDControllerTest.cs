using System;
using WebApplication1;
using WebApplication1.Controllers;
using Xunit;

namespace XUnitTestProject1
{
    public class EGDControllerTest
    {
        EGDController _controller;
        EGDRepository _service;

        public EGDControllerTest()
        {
            _service = new EGDRepository();
            _controller = new EGDController(_service);
        }
        [Fact]
        public void GetAll()
        {
            // Act
            var okResult = _controller.Get();

            // Assert
            Assert.NotEmpty(okResult);
        }

        public void AddEGD()
        {
            WebApplication1.EGD egd = new WebApplication1.EGD();
            // Act
            var okResult = _controller.Create(egd);

            // Assert 
            int failValue = -1;
            Assert.ReferenceEquals(failValue);
        }
    }
}
