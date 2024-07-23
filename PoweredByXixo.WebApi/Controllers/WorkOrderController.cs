using Microsoft.AspNetCore.Mvc;
using PoweredByXixo.Application.Services.Contracts.Dtos;
using PoweredByXixo.Application.Services.Contracts;
using PoweredByXixo.Domain;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PoweredByXixo.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkOrderController : ControllerBase
    {
        private readonly IWorkOrderService _service;

        public WorkOrderController(IWorkOrderService workOrderService)
        {
            _service = workOrderService;
        }

        [HttpGet]
        public async Task<IActionResult> RetrieveAll()
        {
            return Ok(await _service.RetrieveAll());
        }

        [HttpGet("workOrderId/{id}")]
        public async Task<IActionResult> Retrieve(int id)
        {
            return Ok(await _service.Retrieve(id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(WorkOrder wo)
        {
            return Ok(await _service.Create(wo));
        }

        [HttpPut]
        public async Task<IActionResult> Update(WorkOrder wo)
        {
            return Ok(await _service.Update(wo, wo.Id));
        }

        [HttpDelete("workOrderId/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpGet("filter")]
        public async Task<ActionResult<List<WorkOrder>>> RetrieveByFilter([FromQuery] WorkOrderFilterDto filter)
        {
            var workOrders = await _service.RetrieveByFilter(filter);
            return Ok(workOrders);
        }

        [HttpGet("motorcycleId/{motorcycleId}")]
        public async Task<ActionResult<List<WorkOrder>>> RetrieveyWorkOrdersByMotorcycle (int motorcycleId)
        {
            return Ok(await _service.RetrieveWorkOrdersByMotorcycle(motorcycleId));
        }
    }
}
