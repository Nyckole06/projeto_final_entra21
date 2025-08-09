using Cultura.Domain.Entities;
using System.Text.Json.Serialization;

namespace Cultura.Domain.Entities
{
    public class Endereco
    {
        public int Id { get; set; }
        public string Cep { get; set; }
        public string Estado { get; set; }
        public string Cidade { get; set; }
        public string Bairro { get; set; }
        public string Rua { get; set; }
        public string Numero { get; set; }

        [JsonIgnore]
        public virtual ICollection<Usuario> Usuarios { get; set; }

        [JsonIgnore]
        public virtual ICollection<Evento> Eventos { get; set; }
    }
}