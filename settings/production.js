'use strict';

module.exports = {
	database: process.env.DB,
	http: {
	    host: process.env.HOST || process.env.HOST_NAME || 'localhost', 
	    port: process.env..PORT || 3000 
	}
}