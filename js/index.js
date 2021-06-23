/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const TIME_LIMIT = 90; // config quiz time limit in seconds

  // start button
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
    intervalID = setInterval(countdownFunc, 1000);
  });
  // submit button
  const submit = document.querySelector('#btnSubmit');
  submit.addEventListener('click', e => {
    calculateScore();
  });
  // reset button
  const reset = document.querySelector('#btnReset');
  reset.addEventListener('click', e => {
    window.location.reload();
  });
  // leaving a little margin at the bottom
  document.querySelector(".buttons-bottom").style.marginBottom = '3rem';

  // timer
  let intervalID;
  let secondsRemaining = TIME_LIMIT;
  const time = document.querySelector('#time');

  const formatTime = seconds => {
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');

    return `${mm}:${ss}`;
  }

  const countdownFunc = () => {
    secondsRemaining--;
    time.innerText = formatTime(secondsRemaining);

    if (secondsRemaining === 0) {
      calculateScore();
    }
  };

  time.innerText = formatTime(secondsRemaining);



  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'What is the name of Han Solo\'s ship?',
      o: ['Millenium Falcon', 'Centurian Eagle', 'X-Wing', 'Home One'],
      a: 0,
    },
    {
      q: 'Which of the solid shapes shown could be made from the pattern?<img style="margin:0.5rem;width:269px;height:230px;" src="./images/spatial question.png"/>',
      o: [
        '<img style="width:50%;height:50%;padding-left:2rem;" src="./images/spatial ans A.png">',
        '<img style="width:50%;height:50%;padding-left:2rem;" src="./images/spatial ans B.png">',
        '<img style="width:50%;height:50%;padding-left:2rem;" src="./images/spatial ans C.png">',
        '<img style="width:50%;height:50%;padding-left:2rem;" src="./images/spatial ans D.png">',
      ],
      a: 3,
    }
  ];

  const shuffledQuizArray = shuffleArray(quizArray);
  shuffleAnswers(shuffledQuizArray);

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    shuffledQuizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> <label for="radio_${index}_0" style="padding:0;margin:0;">${quizItem.o[0]}</label></li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> <label for="radio_${index}_1" style="padding:0;margin:0;">${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> <label for="radio_${index}_2" style="padding:0;margin:0;">${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> <label for="radio_${index}_3" style="padding:0;margin:0;">${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    // stop countdown
    clearInterval(intervalID);

    // disable radio buttons
    document.querySelectorAll('input[type="radio"]')
      .forEach(button => button.setAttribute('disabled', 'true'));

    let score = 0;
    shuffledQuizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);

        if (quizItem.a == i) {
          //change background color of li element here
          liElement.classList.add('bg-success', 'text-light');
        }

        if (radioElement.checked) {
          // code for task 1 goes here
          if (quizItem.a == i) score++;
          else liElement.classList.add('bg-danger', 'text-light');
        }
      }
    });
    document.querySelector('#score').innerHTML = `Score: ${score} of ${shuffledQuizArray.length}`;
    return score;
  };

  // call the displayQuiz function
  displayQuiz();
});


// Utilities
const randInt = (maxExclusive, min=0) => Math.floor( Math.random() * (maxExclusive-min) ) + min;

// inserts element [x] into array [arr] at index [i], returns the modified array.
const insert = (arr, x, i) => { arr.splice(i, 0, x); return arr; } 

// returns a new copy of array [arr] with elements in a random order
const shuffleArray = arr => arr.reduce((acc, x) => insert(acc, x, randInt(acc.length+1)), []);

/** shuffles the answers in a quiz array [quizArr]
    updates correct answer
    [IMPORTANT] modifies the quiz array [quizArr]
*/ 
const shuffleAnswers = quizArr => {
  for (const questionObj of quizArr) {
    const correctAns = questionObj.o[questionObj.a];
    questionObj.o = shuffleArray(questionObj.o);
    questionObj.a = questionObj.o.indexOf(correctAns);
  }
}
