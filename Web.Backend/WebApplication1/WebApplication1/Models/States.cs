using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGD.Models
{
    public class States
    {
        public int Id { get; set; }
        public string ImagePath { get; set; }
        public DateTime Date { get; set; }
        public int StateValueId { get; set; }
    }
}
