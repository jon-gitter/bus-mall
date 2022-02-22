'use strict';

let votesAllowed = 5;

// array to house objects created from constructor
let products = [];


// DOM refrences
let myContainer = document.getElementById('container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsButton = document.getElementById('show-results-button');
let showResults = document.getElementById('display-results-list');



// constructor
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  this.src = `img/${name}.${fileExtension}`;

  products.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');



//helper function for random number generator
function getRandomNumber() {
  return Math.floor(Math.random() * products.length);
}


// // helper function to render images
function renderImgs() {
  let productOneRand = getRandomNumber();
  let productTwoRand = getRandomNumber();
  let productThreeRand = getRandomNumber();

  // need help to make this all in one while loop or something shorter
  while (productOneRand === productTwoRand || productOneRand === productThreeRand || productTwoRand === productThreeRand) {
    productOneRand = getRandomNumber();
    productTwoRand = getRandomNumber();
    productThreeRand = getRandomNumber();
  }

  imgOne.src = products[productOneRand].src;
  imgOne.alt = products[productOneRand].name;
  products[productOneRand].views++;

  imgTwo.src = products[productTwoRand].src;
  imgTwo.alt = products[productTwoRand].name;
  products[productTwoRand].views++;

  imgThree.src = products[productThreeRand].src;
  imgThree.alt = products[productThreeRand].name;
  products[productThreeRand].views++;
}


renderImgs();


//event listener for clicks
function handleClick(event) {
  votesAllowed--;
  let imgClicked = event.target.alt;

  for (let i = 0; i < products.length; i++) {
    if (imgClicked === products[i].name) {
      products[i].clicks++;
    }
  }

  renderImgs();

  // stop voting after round has completed 5 times
  if (votesAllowed === 0) {
    myContainer.removeEventListener('clicks', handleClick);
  }
}

// function to show results
function handleShowResults(event) {
  if (votesAllowed === 0) {
    for (let i = 0; i < products.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${products[i].name} was viewed ${products[i].views} times, and was voted for ${products[i].clicks} times.`;
      showResults.appendChild(li);
    }
  }
}



myContainer.addEventListener('click', handleClick);

resultsButton.addEventListener('click', handleShowResults);