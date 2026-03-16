import express from 'express';
import 'dotenv/config';
import alunosRoutes from './routes/alunoRoute.js';
import fotoRoutes from './routes/fotoRoute.js';
import pdfRoutes from './routes/pdfRoute.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/alunos', alunosRoutes);
app.use('/alunos', fotoRoutes);
app.use('/alunos', pdfRoutes);
app.use('/uploads', express.static('uploads'));

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
