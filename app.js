let picArr = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', "fa fa-bomb", 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', "fa fa-bomb", 'fa-leaf', 'fa-bicycle'];
const cardList = document.getElementsByClassName('card');
let pictureList=document.getElementsByTagName('i');
const r = document.querySelector('.fa-repeat');
let m = document.querySelector('.moves');
let deck = document.querySelector('.deck');
let picList = document.querySelectorAll('i');
let starList = document.getElementsByClassName('empty');
let numMoves = 0;
let newArr = [];

gameFunc();

/*1st function apply classesFunc for each element of cardlist  */
function gameFunc() {
    newGame();
    for (let card of cardList) {
        card.addEventListener('click', classesFunc)
    }
}

/*2nd function shuffle all the cards */
function newGame() {
    let newCards = shuffle(picArr).map(function (name) {
        return '<li class=\'card\'>' +
            '<i class=\'fa ' + name + '\'></i>' +
            '</li>';
    });
    deck.innerHTML = newCards.join('');
}
/*3rd function  adds classes 'open' and'show' to open cards. if two open cards have the same class then adds class 'match'*/
function classesFunc(event) {
    // object user clicked on (li or i):
    let openEl = event.target;

    if (openEl.tagName === 'I') {
        openEl = openEl.parentElement;
    }

    if (openEl.classList.contains('open') && openEl.classList.contains('show') || openEl.classList.contains('match')) {
        console.log('double tap');
        return;
    }

    countMoves();
    openEl.classList.add('open', 'show');
    newArr.push(openEl);

    if (newArr.length > 1) {
        let first=newArr.pop(); 
        let second=newArr.pop(); 

        let first_i = first.getElementsByTagName('i')[0];
        let second_i = second.getElementsByTagName('i')[0];

        if (first_i.className !== second_i.className) {
            console.log('no');
            setTimeout(() => {
                first.classList.remove('show', 'open');
                second.classList.remove('show', 'open');
            }, 500);
        }
        else {
            console.log('yep');
            first.classList.remove('open','show');
            first.classList.add('match');
            second.classList.remove('open','show');
            second.classList.add('match');
        }
    }
    
    finishGameFunc();
}
/* 4rth function is counting moves in Game*/
function countMoves() {
    numMoves++;
    m.innerHTML = numMoves;
    if (numMoves === 5) {
        console.log('only two stars');
        starList[0].classList.remove('fa-star');
    }
    else if (numMoves === 8) {
        console.log('only one star');
        starList[1].classList.remove('fa-star');
    }
}
/* 5th function adds the window with results*/
function finishGameFunc() {
    let matchArr = document.getElementsByClassName('match');
    if (matchArr.length === 16) {
        alert('Congradulations! You won ! You made ' + numMoves + ' moves!');
    }
}

r.addEventListener('click', againFunc)
function againFunc() {
    numMoves = 0;
    m.innerHTML = [numMoves];
    starList[0].classList.add('fa-star');
    starList[1].classList.add('fa-star');
    gameFunc();
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page


// Shuffle function from http://stackoverflow.com/a/2450976
     
*/


function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


