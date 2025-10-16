import Fastify from 'fastify'
import {registerPostRoutes} from "./controllers/post.js";
import * as dotenv from 'dotenv';

dotenv.config();

const logger = {
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
            singleLine: true,
            colorize: true,
        },
    },
};

const fastify = Fastify({ logger });

fastify.get('/', (req, res) => {

    return {hello: 'world'};
})

registerPostRoutes(fastify);


try {
    await fastify.listen({port: 3005})
}
catch (err) {
    fastify.log.error(err)
    process.exit(1)
}