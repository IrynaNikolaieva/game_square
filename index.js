const start = document.getElementById('start');
const game = document.getElementById('game');


let timeHeader = document.getElementById('time-header');
let resultHeader = document.getElementById('result-header');
let gameTime = document.getElementById('game-time');
let  isGameStarted = false;
let score = 0;
let timer = document.getElementById('time');
let result = document.getElementById('result');
let minSquare, maxSquare;

function isCheck(name) {
    return document.querySelector('input[name="' + name + '"]:checked');
}



start.addEventListener('click', startGame);
game.addEventListener('click', handleBoxClick);
gameTime.addEventListener('input', setGameTime);




function setGameTime() {
    let time = +gameTime.value;
    timer.textContent = time.toFixed(1);
    timeHeader.classList.remove('hide');
    resultHeader.classList.add('hide');

}


function startGame() {

    let rediobutton = (isCheck('level').id);

    if (rediobutton == 'easy') {
        minSquare = 70;
        maxSquare = 150;

    }

    else if (rediobutton == 'normal') {
        minSquare = 40;
        maxSquare = 60;

    }

    else {
        minSquare=10;
        maxSquare=30;

    }


    setGameTime();
    gameTime.setAttribute('disabled', 'true');
    score = 0;

    isGameStarted = true;
    start.classList.add('hide');
    game.style.backgroundColor = '#FFFF';

    let interval = setInterval(function () {
        let time = parseFloat(timer.textContent);

        if (time <= 0) {
            clearInterval(interval);
            endGame()
        }
        else {
            timer.textContent = (time - 0.1).toFixed(1);
        }

    }, 100)

    renderBox();
}



function setGameScorre() {
    result.textContent = score.toString();
}


function endGame() {
    isGameStarted = false;
    setGameScorre();
    start.classList.remove('hide');
    game.innerHTML = '';
    game.style.backgroundColor = '#ccc';
    timeHeader.classList.add('hide');
    resultHeader.classList.remove('hide');
    gameTime.removeAttribute('disabled');
}


function handleBoxClick(event) {
    if (!isGameStarted){
        return
    }

     if (event.target.dataset.box){
         score++;
         renderBox();
     }

 }


function renderBox() {


    game.innerHTML = '';
    let box = document.createElement('div');
    let boxSize = getRandom(minSquare, maxSquare);
    const gameSize = game.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;


    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = '#' + getRandom(500, 999);

    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) +  'px';




    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');


    game.insertAdjacentElement('afterbegin', box );


}


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);

}