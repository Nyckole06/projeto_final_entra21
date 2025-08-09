﻿using Cultura.Domain.Entities;
using System.Text.Json.Serialization;

public class CompraIngresso
{
    public int Id { get; set; }
    public int Quantidade { get; set; }
    public DateTime DataCompra { get; set; }
    public int UsuarioId { get; set; }
    public int IngressoId { get; set; }

    [JsonIgnore]
    public virtual Usuario Usuario { get; set; } 

    [JsonIgnore]
    public virtual Ingresso Ingresso { get; set; } 
}