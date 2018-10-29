using EGD.Controllers;
using EGD.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace XUnitTestProject1
{
    public class CollectorsControllerTest
    {
        CollectorsController _controller;
        CollectorsRepository _service;

        public CollectorsControllerTest()
        {
            _service = new CollectorsRepository();
            _controller = new CollectorsController(_service);
        }
        [Fact]
        public void GetAll()
        {
            // Act
            var okResult = _controller.Get();

            // Assert
            Assert.NotEmpty(okResult);
        }
    }
}
