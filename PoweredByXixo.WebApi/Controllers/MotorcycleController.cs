using Microsoft.AspNetCore.Mvc;
using PoweredByXixo.Application.Services.Contracts;
using PoweredByXixo.Application.Services.Contracts.Dtos;
using PoweredByXixo.Domain;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PoweredByXixo.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MotorcycleController : ControllerBase
    {
        private readonly IMotorcycleService _service;

        public MotorcycleController(IMotorcycleService motorcycleService)
        {
            _service = motorcycleService;
        }

        [HttpGet]
        public async Task<IActionResult> RetrieveAll()
        {
            return Ok(await _service.RetrieveAll());
        }

        [HttpGet("motorcycleId/{id}")]
        public async Task<IActionResult> Retrieve(int id)
        {
            return Ok(await _service.Retrieve(id));
        }

        [HttpGet("clientId/{clientId}")]
        public async Task<IActionResult> RetrieveMotorcyclesByClient(int clientId)
        {
            return Ok(await _service.RetrieveMotorcyclesByClient(clientId));
        }

        [HttpGet("motorcycleLicensePlate/{licensePlate}")]
        public async Task<IActionResult> RetrieveByLicensePlate(string licensePlate)
        {
            return Ok(await _service.RetrieveByLicensePlate(licensePlate));
        }

        [HttpPost]
        public async Task<IActionResult> Create(Motorcycle motorcycle)
        {
            return Ok(await _service.Create(motorcycle));
        }

        [HttpPut]
        public async Task<IActionResult> Update(Motorcycle motorcycle)
        {
            return Ok(await _service.Update(motorcycle, motorcycle.Id));
        }

        [HttpDelete("motorcycleId/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpGet("filter")]
        public async Task<ActionResult<List<Motorcycle>>> RetrieveByFilter([FromQuery] MotorcycleFilterDto filter)
        {
                var motorcycles = await _service.RetrieveByFilter(filter);
                return Ok(motorcycles);
        }
    }
}
