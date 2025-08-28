function Mostrar()
{
    const password = document.getElementById('senha')
    const btn_show_pass = document.getElementById('btn-password')

    if (password.type === 'password')
    {
        password.setAttribute('type', 'text');
        btn_show_pass.classList.replace('bi-eye-fill', 'bi-eye-slash');
    }
    else
    {
        password.setAttribute('type', 'password');
        btn_show_pass.classList.replace('bi-eye-slash', 'bi-eye-fill');
    }
}

/*-----------------------------------------------------------------------------------*/

document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioValido = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuarioValido) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));
    alert("Login realizado com sucesso!");
    window.location.href = "index.html";
  } else {
    alert("E-mail ou senha inválidos!");
  }
});

