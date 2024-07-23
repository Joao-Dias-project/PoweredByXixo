using Microsoft.AspNetCore.Mvc;
using PoweredByXixo.Application.Services.Contracts;
using PoweredByXixo.Application.Services.Contracts.Dtos;
using PoweredByXixo.Domain;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PoweredByXixo.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _service;

        public ClientController(IClientService clientService)
        {
            _service = clientService;
        }

        [HttpGet]
        public async Task<IActionResult> RetrieveAll()
        {
            return Ok(await _service.RetrieveAll());
        }

        [HttpGet("clientId/{id}")]
        public async Task<IActionResult> Retrieve(int id)
        {
            return Ok(await _service.Retrieve(id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(Client client)
        {
            return Ok(await _service.Create(client));
        }

        [HttpPut]
        public async Task<IActionResult> Update(Client client)
        {
            return Ok(await _service.Update(client, client.Id));
        }

        [HttpDelete("clientId/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpGet("filter")]
        public async Task<ActionResult<List<Client>>> RetrieveByFilter([FromQuery] ClientFilterDto filter)
        {
            var clients = await _service.RetrieveByFilter(filter);
            return Ok(clients);
        }
    }
}
