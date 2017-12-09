using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1
{
    public interface IEGDRepository
    {
        List<EGD> GetAllEGD();
        EGD GetById(int id);
        bool InsertEGD(EGD ourEgd);
        bool UpdateEGD(EGD ourEgd);
        bool DeleteEGD(int id);
    }
}
