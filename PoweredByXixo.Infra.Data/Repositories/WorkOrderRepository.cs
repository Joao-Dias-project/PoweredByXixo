using PoweredByXixo.Application.Services.Contracts;
using PoweredByXixo.Domain;
using Microsoft.EntityFrameworkCore;
using PoweredByXixo.Application.Services.Contracts.Dtos;
using Microsoft.Data.SqlClient;

namespace PoweredByXixo.Infra.Data.Repositories
{
    public class WorkOrderRepository : Repository<WorkOrder, int>, IWorkOrderRepository
    {

        protected readonly IUnitOfWork _unitOfWork;
        public WorkOrderRepository(ApplicationDbContext context, IUnitOfWork unitOfWork) : base(context)
        {
            _unitOfWork = unitOfWork;
            context.WorkOrders
                .Include(wo => wo.Client)
                .Include(wo => wo.Motorcycle)
                .ToList();
        }
        public async Task<WorkOrder> CreateWorkOrder(WorkOrder wo)
        {
            try
            {
                var existingClient = _context.ChangeTracker.Entries<Client>()
                                             .FirstOrDefault(e => e.Entity.Id == wo.Client.Id)?.Entity;
                if (existingClient != null)
                {
                    wo.Client = existingClient;
                }
                else
                {
                    _context.Entry(wo.Client).State = EntityState.Unchanged;
                }

                var existingMotorcycle = _context.ChangeTracker.Entries<Motorcycle>()
                                                 .FirstOrDefault(e => e.Entity.Id == wo.Motorcycle.Id)?.Entity;
                if (existingMotorcycle != null)
                {
                    wo.Motorcycle = existingMotorcycle;
                }
                else
                {
                    _context.Entry(wo.Motorcycle).State = EntityState.Unchanged;
                }

                _context.WorkOrders.Attach(wo);
                await _context.SaveChangesAsync();
                return wo;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception occurred in Repository: {ex.Message}");
                throw;
            }
        }

        public async Task<List<WorkOrder>> RetrieveByFilter(WorkOrderFilterDto filter)
        {
            IQueryable<WorkOrder> query = DbSet.AsQueryable();

            if (filter.Id.HasValue && filter.Id > 0)
            {
                query = query.Where(w => w.Id == filter.Id);
            }

            if (filter.ClientId.HasValue && filter.ClientId > 0)
            {
                query = query.Where(w => w.Client.Id == filter.ClientId);
            }

            if (filter.MotorcycleId.HasValue && filter.MotorcycleId > 0)
            {
                query = query.Where(w => w.Motorcycle.Id == filter.MotorcycleId);
            }

            if (filter.DateStart.HasValue)
            {
                query = query.Where(w => w.Date >= filter.DateStart);
            }

            if (filter.Date.HasValue)
            {
                query = query.Where(w => w.Date <= filter.Date);
            }

            query = query.OrderByDescending(w => w.Date);

            return await query.ToListAsync();
        }

        public async Task<List<WorkOrder>> RetrieveLast20()
        {
            return await DbSet
                            .OrderByDescending(entity => entity.Date)
                            .Take(20)
                            .ToListAsync();
        }

        public async Task<List<Motorcycle>> RetrieveMotorcyclesByClient(int clientId)
        {
            var motorcycles = await _context.WorkOrders
                                                    .Where(w => w.Client.Id == clientId)
                                                    .Select(w => w.Motorcycle)
                                                    .Distinct()
                                                    .ToListAsync();

            return motorcycles;
        }

        public async Task<List<WorkOrder>> RetrieveWorkOrdersByMotorcycle(int motorcycleId)
        {
            var workOrders = await _context.WorkOrders
                                                    .Where(w => w.Motorcycle.Id == motorcycleId)
                                                    .OrderByDescending(entity => entity.Date)
                                                    .ToListAsync();

            return workOrders;
        }
    }
}
