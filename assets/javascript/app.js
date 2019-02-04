$(document).ready(function () {

    //          *******Variables*******
    var count = 0;
    var time = 11;
    var isSelected = false;
    var ticker;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var audioRight = new Audio('assets/sounds/right.wav');
    var audioWrong = new Audio('assets/sounds/wrong.wav');
    //          *******Question Arrays*******
    var question = [
        "Adjusted for inflation, what is the highest grossing movie of all time?",
        "Which one of these actors have NOT played Batman?",
        "Which Disney movie won a Grammy for Song of the Year",
        "What was the first Pixar movie to receive a rating higher than G?",
        "What is the most expensive film ever to make?",
        "What movie series had an equal number of movies to the amount of books they were based on?",
        "How many James Bond movies are there?",
        "Avengers: Endgame premiers in April 2019, how many Marvel Cinematic Universe movies proceeded it?"];
    var answer = [
        "Gone with the Wind",
        "Matt Damon",
        "Alladin - A Whole New World",
        "The Incredibles",
        "Pirates of the Caribbean: On Stranger Tides",
        "The Lord of the Rings",
        "26",
        "21"];
    var firstChoice = [
        "Gone with the Wind",
        "George Clooney",
        "Alladin - A Whole New World",
        "Monsters Inc",
        "Avengers: Infinity War",
        "Harry Potter",
        "18",
        "12"];
    var secondChoice = [
        "Avatar",
        "Michael Keaton",
        "Lion King - The Circle of Life",
        "Toy Story 2",
        "Star Wars: The Last Jedi",
        "The Lord of the Rings",
        "23",
        "15"];
    var thirdChoice = [
        "Star Wars",
        "Matt Damon",
        "Moana - You're Welcome",
        "The Incredibles",
        "Justice League",
        "The Twilight Saga",
        "26",
        "19"];
    var fourthChoice = [
        "Titanic",
        "Val Kilmer",
        "Mulan - A Girl Worth Fighting For",
        "Coco",
        "Pirates of the Caribbean: On Stranger Tides",
        "The Hunger Games",
        "30",
        "21"];


    //          *******Functions to make pages change (hide and show)*******
    function showHolders() {
        $("#question-holder").show();
        $("#choice-holder-1").show();
        $("#choice-holder-2").show();
        $("#choice-holder-3").show();
        $("#choice-holder-4").show();
    }
    function hideHolders() {
        $("#question-holder").hide();
        $("#choice-holder-1").hide();
        $("#choice-holder-2").hide();
        $("#choice-holder-3").hide();
        $("#choice-holder-4").hide();
        $("#restart-holder").hide();
    }
    function hideResults() {
        $("#correct-holder").hide();
        $("#incorrect-holder").hide();
        $("#unanswered-holder").hide();
        $("#restart-holder").hide();
    }
    function displayQuestion() {
        hideResults();
        $("#answer-holder").hide();
        $("#image-holder").hide();
        $("#time-holder").show();
        showHolders();
        $("#question-holder").html(question[count]);
        $("#choice-holder-1").html(firstChoice[count]);
        $("#choice-holder-2").html(secondChoice[count]);
        $("#choice-holder-3").html(thirdChoice[count]);
        $("#choice-holder-4").html(fourthChoice[count]);


        //          *******Button Hovers*******
        $("#choice-holder-1").hover(function () {
            $(this).css("color", "grey");
        },
            function () {
                $(this).css("color", "white");
            });
        $("#choice-holder-2").hover(function () {
            $(this).css("color", "grey");
        },
            function () {
                $(this).css("color", "white");
            });
        $("#choice-holder-3").hover(function () {
            $(this).css("color", "grey");
        },
            function () {
                $(this).css("color", "white");
            });
        $("#choice-holder-4").hover(function () {
            $(this).css("color", "grey");
        },
            function () {
                $(this).css("color", "white");
            });
    }

    //          *******On Click Handlers*******
    $("#choice-holder-1").on("click", checkAnswer)
    $("#choice-holder-2").on("click", checkAnswer)
    $("#choice-holder-3").on("click", checkAnswer)
    $("#choice-holder-4").on("click", checkAnswer)


    //          *******Function to stop timers and check to see if the answer is right*******
    function checkAnswer() {

        hideHolders();

        if ($(this).text() === answer[count]) {
            stopTime();
            isSelected = true;
            $("#answer-holder").show();
            $("#answer-holder").html("Right! The answer is: " + answer[count]);
            displayImage();
            audioRight.play();
            correct++;
            count++;
        }
        else {
            stopTime();
            isSelected = true;
            $("#answer-holder").show();
            $("#answer-holder").html("Wrong! The answer is: " + answer[count]);
            displayImage();
            audioWrong.play();
            incorrect++;
            count++;
        }

        checkGameEnd();
    }


    //          *******Checks to see if all the questions have been answered*******
    function checkGameEnd() {
        if (count === question.length) {
            $("#time-holder").hide();
            showResults();
            count = 0;
        }
    }

    function resetTime() {
        time = 11; //set so when time is actually displayed 10 is the first number displayed not 9
    }

    //          *******Question Timers*******
    function displayTime() {
        time--;
        $("#time-holder").html("Time remaining: " + time);

        if (time <= 0) {
            hideHolders();
            stopTime();
            $("#answer-holder").show();
            $("#answer-holder").html("Time is up! The answer is: " + answer[count]);
            displayImage();
            unanswered++;
            count++;
            checkGameEnd();
        }
    }

    function startTime() {
        clearInterval(ticker);
        ticker = setInterval(displayTime, 1000);
    }
    function stopTime() {
        clearInterval(ticker);
        resetTime();
        if (count < question.length - 1) {
            setTimeout(startTime, 2000); //sets delay to count 1 second off so correct time is show
            setTimeout(displayQuestion, 3000); // 3 second showing of answers before new question is shown
        }
    }

    resetTime();


    //          *******Function to display images on answer display*******
    function displayImage() {
        if (count === 0) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/goneWithTheWind.gif">');
        }
        else if (count === 1) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/batmanRobin.gif">');
        }
        else if (count === 2) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/newWorld.gif">');
        }
        else if (count === 3) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/incredibles.gif">');
        }
        else if (count === 4) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/jacksparrow.gif">');
        }
        else if (count === 5) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/drinkingHobbits.gif">');
        }
        else if (count === 6) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/jamesBondGun.gif">');
        }
        else if (count === 7) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/endGame.gif">');
        }
    }


    //          *******Displays Final Score*******
    function showResults() {
        $("#correct-holder").show();
        $("#correct-holder").html("Correct: " + correct);
        $("#incorrect-holder").show();
        $("#incorrect-holder").html("Incorrect: " + incorrect);
        $("#unanswered-holder").show();
        $("#unanswered-holder").html("Unanswered: " + unanswered);
        $("#restart-holder").show();
    }

    function resetResults() {
        correct = 0;
        incorrect = 0;
        unanswered = 0;
    }

    //          *******Starts the game function and button*******
    function startGame() {
        $(".start").hide();
        startTime();
        displayQuestion();
    }

    $(".start").on("click", function () {
        startGame();
    });

    //          *******Copy of Start Function to make Play Again Button*******
    function restartGame() {
        $("#restart-holder").hide();
        startTime();
        displayQuestion();
    }

    $("#restart-holder").on("click", function () {
        restartGame();
    });

    //          *******Hides Buttons on page launch*******
    hideHolders()
});