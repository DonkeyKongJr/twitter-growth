module.exports = function (accountName, io) {
    const Twitter = require('twitter');
    const config = require('./config.json');

    const client = new Twitter(config);
    const targetAccountName = accountName;
    let ids = [];

    console.log('Starting Twitter growth application...');

    client.get('followers/ids', { screen_name: targetAccountName }, function (error, data, response) {
        if (error)
            throw error;

        ids = data.ids;

        console.log(`A total of ${ids.length} accounts was retrieved.`)

        createFriendships(ids);
    });

    function createFriendships(ids) {
        var accountIteration = 0;

        setInterval(function () {
            if (accountIteration < ids.length) {
                console.log(`Trying to add ${ids[accountIteration]} as friend.`);
                client.post('friendships/create', { user_id: ids[accountIteration], follow: true }, function (error, data, response) {
                    io.emit('friendship_result', { 'result': data });
                });
            }
            else return;

            accountIteration++;
        }, 5000);
    }
}