# liri-node-app

-Execute based on commands or using inquirer for in-bash user interface

Non-inquirer commands accepted: "twitter", "tweet", "tweets", "my-tweets", "spotify", "song", "songs", "spotify-this-song", "movie", "movies", "movie-this", "", "do", "do-what-it-says", "current-time", "time", "song/movie", "movie/song", "tweet/movie", "movie/tweet", "tweet/song", "song/tweet", "song/movie/tweet", "movie/song/tweet", "tweet/movie/song", "movie/tweet/song", "tweet/song/movie", "song/tweet/movie", "all"

do-what-it-says does not apply with all. This is because it is calling other functions and it would be a more confusing output.

If blank, instead it will go to inquirer's prompt.


Twitter:
-gives last 20 tweets from twitter thing I made up because I don't twitter at all.

Spotify:
-find info on a song. As Spotify may not always bring up what you were thinking first, this has a list of the top 20 given songs

OMDB:
-uses OMDB to search for movie name

Set Alarm:

Time:
-Get the current date and time

Do Whatever:
-choose a random option in random2.txt
-if switched to random.txt, is always the same option

Multiple options!:
-Either in the inquirer interface or by using actions in the form of movie/tweet, tweet/movie, song/movie, or all you can run multiple commands at once. This applies multiple actions on the same input, so you could search for 'All of Me' and find both the info on the song and the movie!

Defaults:
-for each option or options, there are defaults if no input is given.