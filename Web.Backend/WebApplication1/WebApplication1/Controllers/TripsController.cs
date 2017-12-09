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
    public class TripsController : Controller
    {
        private readonly ITripsRepository _TripsRepo;
        public TripsController(ITripsRepository TripsRepo)
        {
            _TripsRepo = TripsRepo;
        }
        [HttpGet]
        public IEnumerable<Trips> Get()
        {
            return _TripsRepo.GetAllTrips();
        }
        [HttpGet("{id}")]
        public Trips GetById(int id)
        {
            if (id != null)
            {
                return _TripsRepo.GetById(id);
            }
            else
            {
                new System.ArgumentNullException("Nera tokio id");
                return null;
            }
        }
        [HttpPost]
        public bool Create([FromBody]Trips ourTrip)
        {
            return _TripsRepo.InsertTrip(ourTrip);
        }
        [HttpPut]
        public bool UpdateourContainer([FromBody]Trips ourTrip)
        {
            return _TripsRepo.UpdateTrip(ourTrip);
        }
        [Route("{id}")]
        [HttpDelete]
        public bool Delete(int id)
        {
            return _TripsRepo.DeleteTrip(id);
        }
    }
}
