var currentColour = "choose a colour!";

/*onclick of a color item, choose it*/
/*write chosen colour to heading*/
$(".colourItems").on("click", function(e){

	$(".colourItems").css("border", "0");
	/*$(this).css("border", "2px solid white");*/
	currentColour = this.id;
	colourString = currentColour.substring(0, currentColour.length-6);
	$("#colourHeading").css("color", $(this).css("background"));
	$("#colourHeading").text(colourString);
});



$("#goBtn").on("click", function(){
	if(currentColour == "choose a colour!"){
		alert("i can't do anything if you haven't chosen a colour! no wait, i can punish you with this...");
		window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
	}else{
		alert(currentColour + " yeah, that's all this button does right now, returning the id of the colour selected");
	}
});

$("#resetBtn").on("click", function(){


});


$(".colourItems").on("click", function(){

              $("#chooserBorder").css({display:"block"});

            


                var position = $(this).position();
                var div2Width = $(this).css("width");
                var div2Height = $(this).css("height");
                $("#chooserBorder").animate({left:position.left, width:div2Width, height:div2Height}, 300);       
            

});



/*
$(".colourItems").draggable();
*/

/*deselect color if clicked anywhere except the colours*/

$(document).click(function(e) {
	if(!$(event.target).hasClass('colourItems') && !$(event.target).is('#goBtn') && !$(event.target).is('#chooserBorder')){
		console.log(e.target);
	    $(".colourItems").css("border", "0");
	    $("#colourHeading").css("color", "white");
	    currentColour = "choose a colour!" ;
		$("#colourHeading").text(currentColour);

		$("#chooserBorder").animate({left:0, width:0, height:0}, 300).fadeOut(300); 

	}
});