import { prisma } from "../services/db.js";
// Assurez-vous que l'importation de 'prisma' est correcte

export const UserRepository = {

    /**
     * Recherche un utilisateur par email et vérifie le mot de passe.
     * * NOTE IMPORTANTE : En production, cette méthode devrait seulement
     * récupérer l'utilisateur par email. La VÉRIFICATION du mot de passe
     * (comparaison du HASH) doit se faire après, en utilisant une librairie comme 'bcrypt'.
     * * @param {string} email
     * @param email
     * @param {string} rawPassword - Mot de passe en clair reçu de l'utilisateur.
     * @returns {Promise<Object | null>} - L'utilisateur trouvé, ou null.
     */
    getUserByCredentials: async function(email, rawPassword) {

        // 1. Récupérer l'utilisateur par email
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return null; // Utilisateur non trouvé
        }

        // 2. Vérification du mot de passe (Simulation dans cet exemple)
        // REMPLACER ceci par : await bcrypt.compare(rawPassword, user.password_hash);
        if (user.password !== rawPassword) {
            return null; // Mot de passe incorrect
        }

        // Retourne l'utilisateur (sans le mot de passe pour des raisons de sécurité)
        // Vous pouvez utiliser 'select' dans findUnique pour exclure le champ 'password'
        return user;
    },

    /**
     * Crée un nouvel utilisateur dans la base de données.
     * * @param {string} email
     * @param {string} rawPassword - DOIT ÊTRE HACHÉ AVANT DE PASSER À PRISMA EN PRODUCTION.
     * @returns {Promise<Object>} - Le nouvel utilisateur créé.
     */
    createUser: async function (email, rawPassword) {

        // EN PRODUCTION, HACHEZ LE MOT DE PASSE ICI :
        // const hashedPassword = await bcrypt.hash(rawPassword, 10);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: rawPassword // Remplacer par 'hashedPassword' en production
            },
            // Optionnel : ne pas inclure le mot de passe dans l'objet retourné
            select: {
                id: true,
                email: true,
                // ... autres champs
            }
        });

        // Prisma gère automatiquement l'ID (auto-incrémentation)

        return newUser;
    }
}