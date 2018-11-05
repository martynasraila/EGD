using EGD.Controllers;
using EGD.Repositories;
using Microsoft.AspNetCore.Mvc;
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
        public void Get_WhenCalled_ReturnsAllItems()
        {
            // Arrange
            // Test data pre-filled in test DB.

            // Act
            var okResult = _controller.Get();
            List<EGD.Models.Collectors_Containers> collectorContainers = new List<EGD.Models.Collectors_Containers>(okResult);

            // Assert
            Assert.Equal(4, collectorContainers.Count);
        }

        [Fact]
        public void GetByCollectorId_WrongId_ReturnsEmpty()
        {
            // Arrange
            // Test data pre-filled in test DB.

            // Act
            var result = _controller.GetByCollectorId(30);

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public void GetByCollectorId_ExistingId_ReturnsItems()
        {
            // Arrange
            // Test data pre-filled in test DB.

            // Act
            int id = 1;
            var result = _controller.GetByCollectorId(id);
            List<EGD.Models.Collectors_Containers> collectorContainers = new List<EGD.Models.Collectors_Containers>(result);

            Assert.Equal(4, collectorContainers.Count);

            // Assert
            collectorContainers.ForEach(collectorContainer =>
            {
                Assert.Equal(id, collectorContainer.CollectorId);
                Assert.IsType<EGD.Models.Collectors_Containers>(collectorContainer);
            });
        }

        [Fact]
        public void GetByContainerId_WrongId_ReturnsEmpty()
        {
            // Arrange
            // Test data pre-filled in test DB.

            // Act
            var result = _controller.GetByCollectorId(30);

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public void GetByContainerId_ExistingId_ReturnsItems()
        {
            // Arrange
            // Test data pre-filled in test DB.

            // Act
            int id = 5;
            var result = _controller.GetByContainerId(id);
            List<EGD.Models.Collectors_Containers> collectorContainers = new List<EGD.Models.Collectors_Containers>(result);

            Assert.Single(collectorContainers);

            // Assert
            collectorContainers.ForEach(collectorContainer =>
            {
                Assert.Equal(id, collectorContainer.ContainerId);
                Assert.IsType<EGD.Models.Collectors_Containers>(collectorContainer);
            });
        }

        [Fact]
        public void DeleteByContainerId_NotExisting_ReturnsFalse()
        {
            // Act
            var result = _controller.DeleteByContainerId(1000);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public void DeleteByCollectorId_NotExisting_ReturnsFalse()
        {
            // Act
            var result = _controller.DeleteByCollectorId(1000);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public void UpdateByCollectorId_NotExistingObject_ReturnsFalse()
        {
            // Arrange
            var newInvalidItem = new EGD.Models.Collectors_Containers()
            {
                ContainerId = 1001,
                CollectorId = 1001
            };

            // Act
            var result = _controller.UpdateByCollectorId(newInvalidItem);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public void UpdateByContainerId_NotExistingObject_ReturnsFalse()
        {
            // Arrange
            var newInvalidItem = new EGD.Models.Collectors_Containers()
            {
                ContainerId = 1001,
                CollectorId = 1001
            };

            // Act
            var result = _controller.UpdateByContainerId(newInvalidItem);

            // Assert
            Assert.False(result);
        }
    }
}
