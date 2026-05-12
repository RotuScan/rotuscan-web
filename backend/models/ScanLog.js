import mongoose from "mongoose";

// Isso tem que ser igual ao que o seu Mobile salva no MongoDB!
const scanLogSchema = new mongoose.Schema({
    produto: { type: String, required: true },
    veredito: { type: String, enum: ['Seguro', 'Perigoso'] },
    alergenosDetectados: [{ type: String }],
    dataScan: { type: Date, default: Date.now }
});

const ScanLog = mongoose.model("ScanLog", scanLogSchema);
export default ScanLog;