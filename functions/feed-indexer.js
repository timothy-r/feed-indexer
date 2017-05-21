/**
 * convert into a function callable from the handler
 */

var FeedParser = require('feedparser');
var request = require('request');

// configure the keys to index
var keys = ['guid', 'title', 'description', 'date', 'pubdate', 'link', 'author', 'categories'];

// parameterise the feed url
var url = 'http://myfeed.com/';

var req = request(url);

var feedparser = new FeedParser([]);

req.on('error', function (error) {
   console.error(error);
});

req.on('response', function (res) {
    var stream = this; // `this` is `req`, which is a stream

    if (res.statusCode !== 200) {
        this.emit('error', new Error('Bad status code : ' + res.statusCode));
    }
    else {
        stream.pipe(feedparser);
    }
});

feedparser.on('error', function (error) {
    console.error(error);
});

feedparser.on('readable', function () {
    // This is where the action is!
    var stream = this; // `this` is `feedparser`, which is a stream
    //var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
    var item;

    while (item = stream.read()) {

        var input = {};
        //console.log(item);
        keys.forEach(function print(key){
            console.log(key + ' : ' + item[key]);
            input[key] = item[key];
        });

        // index input into elasticSearch
        console.log("\n");
    }
});