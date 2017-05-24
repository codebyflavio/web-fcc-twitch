var App = (function(){

	var duplicate = [];
	var streamers = [];
	var searchResults = [];
	// var getStreamsLocal = JSON.parse(localStorage.getItem("streams"));
	var getStreamsLocal = ['freecodecamp', 'imaqtpie'];

	function render(status, data){
		if(status === 'online'){
			var online = {
				logo: data.stream.channel.logo,
				displayName: data.stream.channel.display_name,
				viewers: data.stream.viewers,
				game: data.stream.channel.game.toUpperCase(),
				status: data.stream.channel.status,
				followers: data.stream.channel.followers,
				language: data.stream.channel.language.toUpperCase(),
				views: data.stream.channel.views,
				channelUrl: data.stream.channel.url
			};
			var checkUrl = '';
			if(typeof online.channelUrl !== 'undefined'){
				checkUrl = online.channelUrl;
			}
			var checkGame = '';
			if(typeof online.channelGame !== 'undefined'){
				checkGame = online.channelGame;
			}
			var html = 
			'<li class="collection-item avatar row">' +
			'<a href="' + checkUrl + '" target="_blank"><img src="' + online.logo + '" alt="" class="preview col s2"></a>' +
			'<div class="content-row col s5">' +
			'<span id="title">' + online.displayName + '</span>' +
			'<p><b>Viewers: </b>' + online.viewers + '</p>' +
			'<p><b>Game: </b>' + checkGame + '</p>' +
			'<p class="status truncate">' + online.status + '</p>' +
			'</div>' +
			'<div class="content-row second-content col s5">' +
			'<p><b>Followers: </b>' + online.followers + '</p>' +
			'<p><b>Language: </b>' + online.language + '</p>' +
			'<p><b>Views: </b>' + online.views + '</p>' +
			'<a id="close-btn" href="#"><i id="close" class="material-icons">close</i></a>' +
			'<a class="secondary-content"><i class="online material-icons">play_circle_filled</i></a>' +
			'</div>' +
			'</li>';
			$('.collection').append(html);
		}else if(status === 'offline'){
			var offline = {
				logo: data.logo,
				displayName: data.display_name,
				game: data.game ? data.game.toUpperCase() : '',
				status: data.status,
				followers: data.followers,
				language: data.language ? data.language.toUpperCase() : '',
				views: data.views,
				channelUrl: data.url
			};
			var checkUrl = '',
				checkGame = '';
			if(typeof offline.channelUrl !== 'undefined'){
				checkUrl = offline.channelUrl;
			}
			if(typeof offline.channelGame !== 'undefined'){
				checkGame = offline.channelGame;
			}
			var html = 
			'<li class="collection-item avatar row">' +
			'<a href="' + checkUrl + '" target="_blank"><img src="' + offline.logo + '" alt="" class="preview col s2"></a>' +
			'<div class="content-row col s5">' +
			'<span id="title">' + offline.displayName + '</span>' +
			'<p><b>Game: </b>' + checkGame + '</p>' +
			'<p class="status truncate">' + offline.status + '</p>' +
			'</div>' +
			'<div class="content-row second-content col s5">' +
			'<p><b>Followers: </b>' + offline.followers + '</p>' +
			'<p><b>Language: </b>' + offline.language + '</p>' +
			'<p><b>Views: </b>' + offline.views + '</p>' +
			'<a id="close-btn" href="#"><i id="close" class="material-icons">close</i></a>' +
			'<a class="secondary-content"><i class="offline material-icons">play_circle_filled</i></a>' +
			'</div>' +
			'</li>';

			$('.collection').append(html);
		}
		
	}
	function ajaxCall( api, streamer ){
			$.ajax({
				url: 'https://wind-bow.gomix.me/twitch-api/' + api + '/' + streamer + '?callback=?',
	    		dataType: 'jsonp',
	    		type: 'POST',
				success: function( data ){
					if(api === 'streams/'){
						if(data.stream === null){
							return ajaxCall( 'channels', streamer);
						}
						render('online', data);
					}else{
						render('offline', data);
					}
				},
				error: function(){
					console.log( 'Error ', streamer );
				}
			});
		}

	function ajaxSearch( query ){

		function renderSearch( data ){
			duplicate.length = 0;
			for(var key in data.channels){
				var channelName = data.channels[key].display_name;
				//checks if the channel name contains the query
				if(!channelName.toLowerCase().indexOf(query.toLowerCase())){
					duplicate.push(channelName);
					$('.results').empty();
					for(var i = 0; i < duplicate.length; i++){
						$('.results').append('<li><a value="' + duplicate[i] + '" class="search-link">' + duplicate[i] + '</a></li>');
					}
				}
			}
			$('.search-link').on('click', function(){
					var searchValue = $(this)
					.val($(this)
					.text());
					$('#add-stream').val(searchValue[0].innerHTML);
				});
		}

		$.ajax({
			url: 'https://api.twitch.tv/kraken/search/channels?q=' + query,
			dataType: 'jsonp',
			type: 'POST',
			success: function( data ){
				renderSearch( data );
			},
			error: function() {
				alert('Error with ', query);
			}
		});
	}

	function init(){
		//render streams from the streamers array
		$('#add-stream').keyup(function() {
	      alert('Twitch updated the api for this, imagine everything works just fine.');

				// setTimeout( function(){
				// 	ajaxSearch( $('#add-stream').val() );
				// }, 500);
				// $('.results').empty();
		});

		$('#add-stream-label').on('click', function(){
			$('.results').empty();
			var value = $('#add-stream').val().toLowerCase();
			if(value !== ''){
				streamers.push(value);
				localStorage.setItem("streams", JSON.stringify(streamers));
				ajaxCall( 'streams/', value );
				$('.results').empty();
				$('#add-stream').val('');
			}
		});
	

		(function ajax(){
			for(var key in getStreamsLocal){
				streamers.push(getStreamsLocal[key]);
			}
			for(var i = 0; i < getStreamsLocal.length; i++){
	    		ajaxCall( 'streams/', getStreamsLocal[i] );
	    	}
	    	//Delete stream
			$(document).on('click', '#close', function(){
				var current = $(this).closest('li').find('#title')[0].innerHTML.toLowerCase();
				for(var key in streamers){
					if(current === streamers[key]){
					streamers.splice([key], 1);
					localStorage.setItem("streams", JSON.stringify(streamers));
					}
				}
				$(this).closest('li').remove();
			});
			})();
	}
	return{
		start: init
	};
})();

$(document).ready( App.start );
