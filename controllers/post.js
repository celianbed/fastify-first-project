import { prisma } from "../services/db.js";
import {
    createPostSchema,
    updatePostSchema,
    getPostSchema,
    listPostsSchema
} from '../DTO/post.js'; // Assurez-vous d'importer vos DTOs

export function registerPostRoutes(fastify) {

    // --- GET /posts (Liste des posts avec pagination) ---
    fastify.get('/posts', { schema: listPostsSchema }, async function getPosts(request, reply) {
        // Fastify utilise le schéma pour s'assurer que page et limit sont des nombres
        const { page, limit } = request.query;
        const offset = (page - 1) * limit;

        const [posts, total] = await prisma.$transaction([
            prisma.post.findMany({
                skip: offset,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            prisma.post.count(),
        ]);

        return {
            data: posts,
            pagination: {
                page: page,
                limit: limit,
                total: total,
            }
        };
    });

    // --- GET /posts/:id (Obtenir un post par ID) ---
    fastify.get('/posts/:id', { schema: getPostSchema }, async function getPost(request, reply) {
        // Convertir l'ID en nombre pour Prisma
        const id = parseInt(request.params.id);

        const post = await prisma.post.findUnique({
            where: { id: id },
        });

        if (!post) {
            // 404 Not Found si le post n'existe pas
            reply.code(404);
            throw new Error(`Le post avec l'ID ${id} n'a pas été trouvé.`);
        }

        return post;
    });

    // --- POST /posts (Créer un nouveau post) ---
    fastify.post('/posts', { schema: createPostSchema }, async function createPost(request, reply) {
        const { title, content } = request.body;

        const newPost = await prisma.post.create({
            data: {
                title: title,
                content: content,
            },
        });

        // Retourne 201 Created
        return reply.code(201).send(newPost);
    });

    // --- PUT /posts/:id (Mettre à jour un post) ---
    fastify.put('/posts/:id', { schema: updatePostSchema }, async function updatePost(request, reply) {
        const id = parseInt(request.params.id);
        const body = request.body; // { title: '...', content: '...' }

        // Vérifie si le post existe d'abord (bonne pratique pour les PUT)
        const existingPost = await prisma.post.findUnique({ where: { id: id } });
        if (!existingPost) {
            reply.code(404);
            throw new Error(`Le post avec l'ID ${id} n'a pas été trouvé.`);
        }

        const updatedPost = await prisma.post.update({
            where: { id: id },
            data: body, // Prisma prend en charge la mise à jour partielle avec l'objet body
        });

        return updatedPost;
    });

    // --- DELETE /posts/:id (Supprimer un post) ---
    fastify.delete('/posts/:id', async function deletePost(request, reply) {
        const id = parseInt(request.params.id);

        try {
            await prisma.post.delete({
                where: { id: id },
            });
            // 204 No Content pour une suppression réussie sans corps de réponse
            return reply.code(204).send();
        } catch (error) {
            if (error.code === 'P2025') {
                // Code d'erreur Prisma si l'enregistrement n'existe pas lors de la suppression
                reply.code(404);
                throw new Error(`Le post avec l'ID ${id} n'a pas été trouvé.`);
            }
            throw error;
        }
    });
}