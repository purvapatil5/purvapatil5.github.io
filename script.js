//Word and Hints Object
// const options = {
//   aroma: "Pleasing smell",
//   pepper: "Salt's partner",
//   halt: "put a stop to",
//   jump: "Rise suddenly ",
//   shuffle: "Mix cards up ",
//   combine: "Add; Mix",
//   chaos: "Total disorder",
//   labyrinth: "Maze",
//   disturb: "Interrupt; upset ",
//   shift: "Move; Period of word",
//   machine: "Device or appliance",
// };

//Word and Image Object
const options = {
  honda: {
    image: "https://passion-stickers.com/575-large_default/honda-logo.jpg",
  },
  bmw: {
    image: "https://i.pinimg.com/736x/f9/97/0d/f9970dd9535a68ed3db937f448a27db8.jpg",
  }, 
  mercedes: {
    image: "https://i.ebayimg.com/images/g/cHAAAOSwvclc-T7o/s-l1600.jpg",
  }, 
  mazda: {
    image: "https://i.pinimg.com/originals/eb/b0/3e/ebb03eba30cd4880617d37b28215a31f.jpg",
  }, 
};

const foodOptions = {
  honda: {
    image: "https://passion-stickers.com/575-large_default/honda-logo.jpg",
  },
};


//Initial References
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const homeBtn = document.getElementById("home");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const carBtn = document.getElementById("carBtn");
const foodBtn = document.getElementById("foodBtn");
const backBtn = document.getElementById("backBtn");
car_flag = "false";
won=0;
lost=0;
let randomWord = "",
  randomHint = "";
let winCount = 0,
  lossCount = 0;
let usedWords = []; // New array to keep track of used logos
let availableWords = [];

const images = {};
for (const word in options) {
  const imagePath = options[word].image;
  const image = new Image();
  image.src = imagePath;
  images[word] = image;
}

const foodImages = {};
for (const word in foodOptions) {
  const imagePath = foodOptions[word].image;
  const image = new Image();
  image.src = imagePath;
  images[word] = image;
}

//Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

//Block all the buttons
const blocker = (win) => {
  let lettersButtons = document.querySelectorAll(".letters");
  lettersButtons.forEach((button) => {
    button.disabled = true;
    if (win) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

 // Automatically show the next logo after 2 seconds
 setTimeout(() => {
  // controls.classList.add("hide");
  // lettersButtons.forEach((button) => {
  //   button.disabled = false;
  //   button.classList.remove("correct", "incorrect");
  // });
  // message.innerText = "";
  // generateWord(images);
  init();
}, 2000);
};

//Start Game
startBtn.addEventListener("click", () => {
  controls.classList.add("hide");
  init();
});

//Stop Game
const stopGame = () => {
  controls.classList.remove("hide");
  car_flag = "false";
  food_flag = "flase";
};

//Start Car Game
carBtn.addEventListener("click", () => {
  controls.classList.add("hide");
  car_flag = "true";
  init();
});

foodBtn.addEventListener("click", () => {
  controls.classList.add("hide");
  food_flag = "true";
  init();
});

backBtn.addEventListener("click", () => {
  // Perform your action here
  usedWords = []; // Reset usedWords array
  stopGame();
  startBtn.disabled = true;
  startBtn.hidden = true;
  homeBtn.disabled = true;
  homeBtn.hidden = true;
  carBtn.disabled = false;
  carBtn.hidden = false;
  foodBtn.disabled = false;
  foodBtn.hidden = false;
  resultText.hidden = true;
});

homeBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  startBtn.hidden = true;
  homeBtn.disabled = true;
  homeBtn.hidden = true;
  carBtn.disabled = false;
  carBtn.hidden = false;
  foodBtn.disabled = false;
  foodBtn.hidden = false;
  resultText.hidden = true;
});

//Generate Word Function
const generateWord = (pictures) => {
  letterContainer.classList.remove("hide");
  userInpSection.innerText = "";
  // Check if all words have been used
 if (usedWords.length === words.length) {
  usedWords = []; // Reset usedWords array
  const score = `${won}/${words.length}`;
  // alert(`Game Over!\n${score}`);
  resultText.hidden = false;
  resultText.innerHTML = "Score: "+score;
  stopGame();
  startBtn.disabled = false;
  startBtn.hidden = false;
  startBtn.innerText = "Restart";
  homeBtn.disabled = false;
  homeBtn.hidden = false;
  homeBtn.innerText = "Home";
  carBtn.disabled = true;
  carBtn.hidden = true;
  foodBtn.disabled = true;
  foodBtn.hidden = true;
  let lettersButtons = document.querySelectorAll(".letters");
  return;
}

// Generate a random word that has not been used before
availableWords = words.filter(word => !usedWords.includes(word));
randomWord = availableWords[generateRandomValue(availableWords)];
usedWords.push(randomWord);

  //randomWord = words[generateRandomValue(words)];
  randomHint = options[randomWord];
  hintRef.innerHTML = `<div id="wordHint">
  <span>Guess the Logo</span></div>`;
  let displayItem = "";
  randomWord.split("").forEach((value) => {
    displayItem += '<span class="inputSpace">_ </span>';
  });

   // Display image
   const imageContainer = document.createElement("div");
   imageContainer.classList.add("image-container");
   imageContainer.appendChild(images[randomWord]);
   hintRef.appendChild(imageContainer);
   
  //Display each element as span
  userInpSection.innerHTML = displayItem;
  userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;

  backBtn.innerText = "Back";
};

//Initial Function
const init = () => {
  winCount = 0;
  lossCount = 5;
  randomWord = "";
  word.innerText = "";
  randomHint = "";
  message.innerText = "";
  userInpSection.innerHTML = "";
  letterContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  if (car_flag === "true")
  {
  words = Object.keys(options);
  generateWord(images);
  }
  else if (food_flag === "true") {
  words = Object.keys(foodOptions);
  generateWord(foodImages);
  }

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");

    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);

    //Character button onclick
    button.addEventListener("click", () => {
      message.innerText = `Correct Letter`;
      message.style.color = "#008000";
      let charArray = randomWord.toUpperCase().split("");
      let inputSpace = document.getElementsByClassName("inputSpace");

      //If array contains clicked value replace the matched Dash with Letter
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //If character in array is same as clicked button
          if (char === button.innerText) {
            button.classList.add("correct");
            //Replace dash with letter
            inputSpace[index].innerText = char;
            //increment counter
            winCount += 1;
            //If winCount equals word length
            if (winCount == charArray.length) {
              resultText.innerHTML = "You Won";
              //startBtn.innerText = "Restart";
              won++;
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        button.classList.add("incorrect");
        lossCount -= 1;
        document.getElementById(
          "chanceCount"
        ).innerText = `Chances Left: ${lossCount}`;
        message.innerText = `Incorrect Letter`;
        message.style.color = "#ff0000";
        if (lossCount == 0) {
          word.innerHTML = `The word was: <span>${randomWord}</span>`;
          resultText.innerHTML = "Game Over";
          lost++;
          blocker();
        }
      }

      //Disable clicked buttons
      button.disabled = true;
    });

    //Append generated buttons to the letters container
    letterContainer.appendChild(button);
  }
};

window.onload = () => {
  // init();
};
