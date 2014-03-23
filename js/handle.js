var currentColour = "choose a colour!";
var coloursArray = new Array();
	coloursArray[0]="grayColour";
	coloursArray[1]="blackColour";
	coloursArray[2]="blueColour";
	coloursArray[3]="greenColour";
	coloursArray[4]="yellowColour";
	coloursArray[5]="pinkColour";
	coloursArray[6]="redColour";

	
	
/*change background after certain amount of time*/
	var currentBackground = 0;
	var backgrounds = [];
	backgrounds[0] = './img/bg.jpg';
	backgrounds[1] = './img/bg2.jpg';
	backgrounds[2] = './img/bg3.jpg';

function changeBackground() {
    currentBackground++;
    if(currentBackground > backgrounds.length-1) currentBackground = 0;

    $('.bgContainer').fadeOut(1500,function() {
        $('.bgContainer').attr('src', backgrounds[currentBackground]);
        $('.bgContainer').fadeIn(3000);
    });



    setTimeout(changeBackground, 7000);
}

$(document).ready(function() {
    setTimeout(changeBackground, 7000);        
});




/*onclick of a color item, choose it*/
/*write chosen colour to heading*/
$(".colourItems").on("click", function(e){

	$(".colourItems").css("border", "0");
	
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

//choose a randonm colour
var prev = null;
$("#randomBtn").on("click", function(){
	var randomNumber;
	var selectedColour;
	

		if(prev==null){
			prev = randomNumber = Math.floor((Math.random()*coloursArray.length));
			
		}else{
			
			do{
				
				randomNumber = Math.floor((Math.random()*coloursArray.length));
				
			}while(prev == randomNumber); //keep getting new random number if its the same as previous
		}
		selectedColour = "#" + coloursArray[randomNumber];
		prev = randomNumber;
		console.log(randomNumber);
	$(selectedColour).click();

});


$(".colourItems").on("click", function(){

              $("#chooserBorder").css({display:"block"});

            


                var position = $(this).position();
                var targetWidth = $(this).css("width");
                var targetHeight = $(this).css("height");
                $("#chooserBorder").animate({left:position.left, width:targetWidth, height:targetHeight}, 300);       
            

});





/*deselect color if clicked anywhere except the colours*/

$(document).click(function(e) {
	if(!$(e.target).hasClass('colourItems') && !$(e.target).is('#goBtn') && !$(e.target).is('#chooserBorder') && !$(e.target).is('#randomBtn') ){
		
	    $(".colourItems").css("border", "0");
	    $("#colourHeading").css("color", "white");
	    currentColour = "choose a colour!" ;
		$("#colourHeading").text(currentColour);

		$("#chooserBorder").animate({left:0, width:0, height:0}, 300).fadeOut(300); 

	}
});



/*add active class to the clicked tab*/


$(".tabs").on("click", function(){

	$(".tabs").siblings().removeClass("activeTab");
	$(this).addClass("activeTab");

	
	if($(this).is("#musicTab")){
	
		console.log("music");
		$("#audioWrapper").show(500);
		$("#videoWrapper").hide(500);

		$("#currentTabTitle").html("Music");

	} else {
		console.log("video");
		$("#audioWrapper").hide(500);
		$("#videoWrapper").show(500);

		$("#currentTabTitle").html("Video");
	}

});

