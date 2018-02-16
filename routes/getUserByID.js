'use strict';

// const db = require('knex')(process.env.DB)

const db = require('../utils/database')
const Joi = require('joi');
const tittle = require('tittle');

module.exports = {
    method: 'GET',
    path:'/user/{id}', 
    config: {
        validate: {
           params: Joi.object().keys({
                id: Joi.number().integer().required()
            }).unknown()         
       }
    },
    handler: async function (request, handler) {

        const query = db.select().from("users").where({id: request.params.id});
        let [user, error] = await tittle(query);

        if(error){
            return handler.response({
                statusCode: 400,
                error: 'oops'
            }).code(400);            
        }

        return handler.response({
            statusCode: 200,
            data: user[0]
        }).code(200);


        /*
        return db.select().from("users").where({id: request.params.id}) //le return ici permet de dire que c'est la dernière fonction du handler
            .then((data => {
                return handler.response({
                	statusCode: 200,
                	data: data[0]
                }).code(200);
            }))
            .catch((error => {
                return handler.response({
                	statusCode: 400,
                    error: 'oops'
                }).code(400);
            }));
        */
    }
}