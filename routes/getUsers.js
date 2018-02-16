'use strict';

// const db = require('knex')(process.env.DB)

const tittle = require('tittle');
const db = require('../utils/database');
const Joi = require('joi');

module.exports = {
	    method: 'GET',
	    path:'/users', 
	    config: {
	    	validate: {
	    		query: Joi.object().keys({
	    			// limit: Joi.number().integer(),
	    			// offset: Joi.number().integer(),
	    			page: Joi.number().integer().min(0)
	    		})
	    	}
	    },
	    handler: async function (request, handler) {

	    	/* 
	    	//soit on fait du try catch pour tous les Async/await
	    	//soit on utilise la librairie Tittle (voir en dessous)
	    	//mais on ne fait pas les deux !!! -> c'est pas propre

	    	let users = []
	    	try{
	    		users = await db.select().from("users");
		    	return handler.response({
	            	statusCode: 200,
	            	data: data
	            }).code(200);
	    	} catch (error){
    			return handler.response({
                	statusCode: 400,
                    error: 'oops'
                }).code(400);   
	    	}*/

	    	//tittle permet de gérer les erreurs
	    	//et donc de remplacer le try catch du dessus

	    	let limit = 50;
	    	let offset = 0;
	    	let page = 1;

	    	if(request.query.page){
	    		page = request.query.page;
	    		if(page === 0){
	    			page = 1;
	    		}
	    		page--;
	    		offset = page * limit;
	    	}



	    	// if(request.query.limit){
	    	// 	limit = request.query.limit;
	    	// }

	    	// if(request.query.offset){
	    	// 	offset = request.query.offset;
	    	// }

            const query = db.select().from("users").limit(limit).offset(offset);
            let [users, error] = await tittle(query);
            //le "await" bloque tout le code, tant que cette requête
	    	//n'est pas terminée l'exécution n'avance pas

    		const links = {
    			prev: request.query.page <= 1 ? null : `users?page=${request.query.page - 1}`,
    			next: `users?page=${request.query.page == 0 ? request.query.page + 2 : request.query.page + 1}`
    		};

            if (error){
    			return handler.response({
                	statusCode: 400,
                    error: 'oops'
                }).code(400);            	
            }

	    	return handler.response({
            	statusCode: 200,
            	data: users,
            	links: links
            }).code(200);

	    }
}