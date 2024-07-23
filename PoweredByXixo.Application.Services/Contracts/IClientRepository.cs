using PoweredByXixo.Domain;

namespace PoweredByXixo.Application.Services.Contracts
{
    public interface IClientRepository : IRepository<Client, int>
    {
        Task<List<Client>> RetrieveLast20();

        Task<List<Client>> RetrieveByFilter(Client filter);
    }
}
