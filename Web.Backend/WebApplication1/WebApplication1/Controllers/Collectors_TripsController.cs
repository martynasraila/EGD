using EGD.Models;
using EGD.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGD.Controllers
{
    [Route("api/[controller]")]

    public class Collectors_TripsController : Controller
    {
        private readonly ICollectors_TripsRepository _Collectors_TripsRepo;
        public Collectors_TripsController(ICollectors_TripsRepository Collectors_TripsRepo)
        {
            _Collectors_TripsRepo = Collectors_TripsRepo;
        }
        [HttpGet]
        public IEnumerable<Collectors_Trips> Get()
        {
            return _Collectors_TripsRepo.GetAllCollectors_Trips();
        }
        [HttpGet]
        [Route("ct/collector/{id}")]
        public IEnumerable<Collectors_Trips> GetByCollectorId(int id)
        {
            if (id != null)
            {
                return _Collectors_TripsRepo.GetByCollectorId(id);
            }
            else
            {
                new System.ArgumentNullException("Nera tokio id");
                return null;
            }
        }
        [HttpGet("ct/trip/{id}")]
        public IEnumerable<Collectors_Trips> GetByTripId(int id)
        {
            if (id != null)
            {
                return _Collectors_TripsRepo.GetByTripId(id);
            }
            else
            {
                new System.ArgumentNullException("Nera tokio id");
                return null;
            }
        }


        [HttpPost]
        public bool Create([FromBody]Collectors_Trips ourCollector_Trip)
        {
            return _Collectors_TripsRepo.InsertCollector_Trip(ourCollector_Trip);
        }
        [HttpPut("ct/collector")]
        public bool UpdateByCollectorId([FromBody]Collectors_Trips ourCollector_Trip)
        {
            return _Collectors_TripsRepo.UpdateByCollectorId(ourCollector_Trip);
        }
        [HttpPut("ct/trip")]
        public bool UpdateByTripId([FromBody]Collectors_Trips ourCollector_Trip)
        {
            return _Collectors_TripsRepo.UpdateByTripId(ourCollector_Trip);
        }
        [HttpDelete("ct/collector/{id}")]
        public bool DeleteByCollectorId(int id)
        {
            return _Collectors_TripsRepo.DeleteByCollectorId(id);
        }
        [HttpDelete("ct/trip/{id}")]
        public bool DeleteByTripId(int id)
        {
            return _Collectors_TripsRepo.DeleteByTripId(id);
        }
    }
}
