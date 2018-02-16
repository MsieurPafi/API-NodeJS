'use strict';

const Hapi = require('hapi');
const Joi = require('joi');

const env = process.env.NODE_ENV || 'development';

let settings;

try {
    settings = require(`./settings/${env}`);
} catch (err){
    throw new Error(err);
}

try {
    process.env.DB = settings.database
} catch (err){
    throw new Error(err);
}

// const knex = require('knex')({
//     client: 'mysql',
//     connection: process.env.DB
// })



// Create a server with a host and port
const server = Hapi.server(settings.http);

//la route pour récupérer tous les users
server.route(require('./routes/getUsers'));

//ne pas oublier les dépendenses, par exemple pour l'utilisateur
//qui est recherché par son ID il faut appeler Joi dans le fichier de la route
server.route(require('./routes/getUserByID'));
server.route(require('./routes/createUser'));
server.route(require('./routes/deleteUser'));
server.route(require('./routes/updateUser'));

server.route(require('./routes/getPost'));




// Start the server
async function start() {

    //à recopier pour tous les plugins que l'on veut rajouter
    await server.register({
        plugin: require('./plugins/token'),
        options: {
            name: 'toto'
        }
    })

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();