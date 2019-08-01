var config = require('../config');
var elasticsearch = require('elasticsearch');


var hostAddress = String(config.getConfig(config.env).elasticHost).split(':');

var client = new elasticsearch.Client({
	hosts: [{
		protocol: hostAddress[0],
		host: hostAddress[1].substring(2),
		port: hostAddress[2],
		headers: {
			'content-type': 'application/json'
		}
	}
	]
});
client.ping({
	requestTimeout: 30000,
}, function (error) {
	if (error) {
		console.error('elasticsearch cluster is down!');
	} else {
		console.log('Everything is ok');
	}
});


module.exports = client;