function carregarEventosPorCategoria(categoria) {
  const listaEventos = document.querySelector(".listaEventos");
  listaEventos.innerHTML = "";

  // Pega eventos do localStorage
  let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

  // Filtra pela categoria
  let eventosFiltrados = eventos.filter(e => e.categoria === categoria);

  if (eventosFiltrados.length === 0) {
    listaEventos.innerHTML = "<p>Nenhum evento encontrado nessa categoria.</p>";
    return;
  }

  // Renderiza os eventos filtrados
  eventosFiltrados.forEach(evento => {
    listaEventos.innerHTML += `
      <div class="evento-item">
        <img src="${evento.imagem}" alt="${evento.nome}">
        <h3>${evento.nome}</h3>
        <p>${evento.descricao}</p>
        <p><strong>Local:</strong> ${evento.local}</p>
      </div>
    `;
  });
}
