import userService from "../services/userService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Defina seu segredo JWT (o professor chamou de JWTSecret)
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
            // Gerando o Token
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

export default { createUser, loginUser, JWTSecret };