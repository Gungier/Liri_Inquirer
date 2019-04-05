require("dotenv").config();

var keys = require("./key");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var inquirer = require("inquirer");



function toText(data) {
    fs.appendFile("random.txt", '\r\n\r\n', function (err) {
        if (err) {
            return console.log(err);
        }
    });

    fs.appendFile("random.txt", (data), function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

function concerts(bandName) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
    if (!bandName) {
        console.log("You must enter a band/artist");
    } else {
        axios.get(queryUrl).then(
            function (response) {
                for (i = 0; i <= 4; i++) {
                    console.log("\r\n--RESULTS for " + bandName + "-----");
                    console.log("Venue: " + response.data[i].venue.name);
                    var location = response.data[i].venue.city + ", " + response.data[i].venue.region + " " + response.data[i].venue.country
                    console.log("Location: " + location);
                    var eventDate = moment(response.data[i].venue.datetime).format("MM-DD-YYYY");
                    console.log("Date: " + eventDate);

                    toText(response);
                }
            }
        );
    };
};

function spotifyThis(music) {

    if (!music) {
        music = "The Sign by Ace of Base";
    }

    spotify
        .search({
            type: "track",
            query: music
        })
        .then(function (response) {
            for (i = 0; i <= 4; i++) {
                try {
                    if (response.tracks.total === 0 || !response.hasOwnProperty("tracks")) {
                        console.log("No Data");
                        return;
                    }
                    console.log(["\r\n---RESULTS for '" + music + "'---",
                    "Artist: " + response.tracks.items[i].album.artists[0].name,
                    "Album: " + response.tracks.items[i].album.name,
                    "Song: " + response.tracks.items[i].name,
                    "Preview Song: " + response.tracks.items[i].external_urls.spotify].join('\n\n'));
                }
                catch (err) {
                    console.log("in catch err");
                    console.log(err);
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        });
};



function omdbGo (movieTitle) {

    if (!movieTitle) {
        movieTitle = "Mr Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy").then(
        function (response) {
            try {
                if (response.data.Response === "False") {
                    console.log("No Data");
                    return;
                }
                {
                    console.log(["Movie Title: " + response.data.Title,
                        "Release Year: " + response.data.Year,
                        "IMDB Rating: " + response.data.Ratings[0].Value,
                        "Country where Produced: " + response.data.Country,
                        "Language of movie: " + response.data.Language,
                        "Plot: " + response.data.Plot,
                        "Actors: " + response.data.Actors].join('\n\n'));
                }
            } catch (err) {
                console.log("in catch err");
                console.log(err);
            }
        }
    )
        .catch(function (error) {
            if (error.response) {
                console.log("No Data");
            }
            else {
                console.log(error);
            }
        });
};


function heyLiri(heyLiri) {
    if (!heyLiri) {
        heyLiri = "The Sign by Ace of Base";
    }

    spotify
        .search({
            type: "track",
            query: heyLiri
        })
        .then(function (response) {
            for (i = 0; i <= 4; i++) {
                try {
                    if (response.tracks.total === 0 || !response.hasOwnProperty("tracks")) {
                        console.log("No Data");
                        return;
                    }
                    console.log(["\r\n---RESULTS for '" + heyLiri + "'---",
                    "Artist: " + response.tracks.items[i].album.artists[0].name,
                    "Album: " + response.tracks.items[i].album.name,
                    "Song: " + response.tracks.items[i].name,
                    "Preview Song: " + response.tracks.items[i].external_urls.spotify].join('\n\n'));
                }
                catch (err) {
                    console.log("in catch err");
                    console.log(err);
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        });
    };

var questions = [{
    type: 'list',
    name: 'programs',
    message: 'What would you like to do?',
    choices: ['Spotify (Top 5 Results Shown)', 'Movie', 'Concert Venues (First 5 Results Shown)', 'Hey Liri']
},
{
    type: 'input',
    name: 'movieTitle',
    message: 'What\'s the name of the movie you would like?',
    when: function (answers) {
        return answers.programs == 'Movie';
    }
},
{
    type: 'input',
    name: 'music',
    message: 'What\'s the name of the song or Band you would like?',
    when: function (answers) {
        return answers.programs == 'Spotify (Top 5 Results Shown)';
    }
},
{
    type: 'input',
    name: 'bandName',
    message: 'What band are you trying to find?',
    when: function (answers) {
        return answers.programs == 'Concert Venues (First 5 Results Shown)';
    }
},
{
    type: 'input',
    name: 'heyLiri',
    message: 'I don\'t know much, but I\'ll do a Spotify search for you?',
    when: function (answers) {
        return answers.programs == 'Hey Liri';
    }
}
];
inquirer
    .prompt(questions)
    .then(answers => {
        // Depending on which program the user chose to run it will do the function for that program
        switch (answers.programs) {
            case 'Spotify (Top 5 Results Shown)':
                spotifyThis(answers.music);
                break;
            case 'Movie':
                omdbGo(answers.movieTitle);
                break;
            case 'Concert Venues (First 5 Results Shown)':
                concerts(answers.bandName);
                break;
            case 'Hey Liri':
                heyLiri(answers.heyLiri);
                break;
            default:
                console.log('LIRI doesn\'t know that');
        }
    });
