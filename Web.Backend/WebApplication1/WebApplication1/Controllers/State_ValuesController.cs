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
    public class State_ValuesController : Controller
    {
        private readonly IState_ValuesRepository _State_ValuesRepo;
        public State_ValuesController(IState_ValuesRepository State_ValuesRepo)
        {
            _State_ValuesRepo = State_ValuesRepo;
        }
        [HttpGet]
        public IEnumerable<State_Values> Get()
        {
            return _State_ValuesRepo.GetAllState_Values();
        }
        [HttpGet("{id}")]
        public State_Values GetById(int id)
        {

                return _State_ValuesRepo.GetById(id);

        }
    }
}
