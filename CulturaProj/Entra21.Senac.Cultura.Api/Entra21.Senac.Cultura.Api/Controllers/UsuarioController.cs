using Cultura.Application.Dtos.Input;
using Cultura.Application.Interfaces.Service;
using Entra21.Senac.Cultura.Api.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Entra21.Senac.Cultura.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost]
        [ValidarDto(typeof(UsuarioCreateDto))]
        public async Task<IActionResult> AddUser([FromBody] UsuarioCreateDto usuarioDto)
        {
            await _usuarioService.CreateUsuario(usuarioDto);
            return Ok();
        }

    }
}
