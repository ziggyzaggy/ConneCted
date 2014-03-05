
//initialise the audio and get source

var audio = new Audio();
audio.src='track.mp3';
audio.controls = true;
audio.loop = false;
audio.autoplay = false;

var fbc_array, analyser, ctx, canvas, context, source;
var player;

window.addEventListener("load", initPlayer, false);

function initPlayer(){
	$("#player").append(audio);
	player = $("#player");
	context = new webkitAudioContext();
	analyser = context.createAnalyser();
	canvas = document.getElementById("vis");;
	ctx = canvas.getContext("2d");

	source = context.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(context.destination);
	letsDraw();





}


//render the visualisation on the canvas
function letsDraw(){
	window.requestAnimationFrame(letsDraw);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	bars =  150;
	for(var i = 0; i < analyser.frequencyBinCount; i++){
		/*if(i == 25){
			ctx.fillStyle = "#000";
		}
		if(i == 41){
			ctx.fillStyle = "#002899";
		}
		if(i == 61){
			ctx.fillStyle = "#006B03";
		}
		if(i == 81){
			ctx.fillStyle = "#C9BF00";
		}
		if(i == 101){
			ctx.fillStyle = "#C01AA8";
		}
		if(i == 125){
			ctx.fillStyle = "#AF0205";
		}*/
		/*rainbowy colours*/
		/*var hue = i/analyser.frequencyBinCount * 3000;
  		ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';*/

  		

  		/*fill the canvas*/
		x = i *2;
		barWidth = 1;
		barHeight = -(fbc_array[i]/1.8);

		//colours react to the  frequency loudness
		hue = parseInt(500 * (1 - (barHeight / 200)), 10);
        ctx.fillStyle = 'hsl(' + hue + ',75%,50%)';

		ctx.fillRect(x, canvas.height, barWidth, barHeight);
		
	}

}


/*show/hide palette and visualiser on play/pause*/
	audio.addEventListener("play", function () {
		$("#vis").fadeIn(1000);
		$("#fscr").fadeIn(1000);

		$("#colorPalette").animate({opacity:0}, 1000);
}, false);
	audio.addEventListener("pause", function () {
		if(!document.webkitFullscreenElement){

			$("#vis").fadeOut(1000);
			$("#fscr").fadeOut(1000);
			$("#colorPalette").animate({opacity:1}, 1000);
	
		}	
    	
}, false);


/*go fullscreen*/


$("#fscr").on("click", function(){


	var canv = document.getElementById("vis");
	if(canv.requestFullScreen)
        canv.requestFullScreen();
    else if(canv.webkitRequestFullScreen)
        canv.webkitRequestFullScreen();
    else if(canv.mozRequestFullScreen)
        canv.mozRequestFullScreen();
   
 
    
});


/*listen to escape key, stop the music if in fullscreen and audio is paused(preventes breaking the app if user pauses the audio in fullcsreen mode)*/
$(document).keyup(function(e) {
  
  if (e.keyCode == 27) { 
  	$("#fullscreenTip").css("display", "none");//remove tip if escape is pressed
  		if(audio.paused){

			$("#vis").fadeOut(1000);
			$("#fscr").fadeOut(1000);
			$("#colorPalette").animate({opacity:1}, 1000);

	}
  } 
});


/*display info on how to exit full screen*/
$(window).on("click", function(){
	if(document.webkitFullscreenElement){
		$("#fullscreenTip").fadeIn(500).delay(2000).fadeOut(1000);
	}
});
