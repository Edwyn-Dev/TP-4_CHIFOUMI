const resultText = document.getElementById('result');
const playerScoreSpan = document.getElementById('playerScore');
const computerScoreSpan = document.getElementById('computerScore');
const choices = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;

const images = {
    rock: 'assets/img/Rock-paper-scissors_\(rock\).png',
    paper: 'assets/img/Rock-paper-scissors_\(paper\).png',
    scissors: 'assets/img/Rock-paper-scissors_\(scissors\).png'
};

let remainingRound = [];

function computerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    if (playerScore === 3 || computerScore === 3) {
        const winner = playerScore === 3 ? '🏆 VOUS AVEZ GAGNEZ 🏆' : (playerScore === 3 && computerScore === 3 ? '🤝 VOUS AVEZ FAIT ÉGALITÉ ABSOLUE 🤝' : '⛔ VOUS AVEZ PERDU ⛔');
        const lisResult = remainingRound.map(round => `<li>${round}</li>`).join('');
        document.getElementById('container').innerHTML = `<h1>${winner}</h1><hr><ul>${lisResult}</ul><button id="reset">RESTART</button>`;
        const resetButton = document.getElementById('reset');
        resetButton.style.display = 'block'
        resetButton.addEventListener('click', function () {
            location.reload();
        });
    } else {
        let roundResult = '';
        if (playerSelection === computerSelection) {
            playerScore++;
            computerScore++;
            remainingRound.push(`<img src="${images[computerSelection]}" id="imgResult">Robot <strong>+1 </strong>(${computerScore}) | <img src="${images[playerSelection]}" id="imgResult">Vous <strong>+1 </strong>(${playerScore})`);
            roundResult = `🤝 Manche Égalitaire 🤝`;
        } else if ((playerSelection === 'rock' && computerSelection === 'scissors') ||
            (playerSelection === 'paper' && computerSelection === 'rock') ||
            (playerSelection === 'scissors' && computerSelection === 'paper')) {
            playerScore++;
            remainingRound.push(`<img src="${images[computerSelection]}" id="imgResult">Robot <strong>+0 </strong>(${computerScore}) | <img src="${images[playerSelection]}" id="imgResult">Vous <strong>+1 </strong>(${playerScore})`);
            roundResult = `✅ Manche Gagner ✅`;
        } else {
            computerScore++;
            remainingRound.push(`<img src="${images[computerSelection]}" id="imgResult">Robot <strong>+1 </strong>(${computerScore}) | <img src="${images[playerSelection]}" id="imgResult">Vous <strong>+0 </strong>(${playerScore})`);
            roundResult = `⛔ Manche Perdu ⛔`;
        }
        return `<span>
            Vous avez utilisé <strong>${playerSelection}</strong> et le Robot a utilisé <strong>${computerSelection}</strong>
            <ul>
                <h3>${roundResult}</h3>
                <li>${remainingRound[remainingRound.length - 1]}</li>
            </ul>
        </span>`;
    }
}

function handleButtonClick(selection) {
    const computer = computerChoice();
    const result = playRound(selection, computer);
    resultText.innerHTML = result;
}

const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

rockButton.addEventListener('click', () => handleButtonClick('rock'));
paperButton.addEventListener('click', () => handleButtonClick('paper'));
scissorsButton.addEventListener('click', () => handleButtonClick('scissors'));