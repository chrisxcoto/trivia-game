//Create Questions to ask player

var questions = [
    {
        question: 'What car does Dom have waiting in his garage in The Fast and the Furious?',
        answer: '1970 Dodge Charger',
        // if you want more choices just add more "" for choices
        choices: ['1970 Dodge Charger', '1971 Plymouth Barracuda', '1971 Dodge Demon', '1969 Camaro'],
        // leave this as blank string
        userAnswer: ""
    }, 

    {
        question: "What disorder is affecting Letty in Fast & Furious 6?",
        answer: 'amnesia',
        // if you want more choices just add more "" for choices
        choices: ['multiple personality disorder', "amenesia", "asphasia", "bipolar"],
        // leave this as blank string
        userAnswer: ""

    }, 
    {
        question: "Where do Dom, Mia and Brian head at the beginning of Fast Five?",
        answer: 'Rio De Janeiro',
        // if you want more choices just add more "" for choices
        choices: ['Miami', "Rio de Janeiro", "London", "San Jose"],
        // leave this as blank string
        userAnswer: ""
    }, 
    {
        question: "What car does Sean use in the final race of The Fast and the Furious:Tokyo Drift?",
        answer: 'Ford Shelby Mustang',
        // if you want more choices just add more "" for choices
        choices: ['Ford Shelby Mustang', "Porche 911", "Mitsubishi Lancer", "Ferrari"],
        // leave this as blank string
        userAnswer: ""
    }, 
    {
        question: "Furious 7 antagonist Deckard is whose brother?",
        answer: 'Owen Shaw',
        // if you want more choices just add more "" for choices
        choices: ["Dom", "Agent Hobbs", "Owen Shaw", "Han"],
        // leave this as blank string
        userAnswer: ""
    }, 
    {
        question: "What is Brian and Mia's son named?",
        answer: 'Jack',
        // if you want more choices just add more "" for choices
        choices: ['Jack', "Brian Jr", "Michael", "Chris"],
            // leave this as blank string
        userAnswer: ""
     },
     {
        question: "What is the name of Dominicks girlfriend?",
        answer: 'Leticia',
        // if you want more choices just add more "" for choices
        choices: ['Jane', "Maria", "Leticia", "Patricia"],
            // leave this as blank string
        userAnswer: ""
     },
     {
        question: "What is the name of the surveillance computer program in Furious 7?",
        answer: 'Gods Eye',
        // if you want more choices just add more "" for choices
        choices: ['The pharaoh', "Gods Eye", "Bandit", "Fluffy"],
            // leave this as blank string
        userAnswer: ""
     }
];


// Function to print all questions to the page
function renderQuestion(){
    //hiding the quiz form till user hit start function
    $("#quiz-form").hide();

    //loops thru questions in array
    questions.forEach(function(question, index){
        //create div to hold questions
        var $question = $("<div>").addClass("form-group text-center qtext");//how does it know difference between var question and question in the array???

        //adds question to the div 
         var label = $("<h2>").text(question.question).appendTo($question);//shouldnt it be questions.question? why cant i put var infront of label???

        //shuffles the questions in array (.5 shuffles the ?)
        question.choices = question.choices.sort(function(){
            return .5 - Math.random(); 
        });

        //creating loop to iterate through questions choices and creating radio buttons for each one
        for(var i=0; i < question.choices.length; i++){
            //creating a div for choice and adds bootstrap classes
            var choice = $("<div>");
            choice.addClass("form-check form-check-inline atext");
            
            //creating input tag for radio button
            var radio = $("<input>"); 

            //adds attributes to provide answer choices
            //"name" attr is super important, all radio buttons per question need to have the same "name" so they know what question it applies to
            radio.attr({
                type: "radio",
                value: question.choices[i],
                name: index, //index is a "reserved" word
                class: "form-check-input"
            })
            .appendTo(choice);

            //creating label to print to choices to page
            var choiceLabel = $("<label>");
            choiceLabel.text(question.choices[i])
            .addClass("form-check-label")
            .appendTo(choice);

            //adding whole radio button choice to question
            choice.appendTo($question)

        }
        //when done makingn all the choices, add whole question to the page
        //difference between append and appendTo is targeting a specific target
        $("#quiz-form").append($question) 
        
    });
}

//creat on "change" listener for all radio buttons but bind them to quiz-form since its permanently on the page
$("#quiz-form").on("change", ".form-check-input", function(){
    console.log(this);

    // GET question index out of the "name" attr so we know what question you answered
    var questionIndex = $(this).attr("name");
    console.log(questions[questionIndex]);

    //get value out of radio button you have selected
    var answer = $(this).val();
    console.log(answer)

    //sets answer to questions's useranswer property
    questions[questionIndex].userAnswer = answer;

});

//sets variables for time intervals, right and wrong answers
var time = 60;
var intervalId;
var rightAnswer = 0;
var wrongAnswer = 0; 

//startbtn to run the time and Game
$("#startBtn").on("click", function(){
    //removes display none class from jumbotron
    $("#quiz-tron").removeClass("d-none")
    //once user hits startbtn game form will show
    $("#quiz-form").show();

    //start time functions runs with these values
    start();

    //take the timer and decrements it by one second
    function decrement(){
        time--;
        //Prints timer to page
        $("#timer").text("Quiz will end in:" + (time));
        
        //if timer hits 0 STOP game and stops clock
        if (time === 0){
            stop();
            // Form to go away
            // clock stops
            // number of correct/incorrect get displayed
            // $("#quiz-tron").addClass("d-none")


            //checking user answer-using the loop to run thru every question not just one question
            for(var i = 0; i < questions.length; i++){

                //if user answer = answer increment right ans
                if(questions[i].userAnswer === questions[i].answer){
                    rightAnswer++;
                }
                //else increment wrong ans by 1
                else{
                    wrongAnswer++;
                }
            }
            //print right and wrong ans to page
            $("#rightAnswer").text(rightAnswer);
            $("#wrongAnswer").text(wrongAnswer);
        }
    }

    //clock start function and setInterval id to decrement by 1 sec(in miliseconds)
    function start(){
        time = 60
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    //stops clock when hits 0 and clears the intervalId
    function stop(){
        clearInterval(intervalId);
        console.log("stop")
    }


})
renderQuestion();