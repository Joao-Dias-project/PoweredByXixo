using PoweredByXixo.Application.Services.Contracts;
using PoweredByXixo.Application.Services.Contracts.Dtos;
using PoweredByXixo.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoweredByXixo.Application.Services.Services
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository _repository;
        private readonly IUnitOfWork _unitOfWork;

        public ClientService(IClientRepository repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }
        public async Task<Client> Create(Client client)
        {
            try
            {
                var entity = await _repository.Create(client);
                await _unitOfWork.Commit();
                return entity;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception occurred in Service: {ex.Message}");
                throw;
            }
        }

        public async Task<Client> Delete(int id)
        {
            var entity = await _repository.Delete(id);
            await _unitOfWork.Commit();
            return entity;
        }

        public Task<Client> Retrieve(int id)
        {
            return _repository.Retrieve(id);
        }

        public Task<List<Client>> RetrieveAll()
        {
            return _repository.RetrieveLast20();
        }

        public async Task<List<Client>> RetrieveByFilter(ClientFilterDto filter)
        {
            var client = new Client
            {
                Name = filter.Name,
                Email = filter.Email,
                PhoneNumber = filter.PhoneNumber,
                TaxNumber = filter.TaxNumber
            };

            return await _repository.RetrieveByFilter(client);
        }

        public async Task<Client> Update(Client client, int id)
        {
            var entity = _repository.Update(client, id);
            await _unitOfWork.Commit();
            return entity;
        }
    }
}
