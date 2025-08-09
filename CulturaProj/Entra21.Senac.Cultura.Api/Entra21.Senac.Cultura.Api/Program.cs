using Cultura.Application.Interfaces.Repositorio;
using Cultura.Application.Interfaces.Service;
using Cultura.Application.Services;
using Cultura.Data;
using Cultura.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Adiciona os serviços ao container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração do DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions.MigrationsAssembly("Cultura.Infrastructure")
    ));

// Registro dos serviços
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontendLocal", policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5500")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configuração do pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Ativa o CORS antes dos middlewares que usam requisição
app.UseCors("PermitirFrontendLocal");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
