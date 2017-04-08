
var keys = require("./keys.js"); //Keys for twitter from keys.js

var inputString = process.argv; //Array for commands used in terminal

var command = inputString[2]; //Which command should be executed
var command2 = inputString[3]; //Song or movie name for Spotify/OMDB


if (command == "my-tweets"){

	//Twitter API
	var Twitter = require('twitter');
 
	var client = new Twitter({
  	consumer_key: keys.twitterKeys.consumer_key,
  	consumer_secret: keys.twitterKeys.consumer_secret,
  	access_token_key: keys.twitterKeys.access_token_key,
  	access_token_secret: keys.twitterKeys.access_token_secret
	});
 
	var params = {screen_name: 'nosskyline'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {

  		for (i = 0; i < tweets.length; i++){
  			console.log("Tweet #" + i + " " + tweets[i].text);
  		}
    	
  	}
	});

}

if (command == "spotify-this-song"){

	var spotify = require('spotify');

	spotify.search({ type: 'track', query: command2 }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    else {
 			console.log("Artist: " + data.tracks.items[0].artists[0].name);
 			console.log("Song Name: " + command2);
 			console.log("Preview: " + data.tracks.items[0].preview_url);
 			console.log("Album: " + data.tracks.items[0].album.name);
 		}
});
}

if (command == "movie-this"){

	var request = require('request');
	request('http://www.omdbapi.com/?t=' + command2 + '', function (error, response, body) {

  	var json = JSON.parse(body);

	console.log("Movie Title: ", json.Title);
	console.log("Year: ", json.Year);
	console.log("IMDB Rating: ", json.Ratings[0].Value);
	console.log("Language: ", json.Language);
	console.log("Plot: ", json.Plot);
	console.log("Actors: ", json.Actors);
	console.log("Rotten Tomatoes Rating: ", json.Ratings[1].Value);

});
}

if (command == "do"){

	var fs = require('fs');
 
	fs.readFile('random.txt', 'utf8', function(err, contents) {
		var random = contents;
    	// console.log(contents);

    	contents = contents.split(",");

    	var spotify = require('spotify');

		spotify.search({ type: 'track', query: contents[1] }, function(err, data) {
    	if ( err ) {
        	console.log('Error occurred: ' + err);
        	return;
    	}
    	else {
 			console.log("Artist: " + data.tracks.items[0].artists[0].name);
 			console.log("Song Name: " + contents[1]);
 			console.log("Preview: " + data.tracks.items[0].preview_url);
 			console.log("Album: " + data.tracks.items[0].album.name);
 		}
});
	});
 
	

}