var currentQuestion, totalQuestion, correct;
var isAnswering, answers;
var user_name, user_email, user_phone;
var language;

function main(){
	$(".teste-nav-btn").addClass("active");

	currentQuestion = 1;
	isAnswering = true;
	totalQuestion =  answers.length;
	correct = 0;

	$("#progress-value").html("0/" + totalQuestion + " completo");

	$("#init-button").submit(function() {
		initForm();
	});
}

function setNextAction() {
	$("#question" + currentQuestion + " input").each(function() {
		$(this).bind("click", function() {
			$("#proximo-button").prop("disabled", false);
		});
	});

	$("#proximo-button").unbind("click");
	$("#proximo-button").bind("click", function() {
		var markedSomething = false;
		$("#question" + currentQuestion + " input").each(function() {
			if($(this).is(':checked')) markedSomething = true;
		});

		if(markedSomething == false) {
			alert('Marque alguma alternativa antes de prosseguir');
			return;
		}

		updateCorrectScoreAndProgressBar();

		$("#question" + currentQuestion).hide();
		currentQuestion = currentQuestion + 1;		
		$("#question" + currentQuestion).show();

		if(currentQuestion == totalQuestion) {
			$("#proximo-button").hide();
			$("#finish-button").show();
			setFinishAction();
		}
		else {
			setNextAction();
		}
		$("#proximo-button").prop("disabled", true);
	});
}

function updateCorrectScoreAndProgressBar() {
	$("#question" + currentQuestion + " input").each(function() {
		var radio = $(this);
		var divParent = $(this).parent();
		var isChecked = radio.is(':checked');

		if(radio.attr('id') == ("opt"+currentQuestion + "" + answers[currentQuestion-1])) {
			if(isChecked) {
				correct = correct + 1;
			}
		}
	});
		
	$("#progress-value").html(currentQuestion + "/" + totalQuestion + " completo");
	$("#progress-bar").width(currentQuestion*100.0/totalQuestion+"%");
}
function setFinishAction() {
	$("#finish-button").bind("click", function() {
		updateCorrectScoreAndProgressBar();

		$("#questions").hide();
		$("#result").show();
		$("#result").html("<h3>Você acertou " + Math.round(correct*100.0/totalQuestion*100)/100 + "% das questões</h3><h4>Visite uma de <a href=\"/escolas-e-localizacao\">nossas escolas</a> e consulte as melhores opções de turma para você.</h4>")
	

		$.ajax({
		  type: "post",
		  data: {
		  	"name": user_name,
		  	"email": user_email,
		  	"phone": user_phone,
		  	"correct": correct,
		  	"language": language
		  },
		  url: "/teste",
		  dataType: "json",
		  statusCode: {
		    400: function() {
      			//fail case
      		},
    		200: function() {
    			//success case
    		}
  		}});
	});
}

function initForm() {
	$("#init-form").hide();
	$("#question1").show();
	$("#proximo-button").show();
	$("#proximo-button").prop("disabled", true);
	setNextAction();

	user_name = $("#name").val();
	user_email = $("#email").val();
	user_phone = $("#phone").val();
	return false;
}

main()