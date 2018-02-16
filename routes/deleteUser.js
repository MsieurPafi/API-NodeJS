'use strict';

const Joi = require('joi');
const db = require('../utils/database');
const tittle = require('tittle');

module.exports = {
	method: 'DELETE',
	path: '/user/{id}',
	config: {
		validate: {
			params: Joi.object().keys({
				id: Joi.number().integer().required()
			})
		}
	},
	handler: async function (request, handler){

		const query = db('users').where({
			id: request.params.id
		}).del();

		let [result, error] = await tittle(query);

		if(error){
			return handler.response({
				statusCode: 500,
				error: error
			}).code(500);
		}

		return handler.response({
			statusCode: 200,
			data: result
		}).code(200);
	}
}