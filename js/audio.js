//retrieve, play and visualise sound


//lets start by declaring some variables
var audio;
var fbc_array, analyser, ctx, canvas, context, source, animateId;
var player;
var trackName;

window.addEventListener("load", initPlayer, false); //once the page is loaded call initPlayer

function initPlayer(){
	context = new AudioContext(); //create an AudioContextNode
    analyser = context.createAnalyser(); //create analyserNode
    analyser.connect(context.destination); //connect analyser to output(speakers, headphones)

    //if anyone is going to wonder what the hell is happening up there..
    //web audio api works in a way that it connects "nodes" to eachother to do some cool stuff with audio
    //in this instance we connect an audio to the analyser,
    // it will look at the audio that is playing and return arrays with a bunch of numbers, 
    //these will be used to calculate the height of a frequency bar to be drawn on the visualiser,
    //analyser is then connected to the output to actually play the sound

    analyser.smoothingTimeConstant = 0.9; //smoothen equaliser animation
	canvas = document.getElementById("vis");
	ctx = canvas.getContext("2d"); //get canvas context
	


}


//a collection of what each colour represents in terms of music genres
var genreArray = new Array();
	genreArray["gray"] = "blues";
	genreArray["black"] = "metal";
	genreArray["blue"] = "chillstep";
	genreArray["green"] = "reggae";
	genreArray["yellow"] = "techno";
	genreArray["pink"] = "pop";
	genreArray["red"] = "house";


$("#goMusic").on("click", function(){
	if(currentColour == "choose a colour!"){
		alert("i can't do anything if you haven't chosen a colour! no wait, i can punish you with this...");
		window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
	}else{
		getGenre(genreArray[colourString]);// call method and pass the correct genre by referencing the genreArray
	}
});


/*get songs of a genre*/
/*display them*/
/*analyse them*/
/*and do a bunch of other cool stuff*/
/*all the magic is happening in here*/
var client = "?client_id=ddddea95338821004a98791d999c1118"; //app id for soundcloud
function getGenre(genre){

$(".loading").show().text("Please wait while we are fetching the best sounds right now....");

$.getJSON("https://api.soundcloud.com/tracks?callback=?", //jquery getJson method, the standard
  {
    consumer_key: 'ddddea95338821004a98791d999c1118',
    format: "json",
    genres: genre
  },
  function(data) { //get the response and do something with it
    
    var audioFiles = []; //array that will hold audio sources
    var titles = []; //array that will hold audio titles
    var pic = []; //array to hold artworks

    for(var i = 0; i<=4; i++){ //loop 5 times to get 5 songs and titles
    	console.log("data from SoundCloud!", data[random]);//debug, remove before submission
    	console.log(random);
    	
    	var random = Math.floor(Math.random() * 49 ); //get a random number 0-49 (soundcloud returns 50 tracks per request)
    	console.log("data from SoundCloud! artwork", data[random].artwork_url);
    	pic.push(data[random].artwork_url);
    	audioFiles.push([data[random].stream_url + client]); //push a source to the array
    	titles.push([data[random].title]); //push a title to the titles array
    }
    
    $("#audioWrapper").html(""); //clear the wrapper for new request

    sources = []; //an array where we store all the created elementmediasources in.
    for (var x in audioFiles) { //go through all the audio sources
    	$("#audioWrapper").append("<img style='float:left;' src='"+pic[x] +"'alt='artwork'</img> <ul class='titles'><li>"+ titles[x] +"</li></ul>"); //append title to the wrapper

    	

        var elem = document.createElement('audio'); //create audio element from a audio source
        elem.src = audioFiles[x]; // append the specific source to it.
        elem.setAttribute('controls', ''); //we set the controls option, so you have the play/pause etc buttons enabled
        elem.setAttribute("alt", titles[x]); //set alt attribute of the element to later use for displaying
        $(elem).addClass("muzz"); // add a classname to the elements
        $("#audioWrapper").append(elem); //add element to the wrapper
        sources[x] = context.createMediaElementSource(elem); //we create a mediasource for the element (needed for visualisation)
        sources[x].connect(analyser); //we connect that to the analyser

    	var checkSource = audioFiles[x].toString().substring(0, 9); //convert source name to strings and slice it
    	if(audioFiles[x].toString().substring(0, 9) == "undefined"){ //check that the source isn't undefined, if it is then remove the audio element and present an error
    		$("#audioWrapper").append("<ul class='errorSource'><li>Oops, looks like Soundcloud won't let us have this track (track not streamable), sorry about that</li></ul>");
    		elem.remove();
    	}

        
        
        
		

		

        $(elem).get(0).addEventListener("loadeddata", function(){//start tracks and pause once tracks are loaded to force chrome to buffer the tracks
    		this.play();
    		this.pause();

    		setTimeout(function(){//set a delay to allow all music to play through and force buffering
				$("#audioWrapper").show(1000); //show wrapper when loading done
				$(".loading").text("done! play something").animate({opacity: "0.0"}, 6000);//show a cool looking message to inform users
				$(document).click();//remove the chooserborder by clicking anywhere on body
    		}, 1000);
    		
		});

		$(elem).get(0).addEventListener("play", function(){ //bind play event listener to each track
			
			$(".muzz").not(this).each(function(){ //go through all other tracks
					$(this).get(0).pause(); //pause all tracks except this one(prevent users from running 2 tracks, while it wouldn't break  the app, it would break the display of titles)
			});
			
			trackName = $(this).attr("alt");//get the alt attribute of currently playing track and set it as trackName
			setTrackTip(trackName); //call the method that sets the track tips
			letsDraw(); //call the animation
			
		});

		$(elem).get(0).addEventListener("pause", function(){ //bind pause event listener to each track
			
			 setTimeout(function(){window.cancelAnimationFrame(animateId);}, 2000);//kill the animation after a few seconds to let the visual bars "fall" instead of freezing in their position
		});

		
		
		

    }
    //show visualiser
        $("#vis").fadeIn(1000);
		$("#fscr").fadeIn(1000);
		$("#colorPalette").animate({opacity:0}, 1000);

  });

	
}




function setTrackTip(trackName){//seet the name of the song in fullscreen
	$("#trackTip").text("Current: " + trackName );
}


//render the visualisation on the canvas
function letsDraw(){
	console.log("draw called");//debug, remove before submission
	animateId = window.requestAnimationFrame(letsDraw); //give the anu=imation frame an id to terminate it later
	fbc_array = new Uint8Array(analyser.frequencyBinCount); //array to store frequency
	analyser.getByteFrequencyData(fbc_array); //get frequency from the analyser node
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle="white";
	ctx.font = "bold 13px Arial";
	
	ctx.fillText(trackName, 0, 10);
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







/*listen to keyboard, remove tip if escape*/
$(document).keyup(function(e) {

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


