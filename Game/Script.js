const gameArea = document.getElementById('game-area');
const scoreElement = document.getElementById('score');
let score = 0;

// Função para criar um alvo
function createTarget() {
    const target = document.createElement('div');
    target.classList.add('target');

    // Posição aleatória
    const x = Math.random() * (gameArea.offsetWidth - 50);
    const y = Math.random() * (gameArea.offsetHeight - 50);

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    // Adiciona o alvo ao game area
    gameArea.appendChild(target);

    // Remove o alvo após 1 segundo
    setTimeout(() => {
        if (gameArea.contains(target)) {
            gameArea.removeChild(target);
        }
    }, 1000);

    // Incrementa a pontuação ao clicar no alvo
    target.addEventListener('click', () => {
        score++;
        scoreElement.textContent = score;
        gameArea.removeChild(target);
    });
}

// Cria alvos em intervalos regulares
setInterval(createTarget, 1000);
