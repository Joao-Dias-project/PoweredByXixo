﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoweredByXixo.Domain
{
    public class Motorcycle
    {
        public int Id { get; set; }
        public string? Make { get; set; }
        public string? Model { get; set; }
        public string LicensePlate { get; set; }
        public string? VIN { get; set; }
        public int? Mileage { get; set; }
        public int? Year { get; set; }
    }
}
