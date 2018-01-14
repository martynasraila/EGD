using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGD.Models
{
    public class Containers
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public int? Longitude { get; set; }
        public int? Latitude { get; set; }
        public string Description { get; set; }
        public int? EGDid { get; set; }
        public int? LastStateid {get;set;}

    }
}
