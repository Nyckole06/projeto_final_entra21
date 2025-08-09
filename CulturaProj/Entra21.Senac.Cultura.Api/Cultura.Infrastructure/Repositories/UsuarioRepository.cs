using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cultura.Application.Interfaces.Repositorio;
using Cultura.Data;
using Cultura.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Cultura.Infrastructure.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {

            private readonly ApplicationDbContext _context;

            public UsuarioRepository(ApplicationDbContext context)
            {
                _context = context;
            }


        public async Task CreateUsuario(Usuario usuario)
        {
            
            await _context.Set<Usuario>().AddAsync(usuario);
            await _context.SaveChangesAsync();
        }
    }
}
