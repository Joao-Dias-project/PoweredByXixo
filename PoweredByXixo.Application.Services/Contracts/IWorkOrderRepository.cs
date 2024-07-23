using PoweredByXixo.Application.Services.Contracts.Dtos;
using PoweredByXixo.Domain;

namespace PoweredByXixo.Application.Services.Contracts
{
    public interface IWorkOrderRepository : IRepository<WorkOrder, int>
    {
        Task<List<WorkOrder>> RetrieveLast20();

        Task<List<WorkOrder>> RetrieveByFilter(WorkOrderFilterDto filter);
        Task<WorkOrder> CreateWorkOrder(WorkOrder wo);
        Task<List<Motorcycle>> RetrieveMotorcyclesByClient(int clientId);
        Task<List<WorkOrder>> RetrieveWorkOrdersByMotorcycle(int motorcycleId);
    }
}
