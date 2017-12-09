using EGD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGD.Repositories
{
    public interface ICollectorsRepository
    {
        List<Collectors> GetAllCollectors();
        Collectors GetById(int id);
        bool InsertCollector(Collectors ourCollectors);
        bool UpdateCollector(Collectors ourCollectors);
        bool DeleteCollector(int id);
    }
}
