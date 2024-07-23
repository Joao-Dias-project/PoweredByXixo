using PoweredByXixo.Domain;
using PoweredByXixo.Application.Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace PoweredByXixo.Infra.Data.Repositories
{
    public class ClientRepository : Repository<Client, int>, IClientRepository
    {
        public ClientRepository(ApplicationDbContext context) : base(context)
        {
            context.Clients
            .ToList();
        }

        public async Task<List<Client>> RetrieveByFilter(Client filter)
        {
            IQueryable<Client> query = DbSet.AsQueryable();

            if (!string.IsNullOrEmpty(filter.Name))
            {
                query = query.Where(c => EF.Functions.Like(c.Name, $"%{filter.Name}%"));
            }
            if (!string.IsNullOrEmpty(filter.Email))
            {
                query = query.Where(c => EF.Functions.Like(c.Email, $"%{filter.Email}%"));
            }
            if (!string.IsNullOrEmpty(filter.PhoneNumber))
            {
                query = query.Where(c => EF.Functions.Like(c.PhoneNumber, $"%{filter.PhoneNumber}%"));
            }
            if (!string.IsNullOrEmpty(filter.TaxNumber))
            {
                query = query.Where(c => EF.Functions.Like(c.TaxNumber, $"%{filter.TaxNumber}%"));
            }

            query = query.OrderByDescending(c => c.Id);

            return await query.ToListAsync();
        }

        public async Task<List<Client>> RetrieveLast20()
        {
            return await DbSet
                            .OrderByDescending(entity => entity.Id)
                            .Take(20)
                            .ToListAsync();
        }
    }
}
