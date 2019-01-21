//array of trivia questions
var questions = [
    {
    q: "What is the oldest plant in the world?",
    options: ["Moss", "Great Basin Bristle Cone Pine", "Bamboo", "Palm"],
    image: "assets/images/bristlecone-pines-4[6].jpg",
    answer: "Great Basin Bristle Cone Pine",
  
    },
    {
    q:"Which houseplant thirives in high, medium and low lights?",
    options: ["Fiddle Leaf Fig", "Orchid", "ZZ Plant", "Elephant Ear"],
    image: "assets/images/zzplantceramiccontainer-16062775131.jpg",
    answer: "ZZ Plant",    
    }, 
    {
    q:"I am also known as the Mother-In-Law's tongue. Who am I?",
    options: ["Snake Plant", "Dracaena", "Lady Palm", "Bromeliad"],
    image: "assets/images/gallery_the-sill_snake-plant_2_szeylanica-4-018_1024x1024.jpg",
    answer: "Snake Plant",    
    },
    {
    q:"Plants that lose their leaves in the fall but don't die are called?",
    options: ["Evergreen", "Perennials", "Annuals", "Deciduous"],
    image: "assets/images/giphy.gif",
    answer: "Deciduous",    
    },
    {
    q:"Plants make their own food by doing what process?",
    options: ["Photosynthesis", "Respiration", "Transpiration", "Stressing"],
    image: "assets/images/412D8BC700000578-4578888-image-a-1_1496846048690.jpg",  
    answer: "Photosynthesis",  
    },
] 

//global variables
var $app = $("#app");
var correct = 0;
var incorrect = 0;
var questionIndex = 0;
var remainingTime;
var timer;

//call function init
init();

//create a start button and click event that removes button after click event
function init() {
  var $start = $('<button type="button" class="btn btn-warning">Start</button>');
  $start.on('click', showQuestion);
  $app.empty();
  $app.append($start);
//begining score and initial question index
  correct = 0;
  incorrect = 0;
  questionIndex = 0;
}

//creates function that displays clock and decreases time
function displayClock(){
  remainingTime--;
//when clock gets to zero the timer goes way and the question answer shows
  if (remainingTime === 0){
    clearInterval(timer);
    showAnswer();
  }
//displays text with time countdown
  $('#clock').text(remainingTime);
}

// sets the function that shows the question based on its location in the index and sets the timer 30 seconds and removes question after 30 seconds
function showQuestion() {
  remainingTime = 30;
  $app.empty();
  var question = questions[questionIndex];
//makes a card that contains the question and makes the answer options vertical
  var $question = $('<div class=card>');
//defines the question from the question index, count down of the clock's remaining time, and the timer's decremental increment, and button
  var $clock = $('<div>Time Remaining: <span id="clock">'+remainingTime+'</span></div>');
  var $q = $('<h2>'+ question.q + '</h2>')
  var $button;
  timer = setInterval(displayClock, 1000);
//displays the clock and question onto the page
  $question.append($clock);
  $question.append($q);
//inputs answer options and displays them as buttons that can be clicked
  for (var i=0; i < question.options.length; i++) {
    $button = $('<button>'+ question.options[i] +'</button>');
    $button.on('click', handleAnswerClick);  
    $question.append($button);
  }
//displays question
  $app.append($question);
}

function handleAnswerClick() {
  var value = $(this).text();
  showAnswer(value);
}

function showAnswer(userAnswer) {
  var question = questions[questionIndex];
  $app.empty();
  var img = $('<div id="image"></div>');
  $app.append('<h3>Correct Answer is: ' + question.answer + '</h3>');
  $app.append('<h3>You Selected: ' + userAnswer + '</h3>');
  img.append("<img src=" + question.image + ">");

  if (userAnswer === undefined) {
    // showTimeout();
    $app.append('<h5>Time out!</h5>');
    incorrect++;
    $app.append(img);
  } else if (userAnswer === question.answer) {
    // showCorrect();
    $app.append('<h5>Correct!</h5>');
    correct++;
    $app.append(img);
  } else {
    // showIncorrect();
    $app.append('<h5>Wrong Answer</h5>');
    incorrect++;
    $app.append(img);
  }
  questionIndex++;
  if (questionIndex < questions.length) {
    setTimeout(showQuestion, 5000);
  } else {
    setTimeout(showResult, 5000);
  }

  if (questionIndex === questions.length){
    setTimeout(showScore, 3000);
  } else {
    setTimeout(askQuestions, 3000);
  }
}

function showResult() {
  console.log('correct:', correct);
  console.log('incorrect:', incorrect);
}

function showScore (){
  $app.empty();
  var $score = $("<h2>Let's See How You Did:</h2>");
  $app.append($score);
  var correctAnswer = $('<h2>Correct Answers: ' + correct + '</h2>');
  var incorrectAnswer = $('<h2>Incorrect Answers: ' + incorrect + '</h2>');
  $app.append(correctAnswer, incorrectAnswer);
  clearInterval(intervalId);
//create button for user to click to restart game
  var $redo = $('<button type="button" class="btn btn-warning">Start</button>');
  $redo.on('click', showQuestion);
  app.append($redo);
  resetGame();
  
}

function resetGame(){
  correctAnswer = 0;
  wrongAnswer = 0;
  unanswered = 0;
  questionIndex = 0;
}


