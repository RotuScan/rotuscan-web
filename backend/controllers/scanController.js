import ScanLog from "../models/ScanLog.js";

const getAllScans = async (req, res) => {
    try {
        // Busca todos os logs no banco, ordenando do mais novo pro mais velho
        const logs = await ScanLog.find().sort({ dataScan: -1 });
        res.status(200).json({ logs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao buscar os logs do scanner.' });
    }
}

export default { getAllScans };