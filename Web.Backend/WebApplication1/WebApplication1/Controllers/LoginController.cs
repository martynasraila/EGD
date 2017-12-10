using EGD.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGD.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly ILoginRepository _LoginRepo;
        public LoginController(ILoginRepository loginrepo)
        {
            _LoginRepo = loginrepo;
        }
        [HttpPost("{UserName}")]
        public object Get(string UserName)
        {
            return _LoginRepo.Get(UserName);
        }
    }
}
