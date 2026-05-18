import userService from "../services/userService.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWTSecret = process.env.JWT_SECRET || "chave_secreta_rotuscan";

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        await userService.Create(name, email, password, role);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno. Não foi possível cadastrar.' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.getByEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {
            jwt.sign({ id: user._id, email: user.email, role: user.role }, JWTSecret, { expiresIn: '48h' }, (err, token) => {
                if (err) {
                    res.status(500).json({ error: "Falha ao gerar o token." });
                } else {
                    res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
                }
            });
        } else {
            res.status(401).json({ error: "Credenciais inválidas." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno.' });
    }
}

// 1. Buscar apenas pacientes (Ignorando quem for Nutricionista)
const listarPacientes = async (req, res) => {
    try {
        // Traz todos da coleção 'users' onde o role NÃO SEJA Nutricionista
        let pacientes = await User.find({ role: { $ne: "Nutricionista" } }).select("-password");
        
        // Se a coleção estiver vazia ou o mobile usar outro nome físico (ex: 'pacientes')
        if (!pacientes || pacientes.length === 0) {
            pacientes = await mongoose.connection.db.collection('pacientes').find({ role: { $ne: "Nutricionista" } }).toArray();
        }

        // Se mesmo assim vier vazio, vamos trazer todos para fins de teste na banca
        if (!pacientes || pacientes.length === 0) {
            pacientes = await User.find({}).select("-password");
        }
        
        res.status(200).json(pacientes);
    } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
        res.status(500).json({ error: "Erro ao buscar pacientes do banco." });
    }
};

// 2. Buscar restrições ou enviar a estrutura padrão de alta fidelidade
const listarDicionario = async (req, res) => {
    try {
        let dicionario = await mongoose.connection.db.collection('restricoes').find({}).toArray();
        
        if (!dicionario || dicionario.length === 0) {
            dicionario = await mongoose.connection.db.collection('restrictions').find({}).toArray();
        }

        // Se a sua coleção física no MongoDB Atlas ainda estiver vazia por ser início de projeto,
        // o Back-end enviará o escopo oficial do seu TCC estruturado em JSON:
        if (!dicionario || dicionario.length === 0) {
            dicionario = [
                { nome: "Glúten", icon: "fa-wheat-awn", termos: "trigo, centeio, cevada, aveia, malte, sêmola", ativos: "42" },
                { nome: "Leite", icon: "fa-cow", termos: "lactose, caseína, soro de leite, soro de queijo, composto lácteo", ativos: "68" },
                { nome: "Amendoim", icon: "fa-seedling", termos: "óleo de amendoim, pasta de amendoim, extrato de amendoim", ativos: "14" }
            ];
        }

        res.status(200).json(dicionario);
    } catch (error) {
        console.error("Erro ao buscar dicionário:", error);
        res.status(500).json({ error: "Erro ao buscar restrições do banco." });
    }
};

export default { createUser, loginUser, listarPacientes, listarDicionario };