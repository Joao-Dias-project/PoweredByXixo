﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoweredByXixo.Domain
{
    public class Client
    {
        public int Id { get; set; }
        public string? InvoiceId { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? PostalCode { get; set; }
        public string? Location { get; set; }
        public string PhoneNumber { get; set; }
        public string? TaxNumber { get; set; }
    }
}