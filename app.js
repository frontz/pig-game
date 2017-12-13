/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, dice, dice2;

//var final = prompt('Podaj liczbę punktów potrzebnych do wygrania: ');

var isSix = [];
var count = 0;




init();

gamePlaying = true;

console.log('activePlayer: ' + activePlayer + ' wykona rzut...');

document.querySelector('.btn-roll').addEventListener('click', function btn() {
    if (gamePlaying) {
        //random number

        dice = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;

        //display the result for dice
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //display the result for dice2
        var dice2DOM = document.querySelector('.dice2');
        dice2DOM.style.display = 'block';
        dice2DOM.src = 'dice-' + dice2 + '.png';

        
        //update score if round score is NOT a 1
        if ((dice !== 1) && (dice2 !== 1)) {
              roundScore += (dice + dice2);
              //check if 6 is in dice and dice2
              checkSix();
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            console.log(dice);
            console.log(dice2);
            roundScore = 0;
            //next player
            nextPlayer();
        }

    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //add current score to global score

        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;

        if(input) {
            var winningScore = input;
        } else {
            winningScore = 100;
        }


        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }

    }



});


function nextPlayer() {
    isSix = [];
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    console.log('activePlayer: ' + activePlayer + ' wykona rzut...');
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');



}

/*
function checkSix() {

          console.log(dice);

    if (dice == 6) {
        isSix.push(true);
        console.log(isSix);
      } else {
        isSix = [];
      }

      if (isSix[0] == true && isSix[1] == true) {
        roundScore = 0;
        activePlayer == 0 ? scores[0] = 0 : scores[1] = 0;
        document.getElementById('current-' + activePlayer).textContent = '0';
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();


      }
}
*/

function checkSix() {
    console.log(dice);
    console.log(dice2);

    if (dice == 6 && dice2 == 6) {
        roundScore = 0;
        activePlayer == 0 ? scores[0] = 0 : scores[1] = 0;
        document.getElementById('current-' + activePlayer).textContent = '0';
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();
    }

}









//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
