using EGD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGD.Repositories
{
    public interface IState_ValuesRepository
    {
        List<State_Values> GetAllState_Values();
        State_Values GetById(int id);
    }
}
