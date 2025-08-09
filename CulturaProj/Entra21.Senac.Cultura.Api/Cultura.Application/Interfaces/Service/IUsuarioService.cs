using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cultura.Application.Dtos.Input;

namespace Cultura.Application.Interfaces.Service
{
    public interface IUsuarioService
    {
        Task CreateUsuario(UsuarioCreateDto usuarioCreateDto);
    }
}
