using Cultura.Domain.Entities;
using System.Text.Json.Serialization;

namespace Cultura.Domain.Entities
{
    public class Evento
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public DateTime Data { get; set; }
        public DateTime DataRegistro { get; set; }

        public int CategoriaId { get; set; }
        public int UsuarioId { get; set; }
        public int EnderecoId { get; set; }

        [JsonIgnore]
        public virtual Categoria Categoria { get; set; }

        [JsonIgnore]
        public virtual Usuario Usuario { get; set; }

        [JsonIgnore]
        public virtual Endereco Endereco { get; set; }

        [JsonIgnore]
        public virtual ICollection<Ingresso> Ingressos { get; set; }
    }
}