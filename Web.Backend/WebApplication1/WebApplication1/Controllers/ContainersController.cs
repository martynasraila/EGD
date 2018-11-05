using EGD.Models;
using EGD.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGD.Controllers
{
    [Route("api/[controller]")]
    public class ContainersController : Controller
    {
        private readonly IContainersRepository _ContainersRepo;
        public ContainersController(IContainersRepository ContainersRepo)
        {
            _ContainersRepo = ContainersRepo;
        }

        [HttpGet]
        public IEnumerable<Containers> Get()
        {
            return _ContainersRepo.GetAllContainers();
        }

        [HttpGet("{id}")]
        public Containers GetById(int id)
        {
            return _ContainersRepo.GetById(id);
        }

        [HttpPost]
        public int Create([FromBody]Containers ourContainer)
        {
            return _ContainersRepo.InsertContainer(ourContainer);
        }

        [HttpPut]
        public bool UpdateourContainer([FromBody]Containers ourContainer)
        {
            return _ContainersRepo.UpdateContainer(ourContainer);
        }

        [Route("{id}")]
        [HttpDelete]
        public bool Delete(int id)
        {
            return _ContainersRepo.DeleteContainer(id);
        }
        [HttpPost("{stats}")]
        public IEnumerable<ContainerStatistics> GetStatistics()
        {
            return _ContainersRepo.GetStatistics();
        }

    }
}
