const criarEvento = document.getElementById("criar-evento");
const divEvento = document.getElementById("meus-eventos")

criarEvento.addEventListener("click", function()
{
    if (divEvento.style.display === "none")
    {
        divEvento.style.display = "block"
    }
    else
    {
        divEvento.style.display = "none";
    }
});