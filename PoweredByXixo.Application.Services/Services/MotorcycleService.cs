using PoweredByXixo.Application.Services.Contracts;
using PoweredByXixo.Application.Services.Contracts.Dtos;
using PoweredByXixo.Domain;

namespace PoweredByXixo.Application.Services.Services
{
    public class MotorcycleService : IMotorcycleService
    {
        private readonly IMotorcycleRepository _repository;
        private readonly IWorkOrderRepository _workOrderRaepository;
        private readonly IUnitOfWork _unitOfWork;

        public MotorcycleService(IMotorcycleRepository repository, IUnitOfWork unitOfWork, IWorkOrderRepository workOrderRaepository)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _workOrderRaepository = workOrderRaepository;
        }
        public async Task<Motorcycle> Create(Motorcycle motorcycle)
        {
            try
            {
                var entity = await _repository.Create(motorcycle);
                await _unitOfWork.Commit();
                return entity;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception occurred in Service: {ex.Message}");
                throw;
            }
        }

        public async Task<Motorcycle> Delete(int id)
        {
            var entity = await _repository.Delete(id);
            await _unitOfWork.Commit();
            return entity;
        }

        public Task<Motorcycle> Retrieve(int id)
        {
            return _repository.Retrieve(id);
        }

        public Task<List<Motorcycle>> RetrieveAll()
        {
            return _repository.RetrieveLast20();
        }

        public Task<List<string>> RetrieveAllLicensePlates()
        {
            throw new NotImplementedException();
        }

        public async Task<List<Motorcycle>> RetrieveByFilter(MotorcycleFilterDto filter)
        {
            var motorcycle = new Motorcycle
            {
                Make = filter.Make,
                Model = filter.Model,
                LicensePlate = filter.LicensePlate,
                VIN = filter.VIN
            };

            return await _repository.RetrieveByFilter(motorcycle);
        }

        public Task<Motorcycle> RetrieveByLicensePlate(string licensePlate)
        {
            return _repository.RetrieveByLicensePlate(licensePlate);
        }

        public Task<List<Motorcycle>> RetrieveMotorcyclesByClient(int clientId)
        {
            return _workOrderRaepository.RetrieveMotorcyclesByClient(clientId);
        }

        public async Task<Motorcycle> Update(Motorcycle motorcycle, int id)
        {
            var entity = _repository.Update(motorcycle, id);
            await _unitOfWork.Commit();
            return entity;
        }
    }
}
