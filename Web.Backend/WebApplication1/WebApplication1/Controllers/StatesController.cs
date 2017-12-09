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
    public class StatesController : Controller
    {
        private readonly IStatesRepository _StatesRepository;
        public StatesController(IStatesRepository StatesRepository)
        {
            _StatesRepository = StatesRepository;
        }
        [HttpGet]
        public IEnumerable<States> Get()
        {
            return _StatesRepository.GetAllStates();
        }
        [HttpGet("{id}")]
        public States GetById(int id)
        {
                return _StatesRepository.GetById(id);
            
 
        }
        [HttpPost]
        public bool Create([FromBody]States ourState)
        {
            return _StatesRepository.InsertState(ourState);
        }
        [HttpPut]
        public bool UpdateourContainer([FromBody]States ourState)
        {
            return _StatesRepository.UpdateState(ourState);
        }
        [Route("{id}")]
        [HttpDelete]
        public bool Delete(int id)
        {
            return _StatesRepository.DeleteState(id);
        }
    }
}
