var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var audio;
var gameOver = false;
var levelCount = 0;

function nextSequence() {
  userClickedPattern = [];
  levelCount++;
  $("h1").text("Level: " + levelCount);
  return Math.floor(Math.random() * 4);
}

function playSound(color) {
  audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

function animateButton(color) {
  $("#" + color).animate({ opacity: 0.6 }, 100, function () {
    playSound(color);
    $("#" + color).animate({ opacity: 1 }, 100);
  });
}

function addToGamePattern() {
  var randomChosen = buttonColours[nextSequence()];
  gamePattern.push(randomChosen);
  console.log(gamePattern);
  animateButton(randomChosen);
}

function isGameOver() {
  gameOver = true;
  levelCount = 0;
  userClickedPattern = 0;
  gamePattern = [];
  $("h1").text("Game Over");
  $("body").css("background-color", "red");
  playSound("wrong");
}

function isCorrect(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("sucess");
    setTimeout(function () {
      $("body").css("background-color", "#011f3f");
    }, 300);
  } else {
    isGameOver();
  }
  if (userClickedPattern.length === gamePattern.length && !gameOver) {
    //5. Call nextSequence() after a 1000 millisecond delay.
    $("body").css("background-color", "green");
    setTimeout(function () {
      $("body").css("background-color", "#011f3f");
    }, 300);
    setTimeout(addToGamePattern, 1000);
  }
}

$(":button").on("click", function () {
  gameOver = false;
  $("body").css("background-color", "#011f3f");
  addToGamePattern();
});

$("div[type=button]").on("click", function () {
  var userChosenColour = $(this).attr("id"); // Get the id of the clicked button
  userClickedPattern.push(userChosenColour); // Add the id to userClickedPattern array
  animateButton(userChosenColour);
  console.log("Clicked color: " + userChosenColour);
  isCorrect(userClickedPattern.length - 1);
});
