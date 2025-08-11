using Cultura.Application.Dtos.Input;
using Cultura.Domain.Entities;
using FluentValidation;


namespace Cultura.Application.Validator;

public class UsuarioValidator : AbstractValidator<UsuarioCreateDto>
{
    public UsuarioValidator()
    {
        RuleFor(x => x.Nome)
    .Cascade(CascadeMode.Continue)
    .NotEmpty().WithMessage("O nome é obrigatório.")
    .MinimumLength(3).WithMessage("O nome precisa ter no mínimo 3 caracteres.");
    }
}
