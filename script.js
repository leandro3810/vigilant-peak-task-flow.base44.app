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

// Dicionário simples para tradução pt <-> en
const traducoes = {
  "pt": {
    "Meu Site Search Art": "Meu Site Search Art",
    "Sobre": "Sobre",
    "Projetos": "Projetos",
    "Contato": "Contato",
    "Sobre Mim": "Sobre Mim",
    "Uma breve descrição sobre quem você é e o que faz.": "Uma breve descrição sobre quem você é e o que faz.",
    "Aqui você pode mostrar seus trabalhos ou portfólio.": "Aqui você pode mostrar seus trabalhos ou portfólio.",
    "contato": "contato",
    "Email:": "Email:",
    "&copy; 2025 Leandro. Todos os direitos reservados.": "&copy; 2025 Leandro. Todos os direitos reservados.",
    "Traduzir": "Traduzir"
  },
  "en": {
    "Meu Site Search Art": "My Site Search Art",
    "Sobre": "About",
    "Projetos": "Projects",
    "Contato": "Contact",
    "Sobre Mim": "About Me",
    "Uma breve descrição sobre quem você é e o que faz.": "A brief description about who you are and what you do.",
    "Aqui você pode mostrar seus trabalhos ou portfólio.": "Here you can showcase your work or portfolio.",
    "contato": "contact",
    "Email:": "Email:",
    "&copy; 2025 Leandro. Todos os direitos reservados.": "&copy; 2025 Leandro. All rights reserved.",
    "Traduzir": "Translate"
  }
};

let idiomaAtual = "pt";

document.getElementById('btnTradutor').addEventListener('click', function() {
  idiomaAtual = idiomaAtual === "pt" ? "en" : "pt";
  traduzirPagina(idiomaAtual);
  this.innerHTML = `<i class="fa-solid fa-globe"></i> ${traducoes[idiomaAtual]["Traduzir"]}`;
});

function traduzirPagina(idioma) {
  // Cabeçalho
  document.querySelector('h1').textContent = traducoes[idioma]["Meu Site Search Art"];
  // Navegação
  const navLinks = document.querySelectorAll('nav a');
  navLinks[0].textContent = traducoes[idioma]["Sobre"];
  navLinks[1].textContent = traducoes[idioma]["Projetos"];
  navLinks[2].textContent = traducoes[idioma]["Contato"];
  // Seções
  document.querySelector('#sobre h2').textContent = traducoes[idioma]["Sobre Mim"];
  document.querySelector('#sobre p').textContent = traducoes[idioma]["Uma breve descrição sobre quem você é e o que faz."];
  document.querySelector('#projetos h2').textContent = "leandro3810";
  document.querySelector('#projetos p').textContent = traducoes[idioma]["Aqui você pode mostrar seus trabalhos ou portfólio."];
  document.querySelector('#contato h2').textContent = traducoes[idioma]["contato"];
  document.querySelector('#contato p').textContent = traducoes[idioma]["Email:"];
  // Rodapé
  document.querySelector('footer p').textContent = traducoes[idioma]["© 2025 Leandro. Todos os direitos reservados."];
}
