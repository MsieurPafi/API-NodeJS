'use strict';

const Joi = require('joi');
const db = require('../utils/database');
const tittle = require('tittle');

module.exports = {
	method: 'GET',
	path: '/post/{id}',
	config: {
		validate: {
			params: Joi.object().keys({
				id: Joi.number().integer().required()
			})
		}
	},
	handler: async function (request, handler){

		const query = db.select().from("posts")
		.where({
			"posts.id": request.params.id
		})
		.innerJoin("users", "posts.user_id", "users.id")
		.innerJoin("comments", "posts.id", "comments.post_id");

		let [post, error] = await tittle(query);

		const data = {
			id: post[0].post_id,
			title: post[0].title,
			description: post[0].description,
			content: post[0].content,
			created_at: post[0].created_at,
			author: {
				id: post[0].user_id,
				first_name: post[0].first_name,
				last_name: post[0].last_name,
				country_id: post[0].country_id
			},
			comments: []
		}	

		let number = 0;

		post.forEach(function(element){
			data.comments.push({
				id: post[number].id,
				comment: post[number].comment
			})
			number = number + 1;
		})

		if(error){
			return handler.response({
				statusCode: 500,
				error: error
			}).code(500);
		}

		return handler.response({
			statusCode: 200,
			data: data
		}).code(200);
	}
}