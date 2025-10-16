import { UserRepositories } from "../repositories/user.js";

import JWT from "jsonwebtoken";
// Importer les DTOs (Schémas)
import { loginSchema } from './dto/loginDto.js';
import { registerSchema } from './dto/registerDto.js';

export default async function authRoutes(app, options) {

    app.post("/login", { schema: loginSchema }, async (request, response) => {
        const { email, password } = request.body;

        const user = await UserRepositories.getUserByCredentials(email, password);

        if (!user) {
            return response.code(401).send(new Error("Identifiants invalides."));
        }

        // 2. Génération du JWT
        const token = JWT.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 3. Réponse
        return {
            id: user.id,
            email: user.email,
            token: token
        };
    });

    app.post("/register", { schema: registerSchema }, async (request, response) => {
        const { email, password } = request.body;

        const newUser = await UserRepositories.createUser(email, password);

        return response.code(201).send({
            id: newUser.id,
            email: newUser.email,
        });
    });

    // --- Endpoint de Déconnexion (Logout) ---
    app.post("/logout", async (request, response) => {


        return response.code(200).send({ message: "Déconnexion réussie. Le token doit être supprimé côté client." });
    });
}