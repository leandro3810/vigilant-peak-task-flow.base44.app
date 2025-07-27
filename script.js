// script.js - Configuração para Search Art
// Autor: Leandro R Gomes
// Objetivo: Melhorar acessibilidade, segurança e experiência do usuário

// --- Tradutor Simples (Português/Inglês) ---
const tradutorBtn = document.getElementById('btnTradutor');
let traduzido = false;

// Textos alternativos para tradução
const traducoes = {
  'pt': {
    sobre: 'Sobre Mim',
    descSobre: 'Uma breve descrição sobre quem você é e o que faz.',
    projetos: 'Leandro3810',
    descProjetos: 'Aqui você pode mostrar seus trabalhos ou portfólio.',
    contato: 'Contato',
    atalhos: 'Atalhos de Navegação',
    atalhosDesc: 'Esses atalhos ajudam a navegar pelo site de forma rápida e acessível. Mais informações nos tooltips de cada link.',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    direitos: 'Todos os direitos reservados.',
    tradutor: 'Traduzir'
  },
  'en': {
    sobre: 'About Me',
    descSobre: 'A brief description about who you are and what you do.',
    projetos: 'Leandro3810',
    descProjetos: 'Here you can showcase your work or portfolio.',
    contato: 'Contact',
    atalhos: 'Navigation Shortcuts',
    atalhosDesc: 'These shortcuts help you navigate the site quickly and accessibly. More info in each link\'s tooltip.',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    direitos: 'All rights reserved.',
    tradutor: 'Translate'
  }
};

// Função para alternar idioma
function alternarIdioma() {
  traduzido = !traduzido;
  const lang = traduzido ? 'en' : 'pt';
  document.documentElement.lang = lang;

  document.querySelector('#sobre h2').textContent = traducoes[lang].sobre;
  document.querySelector('#sobre p').textContent = traducoes[lang].descSobre;
  document.querySelector('#projetos h2').textContent = traducoes[lang].projetos;
  document.querySelector('#projetos p').textContent = traducoes[lang].descProjetos;
  document.querySelector('#contato h2').textContent = traducoes[lang].contato;
  document.querySelector('#atalhos h2').textContent = traducoes[lang].atalhos;
  document.querySelector('#atalhos p').textContent = traducoes[lang].atalhosDesc;

  // Contato labels
  document.querySelector('#contato a[href^="mailto"]').previousSibling.textContent = `${traducoes[lang].email}: `;
  document.querySelector('#contato a[href^="https://linkedin"]').previousSibling.textContent = `${traducoes[lang].linkedin}: `;
  document.querySelector('#contato a[href^="https://github"]').previousSibling.textContent = `${traducoes[lang].github}: `;

  // Footer
  document.querySelector('footer p').innerHTML = `&copy; 2025 Leandro. ${traducoes[lang].direitos}`;
  tradutorBtn.innerHTML = `<i class="fa-solid fa-globe"></i> ${traducoes[lang].tradutor}`;
}

// Evento de clique no botão Tradutor
tradutorBtn.addEventListener('click', alternarIdioma);

// --- Segurança: Evitar JS Injections Simples ---
window.addEventListener('DOMContentLoaded', () => {
  // Remove atributos potencialmente inseguros (exemplo básico, não cobre tudo)
  document.querySelectorAll('[onerror],[onclick],[onload]').forEach(el => {
    el.removeAttribute('onerror');
    el.removeAttribute('onclick');
    el.removeAttribute('onload');
  });
});

// --- Acessibilidade: Foco visual ao navegar por atalhos ---
document.addEventListener('keydown', function(e) {
  const atalhos = {
    '1': '#sobre',
    '2': '#projetos',
    '3': '#contato',
    '4': '#atalhos'
  };
  if (e.altKey && atalhos[e.key]) {
    const alvo = document.querySelector(atalhos[e.key]);
    if (alvo) {
      alvo.scrollIntoView({ behavior: 'smooth' });
      alvo.setAttribute('tabindex', '-1');
      alvo.focus();
      // Remove tabindex="-1" after the element loses focus
      const removeTabindex = () => {
        alvo.removeAttribute('tabindex');
        alvo.removeEventListener('blur', removeTabindex);
      };
      alvo.addEventListener('blur', removeTabindex);
    }
  }
});

// --- Melhoria: Foco visual para navegação por teclado ---
['sobre', 'projetos', 'contato', 'atalhos'].forEach(id => {
  const section = document.getElementById(id);
  section && section.addEventListener('focus', function() {
    section.style.outline = '2px solid #0078d7';
  });
  section && section.addEventListener('blur', function() {
    section.style.outline = 'none';
  });
});

// --- Segurança: Evitar links perigosos ---
document.querySelectorAll('a[rel~="noopener"]').forEach(link => {
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
});

// --- SEO: Atualizar título dinamicamente (exemplo) ---
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function() {
    document.title = `Search Art - ${link.textContent}`;
  });
});

// --- Fim do script ---
