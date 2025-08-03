// script.js - Configuração para Search Art
// Autor: Leandro R Gomes
// Objetivo: Melhorar acessibilidade, segurança e experiência do usuário
// Tradutor Simples: alterna idioma de português para inglês e volta
const tradutorBtn = document.getElementById('btnTradutor');
let traducaoAtiva = false;

const traducoes = {
  pt: {
    titulo: "Meu Site Search Art",
    sobre: "Sobre",
    projetos: "Projetos",
    contato: "Contato",
    atalhos: "Atalhos",
    salvar: "Salvar",
    produtos: "Produtos",
    enviar: "Enviar",
    footer1: "Todos os direitos reservados.",
    footer2: "Atalhos do site",
    footer3: "Política de Privacidade"
  },
  en: {
    titulo: "My Search Art Site",
    sobre: "About",
    projetos: "Projects",
    contato: "Contact",
    atalhos: "Shortcuts",
    salvar: "Save",
    produtos: "Products",
    enviar: "Send",
    footer1: "All rights reserved.",
    footer2: "Site shortcuts",
    footer3: "Privacy Policy"
  }
};

function traduzirSite(idioma) {
  document.querySelector('header h1').innerText = traducoes[idioma].titulo;
  document.querySelector('nav ul li:nth-child(1) a').innerText = traducoes[idioma].sobre;
  document.querySelector('nav ul li:nth-child(2) a').innerText = traducoes[idioma].projetos;
  document.querySelector('nav ul li:nth-child(3) a').innerText = traducoes[idioma].contato;
  document.querySelector('nav ul li:nth-child(4) a').innerText = traducoes[idioma].atalhos;
  document.querySelector('.header-controls button').innerText = traducoes[idioma].salvar;
  document.querySelector('.header-controls a').innerText = traducoes[idioma].produtos;
  document.querySelector('nav button[type="submit"]').innerText = traducoes[idioma].enviar;
  document.querySelector('footer p').innerHTML = `&copy; 2025 Leandro. ${traducoes[idioma].footer1}`;
  document.querySelectorAll('footer a')[0].innerText = traducoes[idioma].footer2;
  document.querySelectorAll('footer a')[1].innerText = traducoes[idioma].footer3;
}

tradutorBtn.addEventListener('click', function() {
  if(!traducaoAtiva) {
    traduzirSite('en');
    traducaoAtiva = true;
    tradutorBtn.innerHTML = '<i class="fa-solid fa-globe"></i> PT-BR';
  } else {
    traduzirSite('pt');
    traducaoAtiva = false;
    tradutorBtn.innerHTML = '<i class="fa-solid fa-globe"></i> Traduzir';
  }
});

// Acessibilidade dos atalhos (Alt+1, Alt+2, Alt+3, Alt+4)
// Já existe JS no HTML para Alt+T (tradutor)
document.addEventListener('keydown', function(e) {
  if(e.altKey) {
    if(e.key === '1') {
      e.preventDefault();
      document.querySelector('nav ul li:nth-child(1) a').focus();
    }
    if(e.key === '2') {
      e.preventDefault();
      document.querySelector('nav ul li:nth-child(2) a').focus();
    }
    if(e.key === '3') {
      e.preventDefault();
      document.querySelector('nav ul li:nth-child(3) a').focus();
    }
    if(e.key === '4') {
      e.preventDefault();
      document.querySelector('nav ul li:nth-child(4) a').focus();
    }
  }
});

// Segurança extra: desabilita colar no campo email do formulário
document.querySelector('nav input[type="email"]').addEventListener('paste', function(e) {
  e.preventDefault();
  alert('Por segurança, cole manualmente seu e-mail.');
});
ventListener("DOMContentLoaded", function() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
// --- Fim do script ---
