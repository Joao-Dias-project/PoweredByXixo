﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoweredByXixo.Application.Services.Contracts.Dtos
{
    public class ClientFilterDto
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? TaxNumber { get; set; }
    }
}
