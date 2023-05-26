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
    volvo: {
        image: "https://i.pinimg.com/736x/56/bd/1b/56bd1b0f063981cb53e60c316d2bde91.jpg",
    },
    maserati: {
        image: "https://www.proprofs.com/quiz-school/user_upload/ckeditor/maserati.jpg",
    },
    lamborghini: {
        image: "https://media.baamboozle.com/uploads/images/285729/1654228490_22015_url.jpeg",
    },
    ferrari: {
        image: "https://www.dividapps.com/img/lq/images/q43.jpg",
    },
    audi: {
        image: "https://i.pinimg.com/736x/4c/34/ee/4c34eefba221546293d1032ae967eddc--audi-the-ojays.jpg",
    },
    opel: {
        image: "https://i.pinimg.com/736x/09/98/66/099866a01dfebce569cb79e03a69c86d.jpg",
    },
};

const foodOptions = {
    subway: {
        image: "https://www.logodesignlove.com/images/monograms/subway-monogram-01.jpg",
    },
    mcdonalds: {
        image: "https://logos-world.net/wp-content/uploads/2020/04/McDonalds-Logo.png",
    },
    lays: {
        image: "https://www.logolynx.com/images/logolynx/f9/f9d3e1fa2e03eda3845b12e440cbdc4e.jpeg",
    },
    starbucks: {
        image: "https://manacube.com/attachments/starbucks-jpg.5546/",
    },
    dominos: {
        image: "https://1.bp.blogspot.com/-e5_46NobiP8/TbUEMLkXQDI/AAAAAAAABVA/ynOQxOBvTfs/s1600/logo687.gif",
    },
    pizzahut: {
        image: "https://100-pics.net/images/answers/en/logos/logos_6719_142279.jpeg",
    }
};

const corporateOptions = {
    microsoft: {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
    },
    amazon: {
        image: "https://quizizz.com/media/resource/gs/quizizz-media/quizzes/71d4602b-75af-4d94-bd22-517621b65e15?w=90&h=90",
    },
    google: {
        image: "https://quizizz.com/media/resource/gs/quizizz-media/quizzes/940f318e-d7e6-4277-ae39-0723d02373c7",
    },
    apple: {
        image: "https://adcortex.com/wp-content/uploads/2020/09/Apple-Logo-black-1024x768.png",
    },
    meta: {
        image: "https://pbs.twimg.com/media/FC3qvpsXsAQGGdY.jpg",
    }
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
const corporateBtn = document.getElementById("corporateBtn");
const backBtn = document.getElementById("backBtn");
car_flag = "false";
food_flag = "false";
corporate_flag = "false";

won = 0;
lost = 0;
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

const corporateImages = {};
for (const word in corporateOptions) {
    const imagePath = corporateOptions[word].image;
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
    }, 3000);
};

//Start Game
startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    won = 0;
    lost = 0;
    init();
});

//Stop Game
const stopGame = () => {
    controls.classList.remove("hide");
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

corporateBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    corporate_flag = "true";
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
    corporateBtn.disabled = false;
    corporateBtn.hidden = false;
    resultText.hidden = true;
    car_flag = "false";
    food_flag = "false";
    corporate_flag = "false"
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
    corporateBtn.disabled = false;
    corporateBtn.hidden = false;
    resultText.hidden = true;
    car_flag = "false";
    food_flag = "false";
    corporate_flag = "false"
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
        resultText.innerHTML = "Score: " + score;
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
        corporateBtn.disabled = true;
        corporateBtn.hidden = true;
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

    if (car_flag === "true") {
        words = Object.keys(options);
        generateWord(images);
    } else if (food_flag === "true") {
        words = Object.keys(foodOptions);
        generateWord(foodImages);
    } else if (corporate_flag === "true") {
        words = Object.keys(corporateOptions);
        generateWord(corporateImages);
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
                            showWinningMessage("won");
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
                    showWinningMessage("lost");
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

// Function to show winning message and display GIF for 3 seconds
function showWinningMessage(result) {
    const randomImageNumber = Math.floor(Math.random() * 8) + 1;
    // Create img element for the GIF
    const gifImage = document.createElement('img');
    if (result === 'won') {
        message.innerText = 'You Won. Congratulations!';
        gifImage.src = `images/kitty${randomImageNumber}.gif`;
    } else if (result === 'lost') {
        message.innerText = 'You Lost. Try next one...';
        gifImage.src = `images/kittyy${randomImageNumber}.gif`;
    }
    gifImage.classList.add('winning-gif');

    // Append the GIF image to the document body
    document.body.appendChild(gifImage);

    // Remove the GIF image after 3 seconds
    setTimeout(() => {
        gifImage.remove();
    }, 3000);
}