using System.Collections.Generic;

namespace Transferalize
{
    public class TSChartOptions
    {
        public string Id { get; set; }
        public string ConfigMethodName { get; set; }
        public object Configurations { get; set; }
        public string Type { get; set; }
        public int Height { get; set; }
        public List<object> Data { get; set; }
    }
}
