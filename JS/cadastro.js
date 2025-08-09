const form = document.getElementById('formCadastro');
const mensagem = document.getElementById('mensagem');
const sucesso = document.getElementById('sucesso');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  mensagem.textContent = '';
  sucesso.textContent = '';

  // Pega os valores e limpa espaços
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const dataNascimento = document.getElementById('dataNascimento').value;
  const cep = document.getElementById('cep').value.trim();
  const rua = document.getElementById('rua').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const bairro = document.getElementById('bairro').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const estado = document.getElementById('estado').value.trim();

  // Validações básicas
  if (!nome) {
    mensagem.textContent = 'Nome é obrigatório.';
    return;
  }
  if (!email) {
    mensagem.textContent = 'Email é obrigatório.';
    return;
  }
  if (!senha) {
    mensagem.textContent = 'Senha é obrigatória.';
    return;
  }
  if (!dataNascimento) {
    mensagem.textContent = 'Data de nascimento é obrigatória.';
    return;
  }

  const usuarioDto = {
    nome: nome,
    email: email,
    senha: senha,
    telefone: telefone,
    dataNascimento: dataNascimento,
    endereco: {
      cep: cep,
      rua: rua,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      estado: estado
    }
  };

  console.log();

  try {
    const response = await fetch('https://localhost:44394/api/Usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioDto)
    });

    if (!response.ok) {
      const errorData = await response.json();
      mensagem.textContent = errorData.message || 'Erro ao cadastrar.';
      return;
    }

    sucesso.textContent = 'Cadastro realizado com sucesso!';
    form.reset();

  } catch (error) {
    mensagem.textContent = 'Erro ao enviar dados: ' + error.message;
  }
});

function Mostrar() {
  const password = document.getElementById('senha')
  const btn_show_pass = document.getElementById('btn-password')

  if (password.type === 'password') {
    password.setAttribute('type', 'text');
    btn_show_pass.classList.replace('bi-eye-fill', 'bi-eye-slash');
  }
  else {
    password.setAttribute('type', 'password');
    btn_show_pass.classList.replace('bi-eye-slash', 'bi-eye-fill');
  }
}

const cepInput = document.getElementById("cep");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
const bairro = document.getElementById("bairro");

cepInput.addEventListener("blur", function ()
{

  const cep = cepInput.value.replace(/\D/g, '');

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data =>
      {
      if (!data.erro)
      {

        cidade.value = data.localidade;
        estado.value = data.uf;
        bairro.value = data.bairro;

        cidade.readOnly = true;
        estado.readOnly = true;

        cidade.style.backgroundColor = "rgba(32, 27, 27, 0.18)";
        estado.style.backgroundColor = "rgba(32, 27, 27, 0.18)";

        cidade.style.color = "rgba(216, 216, 216, 0.65)";
        estado.style.color = "rgba(216, 216, 216, 0.65)";

        cidade.style.cursor = "not-allowed";
        estado.style.cursor = "not-allowed";

      }
      else
      {
        alert("CEP não encontrado.");
        cepInput.value = "";
        return;
      }
    })
});