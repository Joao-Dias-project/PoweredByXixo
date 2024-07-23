using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace PoweredByXixo.Domain
{
    public class WorkOrder
    {
        public int Id { get; set; }
        public Client Client { get; set; }
        public Motorcycle Motorcycle { get; set; }
        public DateOnly Date { get; set; }
        public int? Mileage { get; set; }
        public string? ReportedIssues { get; set; }
        public string? WorkPerformed { get; set; }

        public WorkOrder()
        {
            this.Client = new Client();
            this.Motorcycle = new Motorcycle();
            Date = DateOnly.FromDateTime(DateTime.Now);
        }
        public WorkOrder(Client client)
        {
            this.Client = client;
            this.Motorcycle = new Motorcycle();
            Date = DateOnly.FromDateTime(DateTime.Now);
        }
        public WorkOrder(Motorcycle motorcycle)
        {
            this.Client = new Client();
            this.Motorcycle = motorcycle;
            Date = DateOnly.FromDateTime(DateTime.Now);
        }
        public WorkOrder(Client client, Motorcycle motorcycle)
        {
            this.Client = client;
            this.Motorcycle = motorcycle;
            Date = DateOnly.FromDateTime(DateTime.Now);
        }
    }
}
