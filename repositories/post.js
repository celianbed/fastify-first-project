import { prisma } from "../services/db.js";

// Note: Le code ici suppose que votre modèle Prisma s'appelle 'post' (minuscule).

export const PostRepository = {

    /**
     * Récupère une liste de posts avec pagination.
     * @param {number} page - Le numéro de la page (commence à 1).
     * @param {number} limit - Le nombre d'éléments par page.
     * @returns {Promise<Object[]>} - La liste des posts.
     */
    getPosts: async (page, limit) => {
        const posts = await prisma.post.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: 'desc', // Bonne pratique : trier par date de création
            },
        });
        return posts;
    },

    /**
     * Récupère un post par son ID.
     * @param {number} id - L'identifiant du post.
     * @returns {Promise<Object>} - Le post trouvé.
     * @throws {Error} - Si aucun post n'est trouvé.
     */
    getPostById: async (id) => {
        // Correction 1: Utiliser findUnique (ou findFirst) et non une méthode JS non définie sur prisma
        const post = await prisma.post.findUnique({
            where: { id: id },
        });

        // Correction 2: La vérification est correcte
        if (!post) {
            // Dans un contexte Fastify, il est préférable de laisser la route gérer l'erreur 404,
            // mais lever une erreur ici est acceptable pour le pattern repository.
            const error = new Error("No post with this id");
            error.statusCode = 404; // Ajout d'un code d'état si le framework peut le gérer
            throw error;
        }
        return post;
    },

    /**
     * Crée un nouveau post.
     * @param {Object} postData - Les données du post (ex: {title, content}).
     * @returns {Promise<Object>} - Le nouveau post créé.
     */
    createPost: async (postData) => {
        // Correction 3: Ne pas gérer l'ID manuellement. Prisma s'en charge.
        // Utiliser prisma.post.create() pour l'insertion.
        const newPost = await prisma.post.create({
            data: postData, // Utilise directement les données passées
        });
        return newPost;
    },

    /**
     * Met à jour un post existant.
     * @param {number} id - L'identifiant du post à mettre à jour.
     * @param {Object} postData - Les données à mettre à jour (ex: {title: 'Nouveau titre'}).
     * @returns {Promise<Object>} - Le post mis à jour.
     * @throws {Error} - Si aucun post n'est trouvé.
     */
    updatePost: async (id, postData) => {
        try {
            // Correction 4: Utiliser prisma.post.update()
            const updatedPost = await prisma.post.update({
                where: { id: id },
                data: postData,
            });
            return updatedPost;
        } catch (error) {
            // Gérer l'erreur spécifique de Prisma si l'élément n'existe pas (Code P2025)
            if (error.code === 'P2025') {
                const customError = new Error("No post with this id");
                customError.statusCode = 404;
                throw customError;
            }
            throw error;
        }
    }
}