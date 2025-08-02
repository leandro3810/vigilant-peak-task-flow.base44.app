// Exemplo simples de busca local
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');
  if (query) {
    document.getElementById('search-results').innerText = `Resultados para "${query}": (implemente aqui a busca real)`;
    // Aqui você pode conectar o Lunr.js ou Algolia
  }
});
