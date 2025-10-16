import {prisma} from "../services/db.js";

export function registerPostRoutes(fastify) {
    // GET /posts
    fastify.get('/posts', async function getPosts(request, reply) {
        const page = request.query.page || 1;
        const limit = request.query.limit || 10;
        return {
        }; // Le contenu de la réponse réelle irait ici
    });

    // GET /posts/:id
    fastify.get('/posts/:id', async function getPost(request, reply) {
        const id = request.params.id;
        return {}; // Le contenu de la réponse réelle irait ici
    });

    // POST /posts
    fastify.post('/posts', async function createPost(request, reply) {
        const body = request.body;
        return {}; // Le contenu de la réponse réelle irait ici
    });

    // PUT /posts/:id
    fastify.put('/posts/:id', async function updatePost(request, reply) {
        const id = request.params.id;
        const body = request.body;
        return {}; // Le contenu de la réponse réelle irait ici
    });

    // DELETE /posts/:id
    fastify.delete('/posts/:id', async function deletePost(request, reply) {
        const id = request.params.id;
        return {}; // Le contenu de la réponse réelle irait ici
    });


}