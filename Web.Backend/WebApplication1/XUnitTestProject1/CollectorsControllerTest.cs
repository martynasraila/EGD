using EGD.Controllers;
using EGD.Repositories;
using Microsoft.AspNetCore.Mvc;
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
        public void Get_WhenCalled_ReturnsAllItems()
        {
            // Arrange
            // Test data pre-filled in test DB.

            // Act
            var okResult = _controller.Get();
            List<EGD.Models.Collectors> collectors = new List<EGD.Models.Collectors>(okResult);

            // Assert
            Assert.Equal(5, collectors.Count);
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
            var result = _controller.GetById(2);

            // Assert
            Assert.IsType<EGD.Models.Collectors>(result);
            Assert.Equal(5, result.Id);
        }

        [Fact]
        public void Create_InvalidObject_ReturnsMinus1()
        {
            // Arrange
            var newInvalidItem = new EGD.Models.Collectors();
            // Simulating wrong object supply.
            _controller.ModelState.AddModelError("UserName", "Required");

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
            var newItem = new EGD.Models.Collectors()
            {
                UserName = "User name",
                Description = "Description",
                PasswordHash = "PasswordHash",
                Title = "Title"
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
            Assert.IsType<EGD.Models.Collectors>(createdItem);
            Assert.Equal(result, createdItem.Id);
            Assert.Equal(newItem.UserName, createdItem.UserName);
            Assert.Equal(newItem.Description, createdItem.Description);
            Assert.Equal(newItem.PasswordHash, createdItem.PasswordHash);
            Assert.Equal(newItem.Title, createdItem.Title);
        }

        [Fact]
        public void UpdateourContainer_NotExistingObject_ReturnsFalse()
        {
            // Arrange
            var newInvalidItem = new EGD.Models.Collectors()
            {
                Id = 1111111,
                UserName = "User name",
                Description = "Description",
                PasswordHash = "PasswordHash",
                Title = "Title"
            };

            // Act
            var result = _controller.UpdateourContainer(newInvalidItem);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public void UpdateourContainer_InvalidObject_ReturnsFalse()
        {
            // Arrange
            var newInvalidItem = new EGD.Models.Collectors() { Id = 3003 };
            // Simulating wrong object supply.
            _controller.ModelState.AddModelError("UserName", "Required");

            // Act
            var result = _controller.UpdateourContainer(newInvalidItem);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public void UpdateourContainer_ValidExistingObject_ReturnsTrue()
        {
            // Arrange
            var newItem = new EGD.Models.Collectors()
            {
                Id = 3002,
                UserName = "User name",
                Description = "Description",
                PasswordHash = "PasswordHash",
                Title = "Title"
            };

            // Act
            var result = _controller.UpdateourContainer(newItem);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public void Delete_NotExisting_ReturnsFalse()
        {
            // Act
            var result = _controller.Delete(5);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public void Delete_Existing_ReturnsTrue()
        {
            // Arrange
            var newItem = new EGD.Models.Collectors()
            {
                UserName = "User name",
                Description = "Description",
                PasswordHash = "PasswordHash",
                Title = "Title"
            };

            var id = _controller.Create(newItem);

            // Act
            var result = _controller.Delete(id);

            // Assert
            Assert.True(result);
        }
    }
}
