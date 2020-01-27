var container = document.getElementById("container");

let qCounter = 0;
let minutes = 0;
let seconds = 0;
let time = 30;
let score = 0;
let clock, name, currentScore;

$(".btn-start").on("click", function() {
  initialize();
  timer($(".timer"));
  renderQuestion();
  $(".btn-start").hide();
});

function renderQuestion() {
  if (qCounter < myQuestions.length) {
    $(".question").html(`
      <h3>${myQuestions[qCounter].question}</h3>
      `);
    for (var key in myQuestions[qCounter].answers) {
      $(".answers").append(`
      <button type="button" class="btn-1 btn btn-info">${myQuestions[qCounter].answers[key]}</button>
      `);
    }
  }
}

$(document).on("click", ".btn-1", function() {
  let userChoice = $(this).text();
  let correctAnswer = myQuestions[qCounter].correctAnswer;

    if (userChoice === correctAnswer) {
      qCounter++;
      //$(".answers").empty()
      clear();
      renderQuestion();

      if (qCounter === myQuestions.length) {
        //timer($(".timer"));
        clear();
        gameOver();
      }
    } else {
      $(".feedback").html(`<h4>Wrong answer!</h4>`);
      time -= 10;
      clearInterval(clock);
      timer($(".timer"));
    }
});

function addForm() {
  let $label = $("<label>");
  let $input = $("<input>");
  let $button = $("<button>");
  let $formGroup = $("<div>");

  $label.text("Enter Initials");
  $label.attr({
    class: "label"
  });
  $input.attr({
    type: "text",
    class: "form-control",
    id: "userInput",
    value: "",
    placeholder: "Your Initials"
  });
  $button.attr({
    type: "button",
    class: "btn-submit btn btn-info mb-2"
  });
  $button.text("Submit");
  $formGroup.addClass("form-group");

  $formGroup.append($label, $input);
  $(".userInfo").append($formGroup, $button);
}

function gameOver() {
  clearInterval(clock);
  console.log(clock)
  addForm();
  saveScore();
  //$(".timer").hide();
}

function clear() {
  $(".question").empty();
  $(".answers").empty();
  //$(".answers").append(`<button type="button" class="btn-score btn btn-info">Save Score</button>`);
  $(".feedback").empty();
}

function initialize() {
  qCounter = 0;
  minutes = 0;
  seconds = 0;
  time = 30;
  score = 0;
  clearInterval(clock);

}

function saveScore() {
  let initials = $("#userInput").val();
  localStorage.setItem("name", JSON.stringify(initials).trim());
  localStorage.setItem("currentScore", JSON.stringify(score));
  name = JSON.parse(localStorage.getItem("name"));
  currentScore = JSON.parse(localStorage.getItem("currentScore"));

  console.log(name);
  console.log(initials);
  console.log(currentScore);
}

function displayScore() {
  $(".question").html(`<h4>High Scores:</h4>`);
  $(".btn-save-score").hide();
  //$(".question").html(`<h6>${name} ${currentScore} </h6>`);
  console.log(name, currentScore);
  $(".question").html(`<h6> User: ${name} Score: ${currentScore} </h6>`);
}

$(document).on("click", ".btn-submit", function() {
  $(".btn-submit").hide();
  $(".label").hide();
  $(".form-control").hide();
  saveScore();
  $(".answers").append(
    `<button type="button" class="btn-high-score btn btn-info">View High Scores:</button>`
  );
  $(".btn-start").show();
});

$(document).on("click", ".btn-high-score", displayScore);

function timer(display) {
  let timer = time;

  clock = setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    score = minutes + seconds;

    display.text(minutes + ":" + seconds);

    timer--;
    console.log(timer)
    if (timer < 0) {
      display.text("Times up!");
      console.log(clock)
      gameOver();
    }
  }, 1000);
}

const myQuestions = [
  {
    question: "Who is the strongest?",
    answers: {
      a: "Superman",
      b: "The Terminator",
      c: "Waluigi, obviously"
    },
    correctAnswer: "Waluigi, obviously"
  },
  {
    question: "What is the best site ever created?",
    answers: {
      a: "SitePoint",
      b: "Simple Steps Code",
      c: "Trick question; they're both the best"
    },
    correctAnswer: "Trick question; they're both the best"
  },
  {
    question: "Where is Waldo really?",
    answers: {
      a: "Antarctica",
      b: "Exploring the Pacific Ocean",
      c: "Sitting in a tree",
      d: "Minding his own business, so stop asking"
    },
    correctAnswer: "Minding his own business, so stop asking"
  }
];
