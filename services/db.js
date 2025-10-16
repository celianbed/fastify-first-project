
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

console.log("[DEBUG] Connected to DB");

export const prisma = new PrismaClient(); // Exportation nommée (à la place de l'exportation par défaut)
