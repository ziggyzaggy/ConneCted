var currentColour = "choose a colour!";
var coloursArray = new Array();
coloursArray[0] = "grayColour";
coloursArray[1] = "blackColour";
coloursArray[2] = "blueColour";
coloursArray[3] = "greenColour";
coloursArray[4] = "yellowColour";
coloursArray[5] = "pinkColour";
coloursArray[6] = "redColour";

var videoGenres = {};
videoGenres['grayColour'] = 'jazz music';
videoGenres['blackColour'] = 'folk music';
videoGenres['blueColour'] = 'disco music';
videoGenres['greenColour'] = 'pop music';
videoGenres['yellowColour'] = 'dance music';
videoGenres['pinkColour'] = 'folk music';
videoGenres['redColour'] = 'dubstep music';


/*change background after certain amount of time*/
var currentBackground = 0;
var backgrounds = [];
backgrounds[0] = './img/bg.jpg';
backgrounds[1] = './img/bg2.jpg';
backgrounds[2] = './img/bg3.jpg';

function changeBackground() {
	currentBackground++;
	if (currentBackground > backgrounds.length - 1) currentBackground = 0;

	$('.bgContainer').css('opacity', 0);

	setTimeout(function() {
		$('.bgContainer').attr('src', backgrounds[currentBackground]);
		$('.bgContainer').css('opacity', 1);
	}, 1500);


	setTimeout(changeBackground, 60000);
}

$(document).ready(function() {
	//kick off background change in 60 seconds after the page loads
	setTimeout(changeBackground, 60000);


	//check if browser is webkit based
	var isWebkit = 'WebkitAppearance' in document.documentElement.style
	if (!isWebkit) {
		$("#alert").css("display", "block");
	}
});



/*onclick of a color item, choose it*/
/*change src of heading*/
$(".colourItems").on("click", function(e) {

	$(".colourItems").css("border", "0");


	currentColour = this.id;
	colourString = currentColour.substring(0, currentColour.length - 6);


	$("#colourHeading").attr("src", "./img/colors/" + currentColour + ".png");
	if (colourString == "black" || colourString == "blue" || colourString == "green" || colourString == "red") {
		$("#colourHeadingWrapper").css("background-color", "rgba(255,255,255,0.7)")
	} else {
		$("#colourHeadingWrapper").css("background-color", "rgba(0,0,0,0.7)")
	}

});



$("#goBtn").on("click", function() {
	if (currentColour == "choose a colour!") {
		alert("i can't do anything if you haven't chosen a colour! no wait, i can punish you with this...");
		window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
	} else {
		//alert(currentColour + " yeah, that's all this button does right now, returning the id of the colour selected");
		searchVideo(videoGenres[currentColour]);
		console.log("asd");
	}
});


//choose a randonm colour
var prev = null;
$("#randomBtn").on("click", function() {
	var randomNumber;
	var selectedColour;


	if (prev == null) {
		prev = randomNumber = Math.floor((Math.random() * coloursArray.length));

	} else {

		do {

			randomNumber = Math.floor((Math.random() * coloursArray.length));

		} while (prev == randomNumber); //keep getting new random number if its the same as previous
	}
	selectedColour = "#" + coloursArray[randomNumber];
	prev = randomNumber;
	console.log(randomNumber);
	$(selectedColour).click();

});


$(".colourItems").on("click", function() {

	$("#chooserBorder").css({
		display: "block"
	});

	var position = $(this).position();
	var targetWidth = $(this).css("width");
	var targetHeight = $(this).css("height");
	$("#chooserBorder").animate({
		left: position.left,
		width: targetWidth,
		height: targetHeight
	}, 300);


});



/*deselect color if clicked anywhere except the colours*/

$(document).click(function(e) {
	if (!$(e.target).hasClass('colourItems') && !$(e.target).is('#goBtn') && !$(e.target).is('#chooserBorder') && !$(e.target).is('#randomBtn')) {

		$(".colourItems").css("border", "0");

		currentColour = "choose a colour!";
		$("#colourHeading").attr("src", "./img/colors/choose.png")

		$("#chooserBorder").animate({
			left: 0,
			width: 0,
			height: 0
		}, 300).fadeOut(300);

	}
});



/*add active class to the clicked tab*/


$(".tabs").on("click", function() {

	$(".tabs").siblings().removeClass("activeTab");
	$(this).addClass("activeTab");


	if ($(this).is("#musicTab")) {

		$("#audioWrapper").show(500);
		$("#videoWrapper").hide(500);
		$("#goBtn").css("display", "none");
		$("#goMusic").css("display", "block");		
		$("#currentTabTitle").html("Music");

	} else {
		$("#audioWrapper").hide(500);
		$("#videoWrapper").show(500);
		$("#goMusic").css("display", "none");
		$("#goBtn").css("display", "block");
		$("#currentTabTitle").html("Video");
	}

});