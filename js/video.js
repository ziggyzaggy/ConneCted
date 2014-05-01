var nextPageToken = "";
var accessToken = "AIzaSyC4ai2cX-VOhGZXI_I6Hs19YkyY60_r6Yg";

//Function to add videos to the wrapper
function postVideos(data) {
	$("#videoWrapper").empty(); //Empty the wrapper before adding the videos
	$.each(data, function(index, value) {
		var videoUrl = "http://www.youtube.com/embed/" + data[index].id.videoId;
		var iframe = "<iframe type=\"text/html\" width=\"560\" height=\"315\" frameborder=\"0\" src=\"" + videoUrl + "\"></iframe>";
		$("#videoWrapper").append(iframe);
	});
}


//Call to the function api that retrieves the IDs of the videos
function searchVideo(q) {
	var googleApi = "https://www.googleapis.com/youtube/v3/search";

	$.getJSON(googleApi, {
		part: "snippet",
		type: "video",
		order: "viewCount",
		videoEmbeddable: "true",
		key: accessToken,
		pageToken: nextPageToken,
		q: q
	})
		.done(function(data) {
			postVideos(data.items);
			nextPageToken = data.nextPageToken;
		});
}