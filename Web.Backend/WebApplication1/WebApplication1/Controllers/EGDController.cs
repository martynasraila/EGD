using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    public class EGDController : Controller
    {
        private readonly IEGDRepository _EGDRepo;
        public EGDController(IEGDRepository EGDRepo)
        {
            _EGDRepo = EGDRepo;
        }

        [HttpGet]
        public IEnumerable<EGD> Get()
        {
            return _EGDRepo.GetAllEGD();
        }

        [HttpGet("{id}")]
        public EGD GetById(int id)
        {
            if(id != null)
            {
                return _EGDRepo.GetById(id);
            }
            else
            {
                new System.ArgumentNullException("Nera tokio id");
                return null;
            }
        }
        [HttpPost]
        public bool Create([FromBody]EGD ourEGD)
        {
            return _EGDRepo.InsertEGD(ourEGD);
        }
        [HttpPut]
        public bool UpdateEGD([FromBody]EGD ourEgd)
        {
            return _EGDRepo.UpdateEGD(ourEgd);
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return _EGDRepo.DeleteEGD(id);
        }
    }
}
