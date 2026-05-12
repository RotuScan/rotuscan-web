import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import scanController from './controllers/scanController.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors()); // Importante para o HTML conseguir acessar a API

// Conexão com o seu MongoDB Atlas (O MESMO DO MOBILE)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ API Conectada ao Banco do Mobile!"))
    .catch((err) => console.log("❌ Erro no Banco:", err));

// ROTA DA API QUE O WEB VAI CHAMAR
app.get("/api/logs", scanController.getAllScans);

app.listen(3000, () => {
    console.log(`🚀 API RotuScan rodando na porta 3000`);
});