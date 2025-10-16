import {UserRepositories} from "../repositories/user.js";
import fastify from "fastify";
import JWT from "jsonwebtoken";

fastify.post("/login",async (request,response)=>{

    const body = request.body;
    const user = await UserRepositories.getUserByCredentials(body.email,body.password);
    if(!user){
        throw new Error("Utilisateur non trouvé");
    }
    user.token = JWT.sign({user:user.id}, process.env.JWT_SECRET, {expiresIn: "1d"});
    return user
});

fastify.post("/register",async (request,response)=>{
    const body = request.body;
    const newUser = {id,email,password}
    return newUser
})

fastify.post("/logout",async (request,response)=>{
    const body = request.body;
    const newUser = {id,email,password}
    return newUser
})