function main(){
	var hash
	if(window.location.hash) {
      	hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
    } else {
      	hash = "ingles"
    }
    $(".course-description").removeClass("active")
    $(".course-description").addClass("inactive")
    $("#"+hash).removeClass("inactive")
    $("#"+hash).addClass("active")

    $(".nav li").removeClass("active");
    $(".nav li").addClass("inactive")
    $("."+hash+"li").addClass("active");
    $("."+hash+"li").removeClass("inactive");

    $(".cursos-nav-btn").addClass("active")
    setClickEvents();
}

function setClickEvents() {
	$(".nav li").bind("click", function() {
		console.log("click")
		$(".nav li").removeClass("active");
		$(".nav li").addClass("inactive")
		$(this).addClass("active");
		$(this).removeClass("inactive");
		$(".cursos-nav-btn").addClass("active")

		var clickedCourse = $($(this).html()).attr("href");
		$(".course-description").hide();
		$(clickedCourse).show();
	});
}
main()