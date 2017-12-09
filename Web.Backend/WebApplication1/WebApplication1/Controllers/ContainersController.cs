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
            if (id != null)
            {
                return _ContainersRepo.GetById(id);
            }
            else
            {
                new System.ArgumentNullException("Nera tokio id");
                return null;
            }
        }
        [HttpPost]
        public bool Create([FromBody]Containers ourContainer)
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
    }
}
