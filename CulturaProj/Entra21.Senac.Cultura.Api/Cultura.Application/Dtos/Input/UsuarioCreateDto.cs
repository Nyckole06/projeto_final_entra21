using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cultura.Application.Dtos.Input
{
    public class UsuarioCreateDto
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Telefone { get; set; }
        public DateTime DataNascimento { get; set; }

        public EnderecoCreateDto Endereco { get; set; }
    }
}
