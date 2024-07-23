using Microsoft.EntityFrameworkCore;
using PoweredByXixo.Application.Services.Contracts;
using System.Security.Cryptography;

namespace PoweredByXixo.Infra.Data.Repositories
{
    public class Repository<TEntity, TPrimaryKey> : IRepository<TEntity, TPrimaryKey> where TEntity : class
    {
        protected readonly ApplicationDbContext _context;
        protected readonly DbSet<TEntity> DbSet;
        public Repository(ApplicationDbContext context)
        {
            _context = context;
            DbSet = context.Set<TEntity>();
        }
        public async Task<TEntity> Create(TEntity entity)
        {
            return (await DbSet.AddAsync(entity)).Entity;
        }

        public async Task<TEntity> Retrieve(TPrimaryKey pk)
        {
            return await DbSet.FindAsync(pk);
        }

        public async Task<List<TEntity>> RetrieveAll()
        {
            return await DbSet.ToListAsync();
        }

        public TEntity Update(TEntity entity, TPrimaryKey pk)
        {
            var existingEntity = DbSet.Find(pk);
            if (existingEntity != null)
            {
                _context.Entry(existingEntity).CurrentValues.SetValues(entity);
                _context.SaveChanges();
            }
            return existingEntity;
        }

        public async Task<TEntity> Delete(TPrimaryKey pk)
        {
            var entity = await Retrieve(pk);
            return (DbSet.Remove(entity)).Entity;
        }
    }
}
