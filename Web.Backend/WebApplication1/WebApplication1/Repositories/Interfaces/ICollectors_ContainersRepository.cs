using EGD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGD.Repositories
{
    public interface ICollectors_ContainersRepository
    {
        List<Collectors_Containers> GetAllCollectors_Containers();
        List<Collectors_Containers> GetByCollectorId(int id);
        List<Collectors_Containers> GetByContainerId(int id);
        bool InsertCollector_Container(Collectors_Containers ourCollector_Container);
        bool UpdateByCollectorId(Collectors_Containers ourCollector_Container);
        bool UpdateByContainerId(Collectors_Containers ourCollector_Container);
        bool DeleteByCollectorId(int id);
        bool DeleteByContainerId(int id);
    }
}
