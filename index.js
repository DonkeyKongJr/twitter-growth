var Twitter = require('twitter');
var config = require('./config.json');

const client = new Twitter(config);
const targetAccountName = 'ORF';
let ids = [];

console.log("Starting Twitter growth application...");

client.get('followers/ids', {screen_name:targetAccountName}, function(error, data, response){
    if(error)
        throw error;

    ids = data.ids;

    console.log(`A total of ${ids.length} accounts was retrieved.`)
    
    createFriendships(ids);
});

function createFriendships(ids){
    var accountIteration = 0;

    setInterval(function() {
        if (accountIteration < ids.length) {
            console.log(`Trying to add ${ids[accountIteration]} as friend.`);

            client.post('friendships/create', {user_id:ids[accountIteration]}, function(error, data, response){
                if(error)
                    console.log(error);
                else
                    console.log(data);
            });
        }
    
        else return;
        accountIteration++;
    }, 5000);
}