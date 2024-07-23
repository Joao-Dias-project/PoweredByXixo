using PoweredByXixo.Application.Services.Contracts.Dtos;
using PoweredByXixo.Domain;

namespace PoweredByXixo.Application.Services.Contracts
{
    public interface IMotorcycleRepository : IRepository<Motorcycle, int>
    {
        Task<Motorcycle> RetrieveByLicensePlate(string licensePlate);
        Task<List<string>> RetrieveAllLicensePlates();
        Task<List<Motorcycle>> RetrieveLast20();

        Task<List<Motorcycle>> RetrieveByFilter(Motorcycle filter);
    }
}
