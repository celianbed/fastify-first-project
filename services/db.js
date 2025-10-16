import { PrismaClient } from '../generated/prisma/index.js';
// Assurez-vous que le chemin est correct. Si ce fichier est à la racine, utilisez './generated/prisma/index.js'

console.log("[DEBUG] Connected to DB");

export const prisma = new PrismaClient();