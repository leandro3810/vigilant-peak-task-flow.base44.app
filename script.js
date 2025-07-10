// Script para funcionalidades básicas do seu site

// Rolagem suave para navegação
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Botão para voltar ao topo
const btnTopo = document.createElement('button');
btnTopo.innerHTML = '<i class="fa fa-arrow-up"></i>';
btnTopo.setAttribute('id', 'btn-topo');
btnTopo.setAttribute('title', 'Voltar ao topo');
btnTopo.style.position = 'fixed';
btnTopo.style.bottom = '30px';
btnTopo.style.right = '30px';
btnTopo.style.display = 'none';
btnTopo.style.zIndex = '1000';
btnTopo.style.padding = '12px 16px';
btnTopo.style.borderRadius = '50%';
btnTopo.style.background = '#222';
btnTopo.style.color = '#fff';
btnTopo.style.border = 'none';
btnTopo.style.cursor = 'pointer';

document.body.appendChild(btnTopo);

window.addEventListener('scroll', () => {
  btnTopo.style.display = window.scrollY > 200 ? 'block' : 'none';
});

btnTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Exemplo de mensagem de boas-vindas
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    alert('Bem-vindo ao Meu Site, Leandro!');
  }, 800);
});

