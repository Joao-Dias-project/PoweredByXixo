using PoweredByXixo.Application.Services.Contracts.Dtos;
using PoweredByXixo.Domain;

namespace PoweredByXixo.Application.Services.Contracts
{
    public interface IClientService : IService<Client, int, ClientFilterDto>
    {
    }
}
