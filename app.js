var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var config = require('./config.js');
var blocktrail = require('./blocktrail.js');

var db;
var latestBlock;
var latestBlockInDb;

MongoClient.connect('mongodb://localhost:27017/' + config.db, function(err, database) {
    
    assert.equal(null, err);
	db = database;
    console.log("Successfully connected to MongoDB.");

    findLatest((error, data) => {
		latestBlock = data;
		findLatestInDb((error, data) => {
			latestBlockInDb = item.height;
			console.log(latestBlockInDb + '..' + latestBlock + ' : ' + (latestBlock - latestBlockInDb) + ' blocks to update');
		});
	});
    //        db.collection(settings.collection).insertOne(status, function(err, res) {
});

// Find latest block in blockchain
var findLatest = function(callback) {
	blocktrail.getLastBlock(function(error, data) {
		// find latest block in blockchain
		latestBlock = data.height;
		console.log('Latest block: ' + data.blockHeight);
		
	    callback(null, latestBlock);	
	});
}

// Find latest block in database. Return 0 if database is empty
var findLatestInDb = function(callback) {
	var cursor = db.collection(settings.collection).find();
	cursor.sort({height: -1});
	cursor.limit(1);
	cursor.nextObject(function(error, item) {
		if (error) callback(null, 0);
		if (item)  callback(null, item);
	});
}
	
