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

