function main(){
	$(".contato-nav-btn").addClass("active")
}

function submitContactForm() {
  $.ajax({
  type: "post",
  data: $("#contact-form").serialize(),
  url: "/contato",
  dataType: "json",
  statusCode: {
    400: function() {
      $("#contact-success").hide();
      $("#contact-fail").hide();
      $("#contact-fail").html("<strong>Algo deu errado.</strong> Certifique-se de ter preenchido todos os campos com dados válidos");
      $("#contact-fail").slideToggle();
    },
    200: function() {
      $("#contact-success").hide();
      $("#contact-fail").hide();
      $("#email").val("");
      $("#name").val("");
      $("#message").val("");

      $("#contact-success").html("<strong>Obrigado pelo contato!</strong> Responderemos assim que possível.");
      $("#contact-success").slideToggle();
    }
  }}).fail(function() {
  }).error(function() {
  }).success(function(res, status) {
  });

  return false;
}

main()