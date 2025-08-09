using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Cultura.Domain.Entities
{
    public enum TipoUsuario
    {
        NaoOrganizador = 0,
        Organizador = 1
    }
    public class Usuario
    {

        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Telefone { get; set; }
        public DateTime DataNascimento { get; set; }
        public DateTime DataRegistro { get; set; } = DateTime.Now;
        public TipoUsuario Tipo { get; set; } = TipoUsuario.NaoOrganizador;
        public int EnderecoId { get; set; }

        [JsonIgnore]
        public Endereco Endereco { get; set; }
        [JsonIgnore]
        public ICollection<Evento> EventosOrganizados { get; set; }
        [JsonIgnore]
        public ICollection<CompraIngresso> Compras { get; set; }
        [JsonIgnore]
        public ICollection<Favorito> Favoritos { get; set; }
    }
}
