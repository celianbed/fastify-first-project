// DTO pour un Post complet (utilisé en réponse)
const postObject = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        content: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
};

// Schéma pour la création (POST /posts)
export const createPostSchema = {
    body: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
            title: { type: 'string', minLength: 5, maxLength: 255 },
            content: { type: 'string', minLength: 10 },
        },
        additionalProperties: false,
    },
    response: {
        201: postObject, // Retourne le Post créé
    }
};

// Schéma pour la mise à jour (PUT /posts/:id)
export const updatePostSchema = {
    body: {
        type: 'object',
        properties: {
            title: { type: 'string', minLength: 5, maxLength: 255 },
            content: { type: 'string', minLength: 10 },
        },
        // Les deux champs sont optionnels, mais au moins un doit être présent
        minProperties: 1,
        additionalProperties: false,
    },
    response: {
        200: postObject, // Retourne le Post mis à jour
    }
};

// Schéma pour l'obtention d'un seul post (GET /posts/:id)
export const getPostSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' } // ID attendu en tant que nombre
        }
    },
    response: {
        200: postObject,
    }
};

// Schéma pour la liste des posts (GET /posts)
export const listPostsSchema = {
    querystring: {
        type: 'object',
        properties: {
            page: { type: 'number', default: 1 },
            limit: { type: 'number', default: 10 },
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: postObject,
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'number' },
                        limit: { type: 'number' },
                        total: { type: 'number' }
                    }
                }
            }
        }
    }
};