using PoweredByXixo.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace PoweredByXixo.Application.Services.Contracts.Dtos
{
    public class WorkOrderFilterDto
    {
        public int? Id { get; set; }
        public int? ClientId { get; set; }
        public int? MotorcycleId { get; set; }
        public DateOnly? Date { get; set; }
        public DateOnly? DateStart { get; set; }
    }
}
