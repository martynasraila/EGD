using EGD.Controllers;
using EGD.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace XUnitTestProject1
{
    public class Collectors_ContainersControllerTest
    {
        Collectors_ContainersController _controller;
        Collectors_ContainersRepository _service;

        public Collectors_ContainersControllerTest()
        {
            _service = new Collectors_ContainersRepository();
            _controller = new Collectors_ContainersController(_service);
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
