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
    public class CollectorsController : Controller
    {
        private readonly ICollectorsRepository _CollectorsRepo;
        public CollectorsController(ICollectorsRepository CollectorsRepo)
        {
            _CollectorsRepo = CollectorsRepo;
        }
        [HttpGet]
        public IEnumerable<Collectors> Get()
        {
            return _CollectorsRepo.GetAllCollectors();
        }
        [HttpGet("{id}")]
        public Collectors GetById(int id)
        {
                return _CollectorsRepo.GetById(id);
        }
        [HttpPost]
        public bool Create([FromBody]Collectors ourCollector)
        {
            return _CollectorsRepo.InsertCollector(ourCollector);
        }
        [HttpPut]
        public bool UpdateourContainer([FromBody]Collectors ourCollector)
        {
            return _CollectorsRepo.UpdateCollector(ourCollector);
        }
        [Route("{id}")]
        [HttpDelete]
        public bool Delete(int id)
        {
            return _CollectorsRepo.DeleteCollector(id);
        }
    }
}
