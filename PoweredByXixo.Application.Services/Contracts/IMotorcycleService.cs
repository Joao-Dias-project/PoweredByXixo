using PoweredByXixo.Application.Services.Contracts.Dtos;
using PoweredByXixo.Domain;

namespace PoweredByXixo.Application.Services.Contracts
{
    public interface IMotorcycleService : IService<Motorcycle, int, MotorcycleFilterDto>
    {
        Task<Motorcycle> RetrieveByLicensePlate(string licensePlate);
        Task<List<string>> RetrieveAllLicensePlates();

        Task<List<Motorcycle>> RetrieveMotorcyclesByClient(int clientId);
    }
}
