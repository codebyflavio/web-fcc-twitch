$(document).ready(init);

function init(){

	var stream = {
		// online: {
		// 	api: 'https://api.twitch.tv/kraken/channel/' + stream + '?callback=?',
		// 	logo: data.stream.channel.logo,
		// 	displayName: data.stream.channel.display_name,
		// 	viewers: data.stream.viewers,
		// 	game: data.stream.channel.game.toUpperCase(),
		// 	status: data.stream.channel.status,
		// 	followers: data.stream.channel.followers,
		// 	language: data.stream.channel.language.toUpperCase(),
		// 	views: data.stream.channel.views,
		// 	channelUrl: data.stream.channel.url,
		// },
		streamers: ['freecodecamp', 'summit1g', 'tsm_dyrus', 'flosd', 'wingsofdeath']
	};

	function ajaxCall(stream){
		var api = 'https://api.twitch.tv/kraken/streams/' + stream + '?callback=?';

		$.ajax({
			url: api,
    		dataType: 'jsonp',
    		type: 'POST',
			success: function(data){
				console.log(data);
				

				// if(!data.stream){
				// 	return false;
				// }else{
				// 	var html = 
				// 	'<li class="collection-item avatar row">' +
				// 	'<img src="' + logo + '" alt="" class="preview col s2">' +
				// 	'<div class="content-row col s5">' +
				// 	'<span id="title">' + displayName + '</span>' +
				// 	'<p><b>Viwers: </b>' + viewers + '</p>' +
				// 	'<p><b>Game: </b>' + game + '</p>' +
				// 	'<p class="status truncate">' + status + '</p>' +
				// 	'</div>' +
				// 	'<div class="content-row second-content col s5">' +
				// 	'<p><b>Followers: </b>' + followers + '</p>' +
				// 	'<p><b>Language: </b>' + language + '</p>' +
				// 	'<p><b>Views: </b>' + views + '</p>' +
				// 	'<a href="' + channelUrl + '" class="secondary-content"><i class="online material-icons">play_circle_filled</i></a>' +
				// 	'</div>' +
				// 	'</li>'
				// }
				// $('.collection').append(html);
				// return true;
			},
			error: function(){
				alert('Error');
			}
		});
	}
console.log(stream.streamers);
$.getJSON('https://api.twitch.tv/kraken/streams/summit1g?callback=?', function(data) {
  console.log(data);
});

    for(var key in stream.streamers){
    	ajaxCall(stream.streamers[key]);
    }
	
}