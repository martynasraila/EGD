using EGD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGD.Repositories.Interfaces
{
    public interface ICollectors_TripsRepository
    {
        List<Collectors_Trips> GetAllCollectors_Trips();
        List<Collectors_Trips> GetByCollectorId(int id);
        List<Collectors_Trips> GetByTripId(int id);
        bool InsertCollector_Trip(Collectors_Trips ourCollector_Trip);
        bool UpdateByCollectorId(Collectors_Trips ourCollector_Trip);
        bool UpdateByTripId(Collectors_Trips ourCollector_Trip);
        bool DeleteByCollectorId(int id);
        bool DeleteByTripId(int id);
    }
}
