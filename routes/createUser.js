'use strict';

const Joi = require('joi');
const db = require('../utils/database');
const tittle = require('tittle');

module.exports = {
	method: 'POST',
	path: '/user',
	config: {
		validate: {
			payload: Joi.object().keys({
				//.token() permet de demander un format de token
				first_name: Joi.string().required(),
				last_name: Joi.string().required(),
				country_id: Joi.number().integer().required(),
				is_admin: Joi.boolean().default(false),
				website: Joi.string().uri({
					scheme: ['http', 'https']
				})
			})
		}
	},
	handler: async function (request, handler){
		const query = db('users').insert({
			first_name: request.payload.first_name,
			last_name: request.payload.last_name,
			country_id: request.payload.country_id
		});
		let [userID, error] = await tittle(query);

		const query2 = db.select().from("users").where({id: userID[0]});
		let [user, error2] = await tittle(query2);

		if(error){
			return handler.response({
				statusCode: 500,
				error: error
			}).code(500);
		}

		return handler.response({
			statusCode: 200,
			data: user[0]
		}).code(200);
	}
}