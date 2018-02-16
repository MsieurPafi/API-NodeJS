'use strict';

const knex = require('knex');

module.exports = knex({
	    client: 'mysql',
	    connection: process.env.DB
});