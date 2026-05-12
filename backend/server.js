import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Conexão MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado ao MongoDB do RotuScan!"))
    .catch((err) => console.log("❌ Erro no MongoDB:", err));

// Usando as rotas
app.use("/", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API RotuScan rodando na porta ${PORT}`);
});