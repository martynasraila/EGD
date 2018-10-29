using EGD.Controllers;
using EGD.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace XUnitTestProject1
{
    public class ContainersControllerTest
    {
        ContainersController _controller;
        ContainersRepository _service;

        public ContainersControllerTest()
        {
            _service = new ContainersRepository();
            _controller = new ContainersController(_service);
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
