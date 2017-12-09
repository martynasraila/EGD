using EGD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGD.Repositories
{
    public interface IStatesRepository
    {
        List<States> GetAllStates();
        States GetById(int id);
        bool InsertState(States ourState);
        bool UpdateState(States ourState);
        bool DeleteState(int id);
    }
}
