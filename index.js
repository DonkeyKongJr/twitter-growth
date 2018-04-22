var Twitter = require('twitter');
var config = require('./config.json');

var client = new Twitter(config);

console.log("Starting Twitter growth application...");

var params = {screen_name: 'patzistar'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
