var nextPageToken = undefined;
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
	requestUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&key=AIzaSyAsmDFjbvQQe8TktvikOwLzyn56gD9SOlQ&q="+q+nextPageToken;
	$.ajax({
		type: "GET",
		dataType: 'jsonp',
		url: requestUrl,
		success: function(data) {
			nextPageToken = "&pageToken="+data.nextPageToken;
			postVideos(data.items);
		}
	});
}