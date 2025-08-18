const criarEvento = document.getElementById("btn-criar-evento");
const divEvento = document.getElementById("divEvento");

const barraLateral = document.querySelector(".barra-lateral");
const btnVoltar = document.getElementById("btn-voltar");
const btnExpandir = document.getElementById("btn-expandir")
const fraseBtn = document.querySelectorAll(".frase-btn");
const container = document.getElementsByClassName("container");


criarEvento.addEventListener("click", () =>
{
    divEvento.style.display = "block",
    divEvento.classList.add('active');
});

btnVoltar.addEventListener("click", () =>
{
        barraLateral.classList.add('min');
        fraseBtn.forEach(el =>
        {
            el.style.display="none";            
        });
        btnVoltar.style.display = "none";
        btnExpandir.style.display = "block";
        container.style.gridTemplateColumns = "1fr 2fr";

});

btnExpandir.addEventListener("click", () =>
{
        barraLateral.classList.remove('min');
        fraseBtn.forEach(el =>
        {
            el.style.display="block";
        });
        btnVoltar.style.display = "block";
        btnExpandir.style.display = "none";
});