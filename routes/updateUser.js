'use strict';

const Joi = require('joi');
const db = require('../utils/database');
const tittle = require('tittle');

module.exports = {
	method: 'PUT',
	path: '/user/{id}',
	config: {
		validate: {
			params: Joi.object().keys({
				id: Joi.number().integer().required()
			}),
			payload: Joi.object().keys({
				first_name: Joi.string(),
				last_name: Joi.string(),
				country_id: Joi.number().integer(),
			})
		}
	},
	handler: async function (request, handler){
		const query = db('users').where({
			id: request.params.id
		}).update({
			first_name: request.payload.first_name,
			last_name: request.payload.last_name,
			country_id: request.payload.country_id
		});

		let [result, error] = await tittle(query);

		const query2 = db.select().from("users").where({id: request.params.id});
		let [user, error2] = await tittle(query2);

		if(error){
			return handler.response({
				statusCode: 500,
				error: error
			}).code(500);
		}

		return handler.response({
			statusCode: 200,
			data: user
		}).code(200);
	}
}