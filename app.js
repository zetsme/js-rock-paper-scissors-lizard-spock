const player = document.getElementById('player');
const playerChoice = document.getElementById('player-choice');
const playerScore = document.getElementById('player-score');
const computer = document.getElementById('computer');
const computerChoice = document.getElementById('computer-choice');
const computerScore = document.getElementById('computer-score');
const resetBtn = document.getElementById('reset-btn');
const resultText = document.getElementById('result-text');
const allGameIcons = document.querySelectorAll('.far');

const winChoices = [
  { name: 'rock', defeats: ['scissors', 'lizard'] },
  { name: 'paper', defeats: ['rock', 'spock'] },
  { name: 'scissors', defeats: ['paper', 'liard'] },
  { name: 'lizard', defeats: ['paper', 'spock'] },
  { name: 'spock', defeats: ['scissors', 'rock'] },
];

let computerScoreNumber = 0;
let playerScoreNumber = 0;

const resetSelected = () => {
  allGameIcons.forEach((icon) => icon.classList.remove('selected'));
};

const computerRandomChoice = () => winChoices[Math.floor(Math.random() * winChoices.length)].name;

const playerSelect = (e) => {
  const choice = e.target.className.split(' ')[0].substr(8);
  checkResult(choice);
};

const checkResult = (playerChoice) => {
  resetSelected();
  const randomChoice = computerRandomChoice();
  displayPlayerChoice(playerChoice);
  displayComputerChoice(randomChoice);
  updateResults(playerChoice, randomChoice);
};

const displayComputerChoice = (choice) => displayChoice(choice, computer, computerChoice);
const displayPlayerChoice = (choice) => displayChoice(choice, player, playerChoice);

const displayChoice = (choice, parentElement, choiceTextElement) => {
  const icon = parentElement.querySelector(`.fa-hand-${choice}`);
  icon.classList.add('selected');
  choiceTextElement.textContent = `${choice[0].toUpperCase()}${choice.substr(1)}`;
};

const updateResults = (playerResult, computerResult) => {
  if (playerResult === computerResult) {
    resultText.textContent = "it's a Tie.";
  } else {
    const choice = winChoices.find((i) => i.name === playerResult);
    if (choice.defeats.includes(computerResult)) {
      resultText.textContent = 'You Won';
      playerScoreNumber++;
      playerScore.textContent = playerScoreNumber;
    } else {
      resultText.textContent = 'You Lost';
      computerScoreNumber++;
      computerScore.textContent = computerScoreNumber;
    }
  }
};
player.querySelectorAll('.far').forEach((icon) => {
  icon.addEventListener('click', playerSelect);
});

const resetAll = () => {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScore.textContent = playerScoreNumber;
  computerScore.textContent = computerScoreNumber;
  playerChoice.textContent = '';
  computerChoice.textContent = '';
  resultText.textContent = '';
  resetSelected();
};

resetAll();

resetBtn.addEventListener('click', resetAll);
