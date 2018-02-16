'use strict';

module.exports = {
	database:  'mysql://root:roooot@localhost:3306/wsf',
	http: {
	    host: 'localhost', 
	    port: 8000,
	    routes: {
		    cors: {
		    	// methods: ['GET'],//si on autorise tout on ne le met pas
		    	origin: ['*']//on peut mettre des adresses IP, des plages d'adresses IP, des URLs genre *.wsf.com ou patate.wsf.com
		    }	
	    }
	     
	}
}