//TIMER

var sec = 120;
var time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('timer').innerHTML = sec + "sec left";
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Times Up! Score will not be saved. Please try again");
        location.reload(true);
    }
}







(function() {

    var questions = [
        {
            question: "What are variables used for in JavaScript Programs?",
            choices: ["Storing numbers, dates, or other values", "Varying randomly", "Causing high-school algebra flashbacks", "None of the above"],
            correctAnswer: 0
          }, {
            question: "What should appear at the very end of your JavaScript?",
            choices: ["Closing script tag", "Opening script tag", "Your end statement", "None of the Above"],
            correctAnswer: 0
          }, {
            question: "Which of the following can't be done with client-side JavaScript?",
            choices: ["Validating a form", "Sending a form's contents by email", "Storing the form's contents to a database file on the server", "None of the above"],
            correctAnswer: 2
          }, {
            question: "Which of the following attribute can hold the JavaScript version?",
            choices: ["LANGUAGE", "VERSION", "SCRIPT", "None of the above"],
            correctAnswer: 0
          }];
    
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
    
    // DISPLAY 1ST QUESTION
    displayNext();
    
    // CLICK NEXT BUTTON
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      // Suspend click listener during fade animation
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      // NO USER SELECTION
      if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    // CLICK HANDLER PREVIOUS
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    // CLICK FOR START OVER
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    // CREATES QUESTION AND ANSWER DIVS
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('');
      qElement.append(header);
      
      var question = $('<h2>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    // CREATE LIST OF ANSWERS
    function createRadios(index) {
      var radioList = $('<ol>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    // READS USER SELCTION AND PLACES IN AN ARRAY
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // DISPLAY REQUESTED ELEMENT
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // DISPLAY OFPREVIOUS BUTTON
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    // SCORE OUTPUT
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] == questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('You got ' + numCorrect + ' questions out of ' +
                   questions.length + ' right!!!');
      return score;
    }
  })();