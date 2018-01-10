//Requires and initializing variables
	var Twitter = require('twitter');
	var Spotify = require('node-spotify-api');
	var request = require('request');
	var fs = require("fs");
	var inquirer = require('inquirer');
	var moment = require('moment');
	var keys = require('./keys.js');



//Twitter
	function runTwitter(argument) {
		var client = new Twitter(keys);
		var params = {screen_name: 'nodejs'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	for ( i = 0; i < Math.min(tweets.length, 20); i++ ) {
		  		//for simplicity's sake:
		  		var j = i + 1;
		  		console.log("Tweet #"+j+": "+ tweets[i].text);
		  		fs.appendFile( "log.txt", "\nTweet #"+j+": "+ JSON.stringify(tweets[i].text, null, 2), function(err) {

				  // If an error was experienced we say it.
				  if (err) {
				    console.log(err);
				  }
			  	});
		  	}
		  } else {
		  	console.log(error);
	  		fs.appendFile( "log.txt", "\n"+ JSON.stringify(error, null, 2), function(err) {
			  // If an error was experienced we say it.
			  if (err) {
			    console.log(err);
			  }
		  	});
		  }


			
		});


	}
	
//Spotify
	function runSpotify(song) {
		var spotify = new Spotify({
		  id: "00d5ca4dbe7e4cb9aa5dd5e96596e2fe",
		  secret: "ced912cc0892460381228f272e7584a8"
		});

		
		  if(!song) {
		  //    * If no song is provided then your program will default to "The Sign" by Ace of Base.
		  	song = "The Sign by Ace of Base";
		  }
		 
		spotify.search({ type: 'track', query: song }, function(error, data) {
			//Error
			  if (error) {
			    return console.log('Error occurred: ' + error);
			    fs.appendFile( "log.txt", "\n"+ JSON.stringify(error, null, 2), function(err) {
				  // If an error was experienced we say it.
				  if (err) {
				    console.log(err);
				  }
			  	});
			  }
		  	//Song Name

			//Artists, Link, album, song name

				function fullSong() {
					this.name = "";
					this.artists = "";
					this.link = "";
					this.album = "";
					this.feed = function(){
					};
				}
				console.log("____________________________");
				var songs = [];
				for (var i = 0; i < data.tracks.items.length; i++) {
					// Set
						songs[i] = new fullSong();
						songs[i].name = data.tracks.items[i].name;
						songs[i].artists = data.tracks.items[i].album.artists[0].name;
						songs[i].album = data.tracks.items[i].album.name;
						songs[i].link = data.tracks.items[i].external_urls.spotify;
					//Console Log
					console.log("'"+songs[i].name+"' by "+songs[i].artists+" in the album '"+songs[i].album+"': "+songs[i].link);
					fs.appendFile( "log.txt", "\n'"+songs[i].name+"' by "+songs[i].artists+" in the album '"+songs[i].album+"': "+songs[i].link, function(err) {

					  // If an error was experienced we say it.
					  if (err) {
					    console.log(err);
					    fs.appendFile( "log.txt", "\n"+ JSON.stringify(err, null, 2), function(err) {
						  // If an error was experienced we say it.
						  if (err) {
						    console.log(err);
						  }
					  	});
					  }
					});
				}
				console.log("____________________________");

		});
	}
	
//Movies
	function runMovies(movie) {

		  if(!movie) {
		  //  If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
		  	movie = "Mr. Nobody";
		  }

		request('https://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
		  if (error) {
		    return console.log(error);
		    fs.appendFile( "log.txt", "\n"+ JSON.stringify(error, null, 2), function(err) {
			  // If an error was experienced we say it.
			  if (err) {
			    console.log(err);
			  }
		  	});
		  }
		  var data = JSON.parse(body);
		  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		  console.log("Title: " + data.Title);
		  console.log("IMDB Rating: " + data.Ratings[0].Value);
		  console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
		  console.log("Country produced: " + data.Country);
		  console.log("Language: " + data.Language);
		  console.log("Plot: " + data.Plot);
		  console.log("Actors: " + data.Actors);

		  //File appending
		  fs.appendFile( "log.txt", "\nTitle: " + data.Title +"\nIMDB Rating: " + data.Ratings[0].Value +"\nRotten Tomatoes Rating: " + data.Ratings[1].Value +"\nCountry produced: " + data.Country +"\nLanguage: " + data.Language +"\nPlot: " + data.Plot +"\nActors: " + data.Actors, function(error) {

			  // If an error was experienced we say it.
			  if (error) {
			    console.log(error);
			    fs.appendFile( "log.txt", "\n"+ JSON.stringify(error, null, 2), function(err) {
				  // If an error was experienced we say it.
				  if (err) {
				    console.log(err);
				  }
			  	});
			  }
			});

	     // * Title of the movie.
	     //     * Year the movie came out.
	     //     * IMDB Rating of the movie.
	     //     * Rotten Tomatoes Rating of the movie.
	     //     * Country where the movie was produced.
	     //     * Language of the movie.
	     //     * Plot of the movie.
	     //     * Actors in the movie.
	     //   ```

	     // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
	       
	     //   * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
	       
	     //   * It's on Netflix!
	     
	     // * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.



		});
	}

//Set Alarm
	function runAlarm(time) {
			setTimeout(function() {
				console.log("It has been "+time+" seconds.");
				fs.appendFile( "log.txt", "\nIt has been "+ time +" seconds.", null, 2), function(err) {
				  // If an error was experienced we say it.
				  if (err) {
				    console.log(err);
				  }
			  	};
			}, time * 100);
	}

