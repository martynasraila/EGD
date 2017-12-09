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
    public class Collectors_ContainersController : Controller
    {
        private readonly ICollectors_ContainersRepository _Collectors_ContainerssRepo;
        public Collectors_ContainersController(ICollectors_ContainersRepository Collectors_ContainersRepo)
        {
            _Collectors_ContainerssRepo = Collectors_ContainersRepo;
        }
        [HttpGet]
        public IEnumerable<Collectors_Containers> Get()
        {
            return _Collectors_ContainerssRepo.GetAllCollectors_Containers();
        }
        [HttpGet]
        [Route("cc/collector/{id}")]
        public IEnumerable<Collectors_Containers> GetByCollectorId(int id)
        {
            if (id != null)
            {
                return _Collectors_ContainerssRepo.GetByCollectorId(id);
            }
            else
            {
                new System.ArgumentNullException("Nera tokio id");
                return null;
            }
        }
        [HttpGet("cc/container/{id}")]
        public IEnumerable<Collectors_Containers> GetByContainerId(int id)
        {
            if (id != null)
            {
                return _Collectors_ContainerssRepo.GetByContainerId(id);
            }
            else
            {
                new System.ArgumentNullException("Nera tokio id");
                return null;
            }
        }


        [HttpPost]
        public bool Create([FromBody]Collectors_Containers ourCollector_Container)
        {
            return _Collectors_ContainerssRepo.InsertCollector_Container(ourCollector_Container);
        }
        [HttpPut("cc/collector")]
        public bool UpdateByCollectorId([FromBody]Collectors_Containers ourCollector_Container)
        {
            return _Collectors_ContainerssRepo.UpdateByCollectorId(ourCollector_Container);
        }
        [HttpPut("cc/container")]
        public bool UpdateByContainerId([FromBody]Collectors_Containers ourCollector_Container)
        {
            return _Collectors_ContainerssRepo.UpdateByContainerId(ourCollector_Container);
        }
        [HttpDelete("cc/collector/{id}")]
        public bool DeleteByCollectorId(int id)
        {
            return _Collectors_ContainerssRepo.DeleteByCollectorId(id);
        }
        [HttpDelete("cc/container/{id}")]
        public bool DeleteByContainerId(int id)
        {
            return _Collectors_ContainerssRepo.DeleteByCollectorId(id);
        }

    }
}
