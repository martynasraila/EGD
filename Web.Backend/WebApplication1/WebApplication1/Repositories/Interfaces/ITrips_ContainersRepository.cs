using EGD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGD.Repositories.Interfaces
{
    public interface ITrips_ContainersRepository
    {
        List<Trips_Containers> GetAllTrips_Containers();
        List<Trips_Containers> GetByTripId(int id);
        List<Trips_Containers> GetByContainerId(int id);
        bool InsertTrip_Container(Trips_Containers ourTrip_Container);
        bool UpdateByTripId(Trips_Containers ourTrip_Container);
        bool UpdateByContainerId(Trips_Containers ourTrip_Container);
        bool UpdateByPriority(Trips_Containers ourTrip_Container);
        bool DeleteByTripId(int id);
        bool DeleteByContainerId(int id);
    }
}
