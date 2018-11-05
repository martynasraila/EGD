using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Repositories;

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
        public IEnumerable<WebApplication1.Models.EGD> Get()
        {
            return _EGDRepo.GetAllEGD();
        }

        [HttpGet("{id}")]
        public WebApplication1.Models.EGD GetById(int id)
        {
            return _EGDRepo.GetById(id);
        }

        [HttpPost]
        public int Create([FromBody]WebApplication1.Models.EGD ourEGD)
        {
            return _EGDRepo.InsertEGD(ourEGD);
        }

        [HttpPut]
        public bool UpdateEGD([FromBody]WebApplication1.Models.EGD ourEgd)
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
