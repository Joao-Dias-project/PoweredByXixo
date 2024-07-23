using PoweredByXixo.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoweredByXixo.Application.Services.Contracts
{
    public interface IRepository<TEntity, TPrimaryKey>
    {
        Task<TEntity> Create(TEntity entity);
        Task<TEntity> Retrieve(TPrimaryKey pk);
        Task<List<TEntity>> RetrieveAll();
        TEntity Update(TEntity entity, TPrimaryKey pk);
        Task<TEntity> Delete(TPrimaryKey pk);

    }
}
