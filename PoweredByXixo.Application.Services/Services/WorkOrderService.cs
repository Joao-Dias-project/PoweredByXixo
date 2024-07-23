using PoweredByXixo.Application.Services.Contracts;
using PoweredByXixo.Application.Services.Contracts.Dtos;
using PoweredByXixo.Domain;

namespace PoweredByXixo.Application.Services.Services
{
    public class WorkOrderService : IWorkOrderService
    {
        private readonly IWorkOrderRepository _workOrderRepository;
        private readonly IUnitOfWork _unitOfWork;
        
        public WorkOrderService(IWorkOrderRepository workOrderRepository, IUnitOfWork unitOfWork)
        {
            _workOrderRepository = workOrderRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<WorkOrder> Create(WorkOrder wo)
        {
            try
            {
                return await _workOrderRepository.CreateWorkOrder(wo);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception occurred in Service: {ex.Message}");
                throw;
            }
        }

        public async Task<WorkOrder> Delete(int id)
        {
            var entity = await _workOrderRepository.Delete(id);
            await _unitOfWork.Commit();
            return entity;
        }

        public Task<WorkOrder> Retrieve(int id)
        {
            return _workOrderRepository.Retrieve(id);
        }

        public Task<List<WorkOrder>> RetrieveAll()
        {
            return _workOrderRepository.RetrieveLast20();
        }

        public async Task<List<WorkOrder>> RetrieveByFilter(WorkOrderFilterDto filter)
        {
            return await _workOrderRepository.RetrieveByFilter(filter);
        }

        public async Task<List<WorkOrder>> RetrieveWorkOrdersByMotorcycle(int motorcycleId)
        {
            return await _workOrderRepository.RetrieveWorkOrdersByMotorcycle(motorcycleId);
        }

        public async Task<WorkOrder> Update(WorkOrder wo, int id)
        {
            var entity = _workOrderRepository.Update(wo, id);
            await _unitOfWork.Commit();
            return entity;
        }
    }
}
