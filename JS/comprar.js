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

});

