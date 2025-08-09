using Cultura.Domain.Entities;
using System.Text.Json.Serialization;

public class Categoria
{
    public int Id { get; set; }
    public string Nome { get; set; } 
    public string Descricao { get; set; } 

    [JsonIgnore]
    public virtual ICollection<Evento> Eventos { get; set; } 

    [JsonIgnore]
    public virtual ICollection<Favorito> Favoritos { get; set; } 
}