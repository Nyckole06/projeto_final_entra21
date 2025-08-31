document.addEventListener('DOMContentLoaded', function () {

    const menuUser = document.getElementById("menuUser");
    const dropdown = document.getElementById("userDropdown");
    const arrowDown = document.getElementById("arrowDown");
    const arrowUp = document.getElementById("arrowUp");

    if (menuUser && dropdown) {
        menuUser.addEventListener("click", () => {
            const aberto = dropdown.classList.contains("show");
            if (aberto) {
                fecharMenu();
                menuUser.style.borderRadius = "50px";
            } else {
                abrirMenu();
                menuUser.style.borderRadius = "50px 50px 0 50px";
            }
        });

        document.addEventListener("click", (e) => {
            if (!menuUser.contains(e.target) && !dropdown.contains(e.target)) {
                fecharMenu();
                menuUser.style.borderRadius = "50px";
            }
        });

        if (arrowUp) {
            arrowUp.addEventListener("click", (e) => {
                e.stopPropagation();
                fecharMenu();
                menuUser.style.borderRadius = "50px";
            });
        }
    }

    function abrirMenu() {
        if (dropdown) {
            dropdown.classList.add("show");
            if (arrowDown) arrowDown.style.display = "none";
            if (arrowUp) arrowUp.style.display = "block";
        }
    }

    function fecharMenu() {
        if (dropdown) {
            dropdown.classList.remove("show");
            if (arrowDown) arrowDown.style.display = "block";
            if (arrowUp) arrowUp.style.display = "none";
        }
    }
    // Lógica para carregar eventos por categoria
function carregarEventosPorCategoria(categoria) {
    const listaEventos = document.querySelector(".listaEventos");
    const titulo = document.getElementById("tituloCategoria");

    if(titulo) {
        titulo.textContent = `Eventos de ${categoria}`;
    }

    if(listaEventos) {
        listaEventos.innerHTML = "";

        let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
        let eventosFiltrados = eventos.filter(
            e => e.categoria.toLowerCase() === categoria.toLowerCase()
        );

        if (eventosFiltrados.length === 0) {
            listaEventos.innerHTML = "<p class='semEvento'>Nenhum evento encontrado nessa categoria.</p>";
            return;
        }

        console.log(eventosFiltrados)
        // Cria a lista de eventos
        eventosFiltrados.forEach(evento => {
            listaEventos.innerHTML += `
                <div class="evento-item">
                    <div class="conteudo-principal-evento">
                        ${evento.logo ? `<img src="${evento.logo}" alt="Logo do evento" class="logo-evento">` : ""}
                        <div class="info-resumida">
                            <h3 style="text-align: center;">${evento.nome}</h3>
                            <p style="text-align: center;">${evento.descricao}</p>
                        </div>
                    </div>
                    <div class="conteudo-detalhado-evento">
                        <p><strong>Categoria:</strong> ${evento.categoria}</p>
                        <p><strong>Data e hora:</strong> ${evento.dataHora}</p>
                        <p><strong>Local:</strong> ${evento.local.rua}, ${evento.local.numero} - ${evento.local.bairro}, ${evento.local.cidade}/${evento.local.estado}</p>
                        <p><strong>Preço do ingresso:</strong> R$ ${evento.precoIngresso}</p>
                        <p><strong>Organizado por:</strong> ${evento.nomeProdutor}</p>
                        <button class="compraIngressoBtn" data-id="${evento.id}">Comprar ingresso</button>
                    </div>
                </div>
            `;
        });
    }
}

// Listener global para todos os botões "Comprar ingresso"
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("compraIngressoBtn")) {
        const id = Number(e.target.dataset.id);
        const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
        const ev = eventos.find(evento => evento.id === id);
        if(ev) {
            localStorage.setItem("eventoSelecionado", JSON.stringify(ev));
            window.location.href = "comprar.html";
        }
    }
});


    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("cat");

    if (categoria) {
        carregarEventosPorCategoria(categoria);
    } else {
        const listaEventos = document.querySelector(".listaEventos");
        if(listaEventos) {
            listaEventos.innerHTML = "<p>Nenhuma categoria selecionada.</p>";
        }
    }

});




