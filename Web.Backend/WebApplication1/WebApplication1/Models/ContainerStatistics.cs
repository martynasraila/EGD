using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGD.Models
{
    public class ContainerStatistics
    {
        public int ContainerCount { get; set; }
        public int EGDCount { get; set; }
        public int ActiveEGD { get; set; }
        public int InActiveEGD { get; set; }
        public int FullContainerCount { get; set; }
        public int EmptyContainers { get; set; }
        public int TodaysTrips { get; set; }
        public int CollectorsCount { get; set; }
        public int WorksToday { get; set; }

    }
}
