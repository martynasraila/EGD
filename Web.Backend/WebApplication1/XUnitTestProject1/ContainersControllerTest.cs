using EGD.Controllers;
using EGD.Repositories;
using Microsoft.AspNetCore.Mvc;
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
        public void Get_WhenCalled_ReturnsAllItems()
        {
            // Arrange
            // Test data pre-filled in test DB.

            // Act
            var okResult = _controller.Get();
            List<EGD.Models.Containers> containers = new List<EGD.Models.Containers>(okResult);

            // Assert
            Assert.Equal(8, containers.Count);
        }

        [Fact]
        public void GetById_WrongId_ReturnsNotFound()
        {
            // Arrange
            // Test data pre-filled in test DB.

            // Act
            var result = _controller.GetById(1);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void GetById_ExistingId_ReturnsItem()
        {
            // Arrange
            // Test data pre-filled in test DB.

            // Act
            var result = _controller.GetById(5);

            // Assert
            Assert.IsType<EGD.Models.Containers>(result);
            Assert.Equal(5, result.Id);
        }

        [Fact]
        public void Create_InvalidObject_ReturnsMinus1()
        {
            // Arrange
            var newInvalidItem = new EGD.Models.Containers();
            // Simulating wrong object supply.
            _controller.ModelState.AddModelError("LastStateid", "Not an integer");

            // Act
            var result = _controller.Create(newInvalidItem);

            // Cleanup
            if (result != -1)
            {
                _controller.Delete(result);
            }

            // Assert
            Assert.Equal(-1, result);
        }

        [Fact]
        public void Create_ValidObject_ObjectInserted()
        {
            // Arrange
            var newItem = new EGD.Models.Containers()
            {
                Address = "Sample address",
                Description = "Description",
                EGDid = 130,
                LastStateid = 131,
                Latitude = 132,
                Longitude = 133
            };

            // Act
            var result = _controller.Create(newItem);

            var createdItem = _controller.GetById(result);

            // Cleanup
            if (result != -1)
            {
                _controller.Delete(result);
            }

            // Assert
            Assert.IsType<EGD.Models.Containers>(createdItem);
            Assert.Equal(result, createdItem.Id);
            Assert.Equal(newItem.Address, createdItem.Address);
            Assert.Equal(newItem.Description, createdItem.Description);
            Assert.Equal(newItem.EGDid, createdItem.EGDid);
            Assert.Equal(newItem.LastStateid, createdItem.LastStateid);
            Assert.Equal(newItem.Latitude, createdItem.Latitude);
            Assert.Equal(newItem.Longitude, createdItem.Longitude);
        }

        [Fact]
        public void UpdateourContainer_NotExistingObject_ReturnsFalse()
        {
            // Arrange
            var newInvalidItem = new EGD.Models.Containers(){
                Id = 1,
                Address = "Adress",
                Description = "Description",
                EGDid = 222,
                LastStateid = 333,
                Latitude = 444,
                Longitude = 555
            };

            // Act
            var result = _controller.UpdateourContainer(newInvalidItem);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public void UpdateourContainer_InvalidObject_ReturnsFalse() {
            // Arrange
            var newInvalidItem = new EGD.Models.Containers() { Id = 3014 };
            // Simulating wrong object supply.
            _controller.ModelState.AddModelError("LastStateid", "Not an integer");

            // Act
            var result = _controller.UpdateourContainer(newInvalidItem);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public void UpdateourContainer_ValidExistingObject_ReturnsTrue()
        {
            // Arrange
            var newValidItem = new EGD.Models.Containers()
            {
                Id = 3014,
                Address = "Adress",
                Description = "Description",
                EGDid = 222,
                LastStateid = 333,
                Latitude = 444,
                Longitude = 555
            };

            // Act
            var result = _controller.UpdateourContainer(newValidItem);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public void Delete_NotExisting_ReturnsFalse() {
            // Act
            var result = _controller.Delete(1);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public void Delete_Existing_ReturnsTrue()
        {
            // Arrange
            var newValidItem = new EGD.Models.Containers()
            {
                Address = "Adress",
                Description = "Description",
                EGDid = 222,
                LastStateid = 333,
                Latitude = 444,
                Longitude = 555
            };

            var id = _controller.Create(newValidItem);

            // Act
            var result = _controller.Delete(id);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public void GetStatistics_WhenCalled_ReturnCorrectStatistics() {
            // Act
            var result = _controller.GetStatistics();
            List<EGD.Models.ContainerStatistics> containerStatistics = new List<EGD.Models.ContainerStatistics>(result);

            // Assert
            Assert.Equal(7, containerStatistics[0].ActiveEGD);
            Assert.Equal(5, containerStatistics[0].CollectorsCount);
            Assert.Equal(8, containerStatistics[0].ContainerCount);
            Assert.Equal(8, containerStatistics[0].EGDCount);
            Assert.Equal(1, containerStatistics[0].EmptyContainers);
            Assert.Equal(1, containerStatistics[0].FullContainerCount);
            Assert.Equal(1, containerStatistics[0].InActiveEGD);
            Assert.Equal(0, containerStatistics[0].TodaysTrips);
            Assert.Equal(0, containerStatistics[0].WorksToday);
        }
    }
}
