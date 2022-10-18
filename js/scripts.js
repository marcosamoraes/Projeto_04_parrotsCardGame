let qtdCards;

const allCards = [
  'bobrossparrot.gif',
  'explodyparrot.gif',
  'fiestaparrot.gif',
  'metalparrot.gif',
  'revertitparrot.gif',
  'tripletsparrot.gif',
  'unicornparrot.gif'
];

const cardsSelected = [];

function chooseQtdCards() {
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
  const cardsElement = document.getElementsByClassName('cards')[0];

  let cardsText = '';

  cardsSelected.sort(comparator);
  for (let i = 0; i < cardsSelected.length; i++) {
    cardsText += `
      <div class="card">
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

chooseQtdCards();