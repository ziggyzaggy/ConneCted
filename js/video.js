var nextPageToken = "";
var accessToken = "AIzaSyC4ai2cX-VOhGZXI_I6Hs19YkyY60_r6Yg";
var q;


function postVideos(data){
	$("#videoWrapper").empty();
	$.each(data, function(index,value){
		var videoUrl = "http://www.youtube.com/embed/"+data[index].id.videoId;
		var iframe = "<iframe type=\"text/html\" width=\"560\" height=\"315\" frameborder=\"0\" src=\""+videoUrl+"\"></iframe>";
		$("#videoWrapper").append(iframe);		
	});
}


function searchVideo(q) {
	q = q;
	requestUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&key="+accessToken+"&q="+q+nextPageToken;
	$.ajax({
		type: "GET",
		dataType: 'json',
		url: requestUrl,
		success: function(data) {
			console.log(data);
			nextPageToken = "&pageToken="+data.nextPageToken;
			postVideos(data.items);
		}
	});
}