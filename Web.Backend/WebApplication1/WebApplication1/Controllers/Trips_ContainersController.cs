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
    public class Trips_ContainersController : Controller
    {
        private readonly ITrips_ContainersRepository _Trips_ContainersRepo;
        public Trips_ContainersController(ITrips_ContainersRepository Trips_ContainersRepo)
        {
            _Trips_ContainersRepo = Trips_ContainersRepo;
        }
        [HttpGet]
        public IEnumerable<Trips_Containers> Get()
        {
            return _Trips_ContainersRepo.GetAllTrips_Containers();
        }
        [HttpGet]
        [Route("tc/trip/{id}")]
        public IEnumerable<Trips_Containers> GetByTripId(int id)
        {
                return _Trips_ContainersRepo.GetByTripId(id);
        }
        [HttpGet("tc/container/{id}")]
        public IEnumerable<Trips_Containers> GetByContainerId(int id)
        {
            if (id != null)
            {
                return _Trips_ContainersRepo.GetByContainerId(id);
            }
            else
            {
                new System.ArgumentNullException("Nera tokio id");
                return null;
            }
        }


        [HttpPost]
        public bool Create([FromBody]Trips_Containers ourTrip_Container)
        {
            return _Trips_ContainersRepo.InsertTrip_Container(ourTrip_Container);
        }
        [HttpPut("tc/trip")]
        public bool UpdateByTripId([FromBody]Trips_Containers ourTrip_Container)
        {
            return _Trips_ContainersRepo.UpdateByTripId(ourTrip_Container);
        }
        [HttpPut("tc/container")]
        public bool UpdateByContainerId([FromBody]Trips_Containers ourTrip_Container)
        {
            return _Trips_ContainersRepo.UpdateByContainerId(ourTrip_Container);
        }
        [HttpPut("tc/priority")]
        public bool UpdateByPriority([FromBody]Trips_Containers ourTrip_Container)
        {
            return _Trips_ContainersRepo.UpdateByPriority(ourTrip_Container);
        }
        [HttpDelete("tc/container/{id}")]
        public bool DeleteByContainerId(int id)
        {
            return _Trips_ContainersRepo.DeleteByContainerId(id);
        }
        [HttpDelete("ct/trip/{id}")]
        public bool DeleteByTripId(int id)
        {
            return _Trips_ContainersRepo.DeleteByTripId(id);
        }
    }
}
