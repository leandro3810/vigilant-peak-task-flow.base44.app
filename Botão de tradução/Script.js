document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email: email, message: message }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Obrigado, ' + name + '! Sua mensagem foi enviada.');
        } else {
            alert('Desculpe, ocorreu um erro. Tente novamente.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById('translateButton').addEventListener('click', function() {
    document.querySelectorAll('h1, h2, p, label, button').forEach(element => {
        // Exemplo básico de tradução (substituir por API ou lógica mais avançada)
        element.textContent = element.textContent.replace('Bem-vindo ao Meu Site', 'Welcome to My Website');
        element.textContent = element.textContent.replace('Sobre Mim', 'About Me');
        element.textContent = element.textContent.replace('Carregando estatísticas...', 'Loading statistics...');
    });
});

// Estatísticas Dinâmicas
fetch('/api/stats')
  .then(response => response.json())
  .then(data => {
    document.getElementById('stats').textContent = `Visitas: ${data.visits}, Usuários: ${data.users}`;
  })
  .catch(() => {
    document.getElementById('stats').textContent = 'Erro ao carregar estatísticas.';
  });
