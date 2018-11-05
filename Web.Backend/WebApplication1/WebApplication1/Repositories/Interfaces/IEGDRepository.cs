using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Repositories
{
    public interface IEGDRepository
    {
        List<WebApplication1.Models.EGD> GetAllEGD();
        WebApplication1.Models.EGD GetById(int id);
        int InsertEGD(WebApplication1.Models.EGD ourEgd);
        bool UpdateEGD(WebApplication1.Models.EGD ourEgd);
        bool DeleteEGD(int id);
    }
}
