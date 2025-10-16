export const loginSchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8 }, // Assurez-vous d'utiliser un hashage en prod !
        },
        additionalProperties: false, // Empêche les champs non définis
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                email: { type: 'string' },
                token: { type: 'string' },
            }
        }
    }
};

export const registerSchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8 }, // Min 8 caractères, sera hashé
        },
        additionalProperties: false,
    },
    response: {
        201: { // 201 Created pour une inscription réussie
            type: 'object',
            properties: {
                id: { type: 'number' },
                email: { type: 'string' },
            }
        }
    }
};