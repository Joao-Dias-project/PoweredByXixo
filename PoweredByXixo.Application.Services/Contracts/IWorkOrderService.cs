using PoweredByXixo.Application.Services.Contracts.Dtos;
using PoweredByXixo.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoweredByXixo.Application.Services.Contracts
{
    public interface IWorkOrderService: IService<WorkOrder, int, WorkOrderFilterDto>
    {
        Task<List<WorkOrder>> RetrieveWorkOrdersByMotorcycle(int motorcycleId);
    }
}
