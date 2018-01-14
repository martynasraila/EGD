using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGD.Models
{
    public class LoginDto
    {
        public int Id { get; set; }
        public string PasswordHash { get; set; }
        public string Title { get; set; }
        public string UserKind { get; set; }
    }
}
