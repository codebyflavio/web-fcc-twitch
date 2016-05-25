$(document).ready(init);

function init(){
	function ajaxCall(stream){
		var api = 'https://api.twitch.tv/kraken/streams/' + stream + '?callback=?';

		$.ajax({
			url: api,
    		dataType: 'jsonp',
    		type: 'POST',
			success: function(data){
				
				var html =
					'<li class="collection-item avatar row">' +
					'<img src="' + data.stream.channel.logo + '" alt="" class="preview col s2">' +
					'<div class="content-row col s5">' +
					'<span id="title">' + data.stream.channel.display_name + '</span>' +
					'<p><b>Viwers: </b>' + data.stream.viewers + '</p>' +
					'<p><b>Game: </b>' + data.stream.channel.game.toUpperCase() + '</p>' +
					'<p class="status truncate">' + data.stream.channel.status + '</p>' +
					'</div>' +
					'<div class="content-row second-content col s5">' +
					'<p><b>Followers: </b>' + data.stream.channel.followers + '</p>' +
					'<p><b>Language: </b>' + data.stream.channel.language.toUpperCase() + '</p>' +
					'<p><b>Views: </b>' + data.stream.channel.views + '</p>' +
					'<a href="#!" class="secondary-content"><i class="online material-icons">play_circle_filled</i></a>' +
					'</div>' +
					'</li>';
					console.log(stream);

					$('.collection').append(html);
					console.log(data);				 
			},
			error: function(){
				alert('Error');
			}
		});
	}

$.getJSON('https://api.twitch.tv/kraken/streams/summit1g?callback=?', function(data) {
  console.log(data);
});
    var streams = ['summit1g', 'tsm_dyrus', 'flosd', 'wingsofdeath'];
    for(var key in streams){
    	ajaxCall(streams[key]);
    }
	
}