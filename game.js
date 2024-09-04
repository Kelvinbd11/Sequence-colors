var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var start = false;
var nivel = 0;

$(document).keypress(function() {
    if (!start) {
      $("#level-title").text("Level " + nivel);
      nextSequence();
      start = true;
    }
  });

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

// --------------------------------------------- \\

function startOver(){
    nivel = 0;
    gamePattern = [];
    start = false;
}

function checkAnswer (currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Sucesso!");
    

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function ()  {
                nextSequence();
            }, 1000);
        }
    
    } else {
        console.log("Perdeu");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over")
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over! Pressione uma tecla para reiniciar");
        startOver();
        
    }   
}

function nextSequence () {

    userClickedPattern = [];
    nivel++; 

    $("#level-title").text("Level " + nivel);
    
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
   
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}






