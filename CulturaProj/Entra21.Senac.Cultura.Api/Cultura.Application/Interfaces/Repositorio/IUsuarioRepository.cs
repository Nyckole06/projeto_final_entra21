using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cultura.Domain.Entities;

namespace Cultura.Application.Interfaces.Repositorio
{
    public interface IUsuarioRepository
    {
        Task CreateUsuario(Usuario usuario); 
    }
}
