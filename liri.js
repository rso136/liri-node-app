//var client = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

var key = require('./keys.js');

var client = new Twitter(key.twitterKeys);

var action = process.argv[2];
var value = process.argv[3];


if (action == 'movie-this') {
	movie();
}

if (action == 'my-tweets') {
	twitter();
}

if (action == 'spotify-this-song') {
	spot();
}

if (action == 'do-what-it-says') {
	dosays();
}

function movie() {

	if (!value) {
		value = 'Mr. Nobody';
	}
	
	var queryUrl = 'http://www.omdbapi.com/?t=' + value +'&y=&plot=short&tomatoes=true&r=json';

	request(queryUrl, function(error, response, body) {

		if(!error && response.statusCode == 200) {

			console.log("Title: " + JSON.parse(body)["Title"])
			console.log("Year: " + JSON.parse(body)["Year"])
			console.log("IMDB RatingL " + JSON.parse(body)["imdbRating"])
			console.log("Country: " + JSON.parse(body)["Country"])
			console.log("Language: " + JSON.parse(body)["Language"])
			console.log("Plot: " + JSON.parse(body)["Plot"])
			console.log("Actors: " + JSON.parse(body)["Actors"])
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"])

		}
	})
}

function twitter() {

	var params = {screen_name: 'riffoboy',
				  count: '20'
	};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {

		if (!error && response.statusCode == 200) {

			for (var i = 0; i < tweets.length; i++) {
				console.log("---------------------------------------------------------")
				console.log("Created at: " + tweets[i].created_at)
				console.log("Tweet: " + tweets[i].text)
				console.log("---------------------------------------------------------")
			}
		}
	})
}

function spot() {

	if (!value) {
		value = "what's my age again";
	}

	spotify.search({ type: 'track', query: value }, function(error, data) {
    	
    	if (!error) {
	
			console.log("Album Name: " + data.tracks.items[0].album.name);
    		console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
    		console.log("Track Name: " + data.tracks.items[0].name)
    		console.log("Preview URL: " + data.tracks.items[0].preview_url);

		}
 
	})

}

function dosays() {
	fs.readFile("random.txt", 'utf8', function(error, data) {

		dataArr = data.split(',');

		action = dataArr[0];
		value = dataArr[1];

		if (action == 'movie-this') {
			movie();
		}

		if (action == 'my-tweets') {
			twitter();
		}

		if (action == 'spotify-this-song') {
			spot();
		}
	})
}