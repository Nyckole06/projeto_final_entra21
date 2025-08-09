using Cultura.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

public class TipoIngressoMap : IEntityTypeConfiguration<TipoIngresso>
{
    public void Configure(EntityTypeBuilder<TipoIngresso> builder)
    {
        builder.ToTable("TipoIngresso");

        builder.HasKey(t => t.Id);

        builder.Property(t => t.Nome).IsRequired().HasMaxLength(100);
        builder.Property(t => t.Descricao).HasMaxLength(300);
    }
}