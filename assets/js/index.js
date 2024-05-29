// Get the elements for displaying the result and scores
const resultText = document.getElementById('result');
const playerScoreSpan = document.getElementById('playerScore');
const computerScoreSpan = document.getElementById('computerScore');

// Define the possible choices for the game
const choices = ['rock', 'paper', 'scissors'];

// Initialize the scores for player and computer
let playerScore = 0;
let computerScore = 0;

// Define the images corresponding to each choice
const images = {
    rock: 'assets/img/Rock-paper-scissors_\(rock\).png',
    paper: 'assets/img/Rock-paper-scissors_\(paper\).png',
    scissors: 'assets/img/Rock-paper-scissors_\(scissors\).png'
};

// Array to keep track of the results of each round
let remainingRound = [];

// Function to generate a random choice for the computer
function computerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to play a single round of the game
function playRound(playerSelection, computerSelection) {
    // Check if either player or computer has reached the score of 3
    if (playerScore === 3 || computerScore === 3) {
        const winner = playerScore === 3 ? '🏆 VOUS AVEZ GAGNEZ 🏆' : (playerScore === 3 && computerScore === 3 ? '🤝 VOUS AVEZ FAIT ÉGALITÉ ABSOLUE 🤝' : '⛔ VOUS AVEZ PERDU ⛔');
        // Generate the list of results for each round
        const lisResult = remainingRound.map(round => `<li>${round}</li>`).join('');
        // Display the final result and restart button
        document.getElementById('container').innerHTML = `<h1>${winner}</h1><hr><ul>${lisResult}</ul><button id="reset">RESTART</button>`;
        // Add event listener to restart button to reload the page
        const resetButton = document.getElementById('reset');
        resetButton.style.display = 'block';
        resetButton.addEventListener('click', function () {
            location.reload();
        });
    } else {
        let roundResult = '';
        // Determine the result of the round
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
        // Return the result of the current round
        return `<span>
            Vous avez utilisé <strong>${playerSelection}</strong> et le Robot a utilisé <strong>${computerSelection}</strong>
            <ul>
                <h3>${roundResult}</h3>
                <li>${remainingRound[remainingRound.length - 1]}</li>
            </ul>
        </span>`;
    }
}

// Function to handle the click event for each choice button
function handleButtonClick(selection) {
    const computer = computerChoice();
    const result = playRound(selection, computer);
    resultText.innerHTML = result;
}

// Get the buttons for rock, paper, and scissors choices
const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

// Add event listeners to each button to handle clicks
rockButton.addEventListener('click', () => handleButtonClick('rock'));
paperButton.addEventListener('click', () => handleButtonClick('paper'));
scissorsButton.addEventListener('click', () => handleButtonClick('scissors'));
