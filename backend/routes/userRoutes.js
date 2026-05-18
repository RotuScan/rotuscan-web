import express from 'express';
const userRoutes = express.Router();
import userController from '../controllers/userController.js';

userRoutes.post("/user", userController.createUser);
userRoutes.post("/auth", userController.loginUser);

userRoutes.get("/pacientes", userController.listarPacientes);
userRoutes.get("/dicionario", userController.listarDicionario);

export default userRoutes;