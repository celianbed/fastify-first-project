// Fichier : services/db.js

// 1. Importe l'intégralité du module sous le nom 'pkg'
import pkg from '@prisma/client';
const { PrismaClient } = pkg; // 2. Déstructure l'objet PrismaClient de l'objet importé

console.log("[DEBUG] Connected to DB");

export const prisma = new PrismaClient();