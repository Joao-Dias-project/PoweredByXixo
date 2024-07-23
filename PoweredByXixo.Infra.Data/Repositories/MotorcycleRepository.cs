using Microsoft.EntityFrameworkCore;
using PoweredByXixo.Application.Services.Contracts;
using PoweredByXixo.Domain;

namespace PoweredByXixo.Infra.Data.Repositories
{
    public class MotorcycleRepository : Repository<Motorcycle, int>, IMotorcycleRepository
    {
        public MotorcycleRepository(ApplicationDbContext context) : base(context)
        {
            context.Motorcycles
            .ToList();
        }
        public Task<List<string>> RetrieveAllLicensePlates()
        {
            throw new NotImplementedException();
        }

        public async Task<List<Motorcycle>> RetrieveByFilter(Motorcycle filter)
        {
            IQueryable<Motorcycle> query = DbSet.AsQueryable();

            if (!string.IsNullOrEmpty(filter.Make))
            {
                query = query.Where(m => EF.Functions.Like(m.Make, $"%{filter.Make}%"));
            }
            if (!string.IsNullOrEmpty(filter.Model))
            {
                query = query.Where(m => EF.Functions.Like(m.Model, $"%{filter.Model}%"));
            }
            if (!string.IsNullOrEmpty(filter.LicensePlate))
            {
                query = query.Where(m => EF.Functions.Like(m.LicensePlate, $"%{filter.LicensePlate}%"));
            }
            if (!string.IsNullOrEmpty(filter.VIN))
            {
                query = query.Where(m => EF.Functions.Like(m.VIN, $"%{filter.VIN}%"));
            }

            query = query.OrderByDescending(m => m.Id);

            return await query.ToListAsync();
        }

        public async Task<Motorcycle> RetrieveByLicensePlate(string licensePlate)
        {
            return await DbSet.Where(m => m.LicensePlate == licensePlate).SingleAsync();
        }

        public async Task<List<Motorcycle>> RetrieveLast20()
        {
            return await DbSet
                            .OrderByDescending(entity => entity.Id)
                            .Take(20)
                            .ToListAsync();
        }
    }
}
