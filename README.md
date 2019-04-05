# Liri_Inquirer

Liri
Liri is a node.js command line application that takes in parameters and gives back data. The user must enter 'node liri' into the command line.

It is designed to be an improvement to a previous build that required commands like: 'concert-this', 'spotify-this-song', 'movie-this', or 'do-what-it-says'. The search parameter can be whatever the user is looking for. 
Example: 'node liri.js movie-this Best in Show'

This version I decided to incorporate the NPM Inquirer package.  It occurred to me that I would prefer having less of my own typing errors and those who may use this application would prefer less typing, too.  The same calls are relied upon, but now you can use your arrow keys to select which program you would like to run.  


•'concert' relies on using the API for Bandsintown to request all upcoming concerts for an artist that is searched. I trimmed the search values to top 5 concerts for a band as I'd experienced very long lists for some bands and this is supposed to be a mere example.  However, the information provided includes venue name, location, and date is provided for all results. I incorporated 'moment.js' to format the date from Bandsintown.

•'spotify' uses the Spotify API to retrieve data about the song entered in the search parameter. All song titles that contain the search parameter or parts of it are returned. The user will receive the artist, song name, a link to preview the song, and the album name for each result.

•'movie' uses the OMDb API to retreive data about the movie entered in the search parameter. The result will include the title, release year, IMDb rating, Rotten Tomatoes rating, country or countries it was filmed in, langauge(s), plot, and actors/actresses in the film.

•'Hey Liri' runs the same function as spotify.

All results are returned in the command line, but also into a separate text file named 'log.txt' as well.

Technologies used: Javascript, Node.js, Moment.js, Bandsintown API, Spotify API, OMDb API, and Inquirer.js