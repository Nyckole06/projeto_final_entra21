document.addEventListener('DOMContentLoaded', function () {

    // Inicialização do carrossel de categorias (swiper 1)
    const swiperCategorias = new Swiper('.swiper:not(#swiper-eventos)', {
        direction: 'horizontal',
        loop: true,
        grabCursor: true,
        effect: 'coverflow',
        centeredSlides: true,
        slidesPerView: 'auto',
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        coverflowEffect: {
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // ==== LOGIN / MENU USER ====
    function getUsuarioLogado() {
        const raw = localStorage.getItem('usuarioLogado');
        if (!raw) return { logado: false };

        try {
            const obj = JSON.parse(raw);
            return {
                logado: !!(obj.logado || obj === true),
                nome: obj.nome || localStorage.getItem('nomeUsuario') || '',
                isProdutor: !!obj.isProdutor
            };
        } catch (e) {
            if (raw === 'true') {
                const nomeAntigo = localStorage.getItem('nomeUsuario') || '';
                const migrado = { logado: true, nome: nomeAntigo, isProdutor: false };
                localStorage.setItem('usuarioLogado', JSON.stringify(migrado));
                return migrado;
            }
            return { logado: false };
        }
    }

    function aplicaUIUsuario() {
        const user = getUsuarioLogado();

        const menuUser_login = document.getElementById("menuUser");
        const botaoLogin = document.getElementById("login-troca");
        const nomeUsuarioSpan = document.getElementById("nome-usuario");
        const btnEventos = document.getElementById("botaoEventos");
        const btnProdutor = document.getElementById("tornarProd");

        if (user.logado) {
            if (menuUser_login) menuUser_login.style.display = "flex";
            if (botaoLogin) botaoLogin.style.display = "none";

            if (nomeUsuarioSpan) {
                const primeiroNome = (user.nome || '').split(' ')[0];
                nomeUsuarioSpan.textContent = `Olá, ${primeiroNome}`;
            }

            if (btnEventos) btnEventos.style.display = user.isProdutor ? "block" : "none";
            if (btnProdutor) btnProdutor.style.display = user.isProdutor ? "none" : "block";

        } else {
            if (menuUser_login) menuUser_login.style.display = "none";
            if (botaoLogin) botaoLogin.style.display = "block";
            if (nomeUsuarioSpan) nomeUsuarioSpan.textContent = "";
            if (btnEventos) btnEventos.style.display = "none";
            if (btnProdutor) btnProdutor.style.display = "none";
        }
    }

    aplicaUIUsuario();

    // Lógica para logout
    const logout = document.getElementById("sair");
    if (logout) {
        logout.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogado");
            localStorage.removeItem("nomeUsuario");
            aplicaUIUsuario();
            window.location.href = "index.html";
        });
    }

    // ==== DROPDOWN USER ====
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

    // ==== MODAL PRODUTOR ====
    const btnProdutor = document.querySelector("#tornarProd");
    const btnEventos = document.querySelector("#botaoEventos");
    const modal = document.getElementById("modal");
    const btnConfirmar = document.getElementById("confirmarProdutor");
    const btnCancelar = document.getElementById("cancelarProdutor");

    if (btnProdutor && modal) {
        btnProdutor.addEventListener("click", (e) => {
            e.preventDefault();
            modal.style.display = "flex";
        });
    }

if (btnConfirmar && btnProdutor && btnEventos && modal) {
    btnConfirmar.addEventListener("click", () => {
        // pega o usuário logado
        let user = JSON.parse(localStorage.getItem("usuarioLogado")) || {};

        // marca como produtor
        user.isProdutor = true;
        localStorage.setItem("usuarioLogado", JSON.stringify(user));

        // --- Atualiza também a lista de usuarios ---
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const idx = usuarios.findIndex(u => u.email === user.email);
        if (idx !== -1) {
            usuarios[idx].isProdutor = true;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }

        aplicaUIUsuario();
        modal.style.display = "none";
    });
}

    // ==== NOVO CARROSSEL DE EVENTOS ====
    function carregarEventosECarrossel() {
        const eventosWrapper = document.getElementById('eventos-wrapper');
        const eventos = JSON.parse(localStorage.getItem('eventos')) || [];

        if (!eventosWrapper) {
            console.error("Elemento com ID 'eventos-wrapper' não encontrado.");
            return;
        }

        eventosWrapper.innerHTML = '';

        if (eventos.length > 0) {
            eventos.forEach((evento, index) => {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');
                slide.classList.add('evento-slide');

                slide.innerHTML = `
            <div class="img-evento">
                <img src="${evento.logo}" alt="${evento.nome}">
            </div>
            <div class="info-evento">
                <h2>${evento.nome}</h2>
            </div>
        `;
                eventosWrapper.appendChild(slide);
            });

            const swiperEventos = new Swiper('#swiper-eventos', {
                direction: 'horizontal',
                loop: true,
                grabCursor: true,
                effect: 'coverflow',
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflowEffect: {
                    rotate: 30,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                },
                pagination: {
                    el: '.eventos-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.eventos-next',
                    prevEl: '.eventos-prev',
                }
            });

        } else {
            eventosWrapper.innerHTML = `<p style="text-align: center; width: 100%;">Nenhum evento disponível no momento.</p>`;
        }
    }

    carregarEventosECarrossel();

});