//Current Time
	function runTime() {
		console.log("Today is "+ moment().format('MMMM Do YYYY, [and the current time is ] h:mm a'));
		fs.appendFile( "log.txt", "\nToday is "+ JSON.stringify(moment().format('MMMM Do YYYY, [and the current time is ] h:mm a'), null, 2), function(err) {
		  // If an error was experienced we say it.
		  if (err) {
		    console.log(err);
		  }
	  	});
	}
//Do What it says
	function doWhat() {
		//Update action and value based on random.txt
		//random.txt has one option, random2.txt has multiple
		fs.readFile("random2.txt", "utf8", function(error, data) {

		  // If the code experiences any errors it will log the error to the console.
		  if (error) {
		    return console.log(error);
		    fs.appendFile( "log.txt", "\n"+ JSON.stringify(error, null, 2), function(err) {
			  // If an error was experienced we say it.
			  if (err) {
			    console.log(err);
			  }
		  	});
		  }
		  //For doing a random action
		  var allOptions = data.split("\n");

		  // We will then print the contents of data
		  var randomChoice = allOptions[Math.floor( Math.random() * allOptions.length)];
		  console.log(randomChoice);
		  fs.appendFile( "log.txt", "\n" + randomChoice, function(error) {

			  // If an error was experienced we say it.
			  if (error) {
			    console.log(error);
			  }
		  });
		  //choose a random
		  var dataArr = randomChoice.split(",");
		  choose(dataArr[0], dataArr[1]);
		});
	}

//Organizer
	//inquirer version
		var choices = ["Get some tweets.","Find this song on Spotify.","Find this movie in OMDB.","Do whatever, I don't care.","Get the current time.", "Set an alarm in seconds"];
		function action() {
		  inquirer
		    .prompt([
		      // Here we create a basic text prompt.
		            // Here we give the user a list to choose from.
		      {
		        type: "checkbox",
		        message: "Action:",
		        choices: choices,
		        name: "action"
		      },
		      {
		        type: "input",
		        message: "Additional input:",
		        name: "value",
		        default: ""
		      },
		      {
		      	type: "confirm",
		      	message: "Are you sure?",
		      	name: "confirm"
		      }
		    ])
		    .then(function(inquirerResponse) {
		    	fs.appendFile( "log.txt", "\nAction(s): "+inquirerResponse.action+", Additional input: "+inquirerResponse.value, function(error) {

				  // If an error was experienced we say it.
				  if (error) {
				    console.log(error);
				    fs.appendFile( "log.txt", "\n"+ JSON.stringify(error, null, 2), function(err) {
					  // If an error was experienced we say it.
					  if (err) {
					    console.log(err);
					  }
				  	});
				  }
				});
		    	if(inquirerResponse.confirm) {
		    		if(inquirerResponse.action.indexOf(choices[0]) != -1) {
			    		runTwitter(inquirerResponse.value);
			    	}
			    	if(inquirerResponse.action.indexOf(choices[1]) != -1) {
			    		runSpotify(inquirerResponse.value);
			    	}
			    	if(inquirerResponse.action.indexOf(choices[2]) != -1) {
			    		runMovies(inquirerResponse.value);
			    	}
			    	if(inquirerResponse.action.indexOf(choices[3]) != -1) {
			    		doWhat();
			    	}
			    	if(inquirerResponse.action.indexOf(choices[4]) != -1) {
			    		runTime();
			    	}
			    	if(inquirerResponse.action.indexOf(choices[5]) != -1) {
			    		runAlarm(inquirerResponse.value);
			    	}
			    	if(inquirerResponse.action.length == 0) {
			    		console.log("Please enter a valid action.");
			    	}
		    	} else {
		    		console.log("Choose again?");
		    		action();
		    	}
		    	
		    });
		}
		//For not having options when typing:
		// action();

	//Non-inquirer version/part
		var statedAction = process.argv[2];
		var value = process.argv[3];

		function choose(statedAction, value) {
			if (statedAction) {
				fs.appendFile( "log.txt", "\nAction(s): "+statedAction+", Additional input: "+value, function(error) {

				  // If an error was experienced we say it.
				  if (error) {
				    console.log(error);
				    fs.appendFile( "log.txt", "\n"+ JSON.stringify(error, null, 2), function(err) {
					  // If an error was experienced we say it.
					  if (err) {
					    console.log(err);
					  }
				  	});
				  }
				});
			}
			
			switch (statedAction) {
				case "twitter":
				case "tweet":
				case "tweets":
				case "my-tweets":
				    runTwitter();
				    break;
				case "spotify":
				case "song":
				case "songs":
				case "spotify-this-song":
				    runSpotify(value);
				    break;
				case "movie":
				case "movies":
				case "movie-this":
			    	runMovies(value);
			    	break;
			    case "alarm":
			    	runAlarm(value);
			    	break;
			    case "current-time":
			    case "time":
			    	runTime();
			    	break;
			    case "":
			    case "do":
				case "do-what-it-says":
					doWhat();
			    	break;
			    case "song/movie":
			    case "movie/song":
			    	runSpotify(value);
			    	runMovies(value);
			    	break;
			    case "tweet/movie":
			    case "movie/tweet":
			    	runMovies(value);
			    	runTwitter();
			    	break;
			    case "tweet/song":
			    case "song/tweet":
			    	runTwitter();
			    	runSpotify(value);
			    	break;
			    case "song/movie/tweet":
			    case "movie/song/tweet":
			    case "tweet/movie/song":
			    case "movie/tweet/song":
			    case "tweet/song/movie":
			    case "song/tweet/movie":
			    case "all":
					runTwitter();
					runSpotify(value);
					runMovies(value);
					break;
				default:
					action();
			}
		}
		choose(statedAction, value);	
