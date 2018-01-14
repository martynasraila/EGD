using EGD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGD.Repositories
{
    public interface ITripsRepository
    {
        List<Trips> GetAllTrips();
        Trips GetById(int id);
        int InsertTrip(Trips ourTrip);
        bool UpdateTrip(Trips ourTrip);
        bool DeleteTrip(int id);
    }
}
