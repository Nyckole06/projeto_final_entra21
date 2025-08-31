    const criarEvento = document.getElementById("btn-criar-evento");
    const formEvento = document.getElementById("formEvento");
    const container_eventos = document.getElementById("container_eventos");

    const barraLateral = document.querySelector(".barra-lateral");
    const btnVoltar = document.getElementById("btn-voltar");
    const btnExpandir = document.getElementById("btn-expandir");
    const fraseBtn = document.querySelectorAll(".frase-btn");

    const verEventos = document.getElementById("btn-ver-eventos");
    const container_eventos_criados = document.getElementById("container_eventos_criados");
    const boxEventos = document.getElementById("verEventos");

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



    // --- Botão para abrir form de criação ---
    criarEvento.addEventListener("click", () => {
        container_eventos.style.display = "block";
        formEvento.style.display = "block";
        formEvento.classList.add('active');

        // esconde a tela de eventos criados
        container_eventos_criados.style.display = "none";
        boxEventos.style.display = "none";
    });

    // --- Esconder barra lateral ---
    btnVoltar.addEventListener("click", () => {
        barraLateral.classList.add('min');
        fraseBtn.forEach(el => {
            el.style.display = "none";
        });
        btnVoltar.style.display = "none";
        btnExpandir.style.display = "block";
    });

    // --- Expandir barra lateral ---
    btnExpandir.addEventListener("click", () => {
        barraLateral.classList.remove('min');
        fraseBtn.forEach(el => {
            el.style.display = "block";
        });
        btnVoltar.style.display = "block";
        btnExpandir.style.display = "none";
    });

    document.getElementById("foto-logo").addEventListener("change", function (event) {
        const file = event.target.files[0];
        const preview = document.getElementById("preview-logo");
        const icon = document.getElementById("icon-foto");

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                preview.src = e.target.result;
                preview.style.display = "block",
                    preview.style.width = "300px",
                    preview.style.position = "relative",
                    preview.style.top = "-136px",
                    icon.style.display = "none";
            }
            reader.readAsDataURL(file);
        } else {
            preview.style.display = "none"; // esconde se não tiver imagem
        }
    });

    // --- Salvar evento ---
    function salvarEvento() {
        const nome = document.getElementById("nome-evento").value;
        const descricao = document.querySelector("textarea").value;
        const categoria = document.getElementById("opcoes-categorias").value;
        const cep = document.getElementById("cep").value;
        const cidade = document.getElementById("cidade").value;
        const estado = document.getElementById("estado").value;
        const bairro = document.getElementById("bairro").value;
        const rua = document.getElementById("rua").value;
        const numero = document.getElementById("numero").value;
        const logoInput = document.getElementById("foto-logo");
        const dataHora = document.getElementById("dataHora-evento").value;
        const precoIngresso = document.getElementById("preco-evento").value;
        const nomeProdutor = document.getElementById("nomeProdutor-evento").value;

        if (nome === "" || descricao === "" || categoria == "" || cep == "" || cidade == "" || estado == "" || bairro == "" || rua == "" || numero == "" || dataHora == "" || nomeProdutor == "") {
            alert("Preencha todos os campos antes de salvar o evento!");
            return;

        }

        if (logoInput.files && logoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                salvarComImagem(e.target.result);
            };
            reader.readAsDataURL(logoInput.files[0]);
        } else {
            salvarComImagem(null);
        }

        function salvarComImagem(logoBase64) {
            // Pegar eventos já salvos
            let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

            // Criar id incremental
            const id = eventos.length > 0 ? eventos[eventos.length - 1].id + 1 : 1;

            // Criar objeto evento com id
            const evento = {
                id, // <--- novo campo id
                nome,
                descricao,
                categoria,
                logo: logoBase64, // salva a logo em base64
                local: { cep, cidade, estado, bairro, rua, numero },
                dataHora,
                precoIngresso,
                nomeProdutor
            };

            // Adicionar evento à lista
            eventos.push(evento);

            // Salvar no localStorage
            localStorage.setItem("eventos", JSON.stringify(eventos));

            alert("Evento criado com sucesso!");

            // Limpar formulário
            document.getElementById("nome-evento").value = "";
            document.querySelector("textarea").value = "";
            document.getElementById("opcoes-categorias").value = "";
            document.getElementById("cep").value = "";
            document.getElementById("cidade").value = "";
            document.getElementById("estado").value = "";
            document.getElementById("bairro").value = "";
            document.getElementById("rua").value = "";
            document.getElementById("numero").value = "";
            document.getElementById("foto-logo").value = "";
            document.getElementById("preview-logo").src = "";
            document.getElementById("preview-logo").style.display = "none";
            document.getElementById("icon-foto").style.display = "block";
            document.getElementById("dataHora-evento").value = "";
            document.getElementById("preco-evento").value = "";
            document.getElementById("nomeProdutor-evento").value = "";
        }
    }

    // --- Carregar eventos ---
    function carregarEventos() {
        let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
        let lista = document.querySelector(".listaEventos");
        lista.innerHTML = "";

        eventos.forEach((evento, index) => {
            lista.innerHTML += `
                <div class="evento-item" style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                    ${evento.logo ? `<img src="${evento.logo}" alt="Logo do evento" width="150" height="150" style="object-fit:cover;border-radius:8px;">` : ""}
                    <div style="flex:1">
                        <h3 style = "text-align: center; font-size: 23px; text-transform: uppercase;   ">${evento.nome}</h3>
                        <p style = "text-align: center; margin: 0px 0px 50px 0px;">${evento.descricao}</p>
                        <p><strong>Categoria:</strong> ${evento.categoria}</p>
                        <p><strong>Data e hora:</strong> ${evento.dataHora}</p>
                        <p><strong>Local:</strong> ${evento.local.rua}, ${evento.local.numero} - ${evento.local.bairro}, ${evento.local.cidade}/${evento.local.estado} - CEP: ${evento.local.cep}</p>
                        <p><strong>Preço do ingresso:</strong> R$ ${evento.precoIngresso}</p>
                        <p><strong>Organizado por:</strong> ${evento.nomeProdutor}</p>
                    </div>
                    <button onclick="excluirEvento(${index})" style="background:#c62828;color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;">
                        Excluir
                    </button>
                </div>
            `;
        });
    }

    // --- Excluir evento ---
    function excluirEvento(index) {
        let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
        eventos.splice(index, 1); // remove 1 item na posição index
        localStorage.setItem("eventos", JSON.stringify(eventos));
        carregarEventos(); // recarregar lista
    }

    // --- Mostrar eventos criados ---
    verEventos.addEventListener("click", () => {
        container_eventos.style.display = "none"; // esconde criação
        formEvento.style.display = "none";
        container_eventos_criados.style.display = "block";
        boxEventos.style.display = "block";
        carregarEventos();
    });

    // --- Carregar na abertura ---
    window.onload = carregarEventos;

    const cepInput = document.getElementById("cep");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado");
    const bairro = document.getElementById("bairro");

    cepInput.addEventListener("blur", function () {

        const cep = cepInput.value.replace(/\D/g, '');

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {

                    cidade.value = data.localidade;
                    estado.value = data.uf;
                    bairro.value = data.bairro;

                    cidade.readOnly = true;
                    estado.readOnly = true;

                    cidade.style.backgroundColor = "rgba(85, 73, 73, 0.34)";
                    estado.style.backgroundColor = "rgba(85, 73, 73, 0.34)";

                    cidade.style.color = "rgba(216, 216, 216, 0.65)";
                    estado.style.color = "rgba(216, 216, 216, 0.65)";

                    cidade.style.cursor = "not-allowed";
                    estado.style.cursor = "not-allowed";

                }
                else {
                    alert("CEP não encontrado.");
                    cepInput.value = "";
                    return;
                }
            })
    });