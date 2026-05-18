import User from "../models/User.js";
import bcrypt from "bcrypt";

class UserService {
    async Create(name, email, password, role) {
        // Criptografando a senha antes de salvar
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();
    }

    async getByEmail(email) {
        return await User.findOne({ email });
    }

    async getPatientById(id) {
        return await User.findById(id).select("-password"); // Retorna sem a senha
    }

    async getAll() {
        // Busca todos os usuários, ocultando a senha por segurança
        return await User.find().select("-password");
    }
}

export default new UserService();