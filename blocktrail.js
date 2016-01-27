var request = require('request');
var config = require('./config.js');

var blocktrail = {};

//TODO: remove code duplication

var blocktrailBaseUrl = 'https://api.blocktrail.com/v1/btc/block/';
var blocktrailEndUrl = '?api_key=MY_APIKEY';

blocktrail.getBlock = function(block, callback) {
	request({uri: blocktrailBaseUrl + block + blocktrailEndUrl,
             proxy: config.proxy}, function (error, response, body) {
        if (error) {
            console.log(error);
        }
        if (!error && response.statusCode == 200) {
            var answer = JSON.parse(body);
			callback(null, answer);
		}
	});
}

blocktrail.getLastBlock = function(callback) {
	request({uri: blocktrailBaseUrl + 'latest' + blocktrailEndUrl,
             proxy: config.proxy}, function (error, response, body) {
        if (error) {
            console.log(error);
        }
        if (!error && response.statusCode == 200) {
            var answer = JSON.parse(body);
    		callback(null, answer);
		}
	});
}

module.exports = blocktrail;