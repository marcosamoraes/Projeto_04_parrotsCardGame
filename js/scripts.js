let qtdCards;
let qtdClicks;
let seconds = 0;

const allCards = [
  'bobrossparrot.gif',
  'explodyparrot.gif',
  'fiestaparrot.gif',
  'metalparrot.gif',
  'revertitparrot.gif',
  'tripletsparrot.gif',
  'unicornparrot.gif'
];

let cardsSelected = [];

function chooseQtdCards() {
  qtdClicks = 0;
  cardsSelected = [];
  
  qtdCards = prompt('Com quantas cartas você quer jogar?');

  if (qtdCards < 4 || qtdCards > 14 || qtdCards % 2 !== 0)
    return chooseQtdCards();

  for (let i = 0; i < (qtdCards / 2); i++) {
    cardsSelected.push(allCards[i]);
    cardsSelected.push(allCards[i]);
  }

  startGame();
}

function comparator() { 
	return Math.random() - 0.5; 
}

function startGame() {
  seconds = 0;
  
  const cardsElement = document.getElementsByClassName('cards')[0];

  let cardsText = '';

  cardsSelected.sort(comparator);
  for (let i = 0; i < cardsSelected.length; i++) {
    cardsText += `
      <div class="card card-${cardsSelected[i]}" onclick="turnCard(this, '${cardsSelected[i]}')">
        <div class="face back-face">
          <img src="./images/back.png">
        </div>
        <div class="face front-face">
          <img src="./images/${cardsSelected[i]}">
        </div>
      </div>`;
  }

  cardsElement.innerHTML = cardsText;
}

function turnCard(el, id) {
  qtdClicks++;

  const cardsClicked = document.getElementsByClassName('clicked');
  qtdCardClicked = cardsClicked.length;
  firstCardClicked = cardsClicked[0];

  if (qtdCardClicked == 2)
    return false;

  el.classList.add('clicked');
  
  // verify if exist card turned
  if (qtdCardClicked == 1) {
    // verify if card is equal other card
    if (firstCardClicked.classList.contains(`card-${id}`)) {
      cardsClicked[1].classList.add('matched');
      cardsClicked[0].classList.add('matched');
      cardsClicked[1].classList.remove('clicked');
      cardsClicked[0].classList.remove('clicked');
      // verify if is the last card matched
      cardsMatched = document.getElementsByClassName('matched');
      // if all cards are matched, user win the game  
      if (cardsMatched.length == qtdCards) {
        setTimeout(() => {
          alert(`Você ganhou em ${qtdClicks} jogadas!\nA partida demorou ${seconds} segundos`);
          OtherGame();
        }, 1000);
      }
      // else turn card
    } else {
      setTimeout(() => {
        cardsClicked[1].classList.remove('clicked');
        cardsClicked[0].classList.remove('clicked');
      }, 1000);
    }
  }
}

function OtherGame() {
  const playAgain = prompt('Você quer jogar novamente?');
  if (playAgain == 'sim') {
    chooseQtdCards();
  } else if(playAgain == 'não') {
    return false;
  } else {
    return OtherGame();
  }
}

chooseQtdCards();

setInterval(() => {
  seconds++;
  document.getElementById('seconds').innerHTML = seconds;
}, 1000);