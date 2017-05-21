'use strict';

//var FeedIndexer = require('./feed-indexer');

/**
 * Call indexers async per feed url to update the feed index
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.handler = (event, context, callback) => {

    console.log(event);

    callback();
};