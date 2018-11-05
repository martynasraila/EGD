using EGD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGD.Repositories
{
    public interface IContainersRepository
    {
        List<Containers> GetAllContainers();
        Containers GetById(int id);
        int InsertContainer(Containers ourContainer);
        bool UpdateContainer(Containers ourContainer);
        bool DeleteContainer(int id);
        List<ContainerStatistics> GetStatistics();
    }
}
