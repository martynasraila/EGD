using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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
        public void Get_WhenCalled_ReturnsAllItems()
        {
            // Arrange
            // Test data pre-filled in test DB.

            // Act
            var okResult = _controller.Get();
            List<WebApplication1.Models.EGD> EGDs = new List<WebApplication1.Models.EGD>(okResult);

            // Assert
            Assert.Equal(28, EGDs.Count);
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
            Assert.IsType<WebApplication1.Models.EGD>(result);
            Assert.Equal(5, result.Id);
        }

        [Fact]
        public void Create_InvalidObject_ReturnsMinus1()
        {
            // Arrange
            var newInvalidItem = new WebApplication1.Models.EGD();
            // Simulating wrong object supply.
            _controller.ModelState.AddModelError("PhotoStreak", "Not an integer");

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
            var newItem = new WebApplication1.Models.EGD()
            {
                ConfigurationStreak = 10,
                PaddingBottom = 11,
                PaddingLeft = 12,
                PaddingRight = 13,
                PaddingTop = 14,
                PhotoStreak = 15
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
            Assert.IsType<WebApplication1.Models.EGD>(createdItem);
            Assert.Equal(result, createdItem.Id);
            Assert.Equal(newItem.ConfigurationStreak, createdItem.ConfigurationStreak);
            Assert.Equal(newItem.PaddingBottom, createdItem.PaddingBottom);
            Assert.Equal(newItem.PaddingLeft, createdItem.PaddingLeft);
            Assert.Equal(newItem.PaddingRight, createdItem.PaddingRight);
            Assert.Equal(newItem.PaddingTop, createdItem.PaddingTop);
            Assert.Equal(newItem.PhotoStreak, createdItem.PhotoStreak);
        }

        [Fact]
        public void UpdateEGD_NotExistingObject_ReturnsFalse()
        {
            // Arrange
            var newInvalidItem = new WebApplication1.Models.EGD()
            {
                Id = 1,
                ConfigurationStreak = 10,
                PaddingBottom = 11,
                PaddingLeft = 12,
                PaddingRight = 13,
                PaddingTop = 14,
                PhotoStreak = 15
            };

            // Act
            var result = _controller.UpdateEGD(newInvalidItem);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public void UpdateEGD_InvalidObject_ReturnsFalse()
        {
            // Arrange
            var newInvalidItem = new WebApplication1.Models.EGD() { Id = 3008 };
            // Simulating wrong object supply.
            _controller.ModelState.AddModelError("PhotoStreak", "Not an integer");

            // Act
            var result = _controller.UpdateEGD(newInvalidItem);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public void UpdateEGD_ValidExistingObject_ReturnsTrue()
        {
            // Arrange
            var newValidItem = new WebApplication1.Models.EGD()
            {
                Id = 3008,
                ConfigurationStreak = 10,
                PaddingBottom = 11,
                PaddingLeft = 12,
                PaddingRight = 13,
                PaddingTop = 14,
                PhotoStreak = 15
            };

            // Act
            var result = _controller.UpdateEGD(newValidItem);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public void Delete_NotExisting_ReturnsFalse()
        {
            // Act
            var result = _controller.Delete(1);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public void Delete_Existing_ReturnsTrue()
        {
            // Arrange
            var newValidItem = new WebApplication1.Models.EGD()
            {
                ConfigurationStreak = 10,
                PaddingBottom = 11,
                PaddingLeft = 12,
                PaddingRight = 13,
                PaddingTop = 14,
                PhotoStreak = 15
            };

            var id = _controller.Create(newValidItem);

            // Act
            var result = _controller.Delete(id);

            // Assert
            Assert.True(result);
        }
    }
}
