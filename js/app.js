'use strict';

let votesAllowed = 25;

// array to house objects created from constructor
let products = [];


// DOM refrences
let myContainer = document.getElementById('container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

// let resultsButton = document.getElementById('show-results-button');
// let showResults = document.getElementById('display-results-list');

let ctx = document.getElementById('results-chart').getContext('2d');

let retrievedProducts = localStorage.getItem('stringifiedProductsKey');

let parsedProducts = JSON.parse(retrievedProducts);







// constructor
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  this.src = `img/${name}.${fileExtension}`;

  products.push(this);
}

if (retrievedProducts) {
  products = parsedProducts;
} else {
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
}





//helper function for random number generator
function getRandomNumber() {
  return Math.floor(Math.random() * products.length);
}

// let randomIndexes = [];

// function createImgs() {

//   while (randomIndexes.length < 3) {
//     let randomNum = getRandomImg();
//     while (!randomIndexes.includes(randomNum)) {
//       randomIndexes.push(randomNum);
//     }
//   }
//   let itemOne = randomIndexes.pop();
//   let itemTwo = randomIndexes.pop();
//   let itemThree = randomIndexes.pop();

// }

let firstImgGroup = [];
let secondImgGroup = [];
// console.log(firstImgGroup);
// console.log(secondImgGroup);


// // helper function to render images
function renderImgs() {
  if (secondImgGroup.length > 3) {
    delete secondImgGroup[3];
    delete secondImgGroup[4];
    delete secondImgGroup[5];
  }
  while (firstImgGroup.length < 3) {
    let numIndex = getRandomNumber();
    while (!secondImgGroup.includes(numIndex)) {
      secondImgGroup.unshift(numIndex);
      firstImgGroup.push(numIndex);
    }
  }
  let itemOne = firstImgGroup.pop();
  let itemTwo = firstImgGroup.pop();
  let itemThree = firstImgGroup.pop();


  imgOne.src = products[itemOne].src;
  imgOne.alt = products[itemOne].name;
  products[itemOne].views++;

  imgTwo.src = products[itemTwo].src;
  imgTwo.alt = products[itemTwo].name;
  products[itemTwo].views++;

  imgThree.src = products[itemThree].src;
  imgThree.alt = products[itemThree].name;
  products[itemThree].views++;


}

renderImgs();


//event listener for clicks
function handleClick(event) {
  votesAllowed--;
  // console.log(event);
  let imgClicked = event.target.alt;

  for (let i = 0; i < products.length; i++) {
    if (imgClicked === products[i].name) {
      products[i].clicks++;
    }
  }

  renderImgs();

  // stop voting after round has completed
  if (votesAllowed === 0) {
    myContainer.removeEventListener('click', handleClick);

    renderChart();

    let stringifiedProducts = JSON.stringify(products);

    localStorage.setItem('stringifiedProductsKey', stringifiedProducts);

  }
}

// function to show results
// function handleShowResults() {
//   if (votesAllowed === 0) {
//     for (let i = 0; i < products.length; i++) {
//       let li = document.createElement('li');
//       li.textContent = `${products[i].name} was viewed ${products[i].views} times, and was voted for ${products[i].clicks} times.`;
//       showResults.appendChild(li);
//     }
//   }
// }




function renderChart() {
  let productNames = [];
  let productViews = [];
  let productClicks = [];

  for (let i = 0; i < products.length; i++) {
    productNames.push(products[i].name);
    productViews.push(products[i].views);
    productClicks.push(products[i].clicks);
  }



  let chartObject = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews,
        backgroundColor: ['green'],
        borderColor: ['green'],
        borderWidth: 1
      }, {
        label: '# of Views',
        data: productClicks,
        backgroundColor: ['yellow'],
        borderColor: ['yellow'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  const myChart = new Chart(ctx, chartObject);
}




myContainer.addEventListener('click', handleClick);
// ctx.addEventListener('click', handleClick);
