
//initialise the audio and get source

/*var audio = new Audio();
audio.src='track.mp3'; //supply the source of sound here
audio.controls = true;
audio.loop = false;
audio.autoplay = false;*/

var audio;
var fbc_array, analyser, ctx, canvas, context, source, animateId;
var player;

window.addEventListener("load", initPlayer, false);

function initPlayer(){

	
	/*audio.src="1.mp3"; 
	audio.controls = true;
	audio.loop = false;
	audio.autoplay = false;
	audio.className = "muzz";


	$("#player").append(audio);
	player = $("#player");
	/*context = new AudioContext();
	analyser = context.createAnalyser();
	source = context.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(context.destination);*/
	context = new AudioContext();
	canvas = document.getElementById("vis");
	ctx = canvas.getContext("2d");
	//letsDraw();


}


var trackName;
//get the source of clicked track
 $(".muzz").on("play", function(){
 	trackName = $(this).attr("src");
 
 	console.log("got a source: ", trackName);
 	$(".muzz").not(this).each(function(){
 		$(this).get(0).pause();
 		this.currentTime = 0;


 	});
 	
 
audio = null;


 	

 		console.log("audio null");
 		
 		audio = event.target;

 		console.log(event.target);
 		analyser = context.createAnalyser();
 		try{

	 		if(source!=null){
	 			console.log("src not null");
	 			
				source = context.createMediaElementSource(audio);

			}else{
				console.log("src null");
				source = context.createMediaElementSource(audio);
			}
		}catch(err){
			console.log(err);
		}
		source.connect(analyser);
		analyser.connect(context.destination); 
	
 
 
			$("#vis").fadeIn(1000);
			$("#fscr").fadeIn(1000);
			console.log("play");
			$("#colorPalette").animate({opacity:0}, 1000);


		
		letsDraw();
		setTrackTip(trackName);



});

  $(".muzz").on("pause", function(){
  			if(!document.webkitFullscreenElement){

			$("#vis").fadeOut(1000);
			$("#fscr").fadeOut(1000);
			$("#colorPalette").animate({opacity:1}, 1000);
	
		}	
				
	 window.cancelAnimationFrame(animateId);	//stop animation from looping		
				
});

function setTrackTip(trackName){
	$("#trackTip").text("Current: " + trackName );
}


//render the visualisation on the canvas
function letsDraw(){
	console.log("draw called");
	animateId = window.requestAnimationFrame(letsDraw);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array); //get frequency from the analyser node
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle="white";
	ctx.font = "bold 12px Arial";
	
	ctx.fillText("currently playing:" + trackName, 10, 10);
	bars =  150;
	for(var i = 0; i < analyser.frequencyBinCount; i++){
	

  		/*fill the canvas*/
		x = i *2;
		barWidth = 1;
		barHeight = -(fbc_array[i]/1.8); //calculate height of the bar depending on the loudness of frequency

		//colours react to the  frequency loudness
		hue = parseInt(500 * (1 - (barHeight / 200)), 10); //set hue depending on the height of bar(loudness of frequency)
        ctx.fillStyle = 'hsl(' + hue + ',75%,50%)';

		ctx.fillRect(x, canvas.height, barWidth, barHeight);
		
	}

}




/*show/hide palette and visualiser on play/pause*/
	/*$(".muzz").on("click", function () {
		if(!this.paused){
			$("#vis").fadeIn(1000);
			$("#fscr").fadeIn(1000);
			console.log("play");
			$("#colorPalette").animate({opacity:0}, 1000);
		}else{
			if(!document.webkitFullscreenElement){

				$("#vis").fadeOut(1000);
				$("#fscr").fadeOut(1000);
				$("#colorPalette").animate({opacity:1}, 1000);
	
			}
		}
});*/
	/*audio.addEventListener("play", function () {
		

			$("#vis").fadeIn(1000);
			$("#fscr").fadeIn(1000);
			console.log("play");
			$("#colorPalette").animate({opacity:0}, 1000);
	
		});

	audio.addEventListener("pause", function () {
		if(!document.webkitFullscreenElement){

			$("#vis").fadeOut(1000);
			$("#fscr").fadeOut(1000);
			$("#colorPalette").animate({opacity:1}, 1000);
	
		}	
    	
}, false);*/


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







/*listen to keyboard, pause on spacebar if in fullscreen, remove tip if escape*/
$(document).keyup(function(e) {
  	if(e.keyCode == 32 && document.webkitFullscreenElement){
  		if(audio.paused){
				audio.play();
			}else{
				audio.pause();
			}
  	}

	if (e.keyCode == 27) { 
	  	$("#fullscreenTip").css("display", "none");//remove tip if escape is pressed
	 
	} 
});


/*display info on how to exit full screen*/
$(window).on("click", function(){
	if(document.webkitFullscreenElement){
		if (!$("#fullscreenTip").is(':animated')){
			$("#fullscreenTip").dequeue().stop().fadeIn(500).delay(2000).fadeOut(500); //dequeue animation if is already animating
		}



	}
});

//pause audio if clicked in fullscreen mode
/*$(window).click(function(e){

	if(!$(e.target).is('#fscr')){ //prevent pausing when clicking on go fullscreen button

		if(document.webkitFullscreenElement){
			if(audio.paused){
				audio.play();
			}else{
				audio.pause();
			}
		}
	}
});*/



//exit fullscreen on double click
$("#vis").dblclick(function() {

	
	if(document.webkitFullscreenElement){ //exit if in fullscreen
	$("#fullscreenTip").css("display", "none");//remove tip when exiting full screen mode
	$("#fullscreenTip").clearQueue(); //clear the animation queue to stop the tip from appearing after a double click
		  if(document.exitFullscreen) {
		    document.exitFullscreen();
		  } else if(document.mozCancelFullScreen) {
		    document.mozCancelFullScreen();
		  } else if(document.webkitExitFullscreen) {
		    document.webkitExitFullscreen();
		  }
	}else{	//enter fullscreen on double click of the visualiser if not in fullscreen

		var canv = document.getElementById("vis");
		if(canv.requestFullScreen)
	        canv.requestFullScreen();
	    else if(canv.webkitRequestFullScreen)
	        canv.webkitRequestFullScreen();
	    else if(canv.mozRequestFullScreen)
	        canv.mozRequestFullScreen();
   

	}

	
});


