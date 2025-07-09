import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import notaRoutes from './controllers/notaController.js';

const app = express();

// Suporte a JSON e form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Arquivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use(express.static(path.resolve(__dirname, 'public')));

// Rotas
app.use(notaRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
