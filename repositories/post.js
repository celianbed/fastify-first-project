import {prisma} from "../services/db.js";
import fastify from "fastify";

export const PostRepository = {
    getPosts: async (page,limit) => {

        const posts = await prisma.post.findMany({
            skip: (page - 1) * limit,
            take: limit
        });
        return posts
    },

    getPostById: (id) => {
        const post = prisma.find(post => post.id === id);
        if(!post) {
            throw new Error("No post with this id");
        }
        return post;
    },

    createPost: async (post) => {
        const id = post.length + 1;
        const newPost = await {id, ...post};
        prisma.post.create(newPost);
        return newPost;
    },

    updatePost: async (id, post) => {
        const oldPost = await posts.find(post => post.id === id);
        if (!oldPost) {
            throw new Error("No post with this id");
        }
        const newPost = await prisma.update({

        })
    }

}