using PoweredByXixo.Application.Services.Contracts.Dtos;
using PoweredByXixo.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoweredByXixo.Application.Services.Contracts
{
    public interface IService<TEntity, TPrimaryKey, TEntityFilterDto>
    {
        Task<TEntity> Create(TEntity entity);
        Task<TEntity> Retrieve(TPrimaryKey pk);
        Task<List<TEntity>> RetrieveAll();
        Task<TEntity> Update(TEntity entity, TPrimaryKey pk);
        Task<TEntity> Delete(TPrimaryKey pk);
        Task<List<TEntity>> RetrieveByFilter(TEntityFilterDto entity);
    }
}
