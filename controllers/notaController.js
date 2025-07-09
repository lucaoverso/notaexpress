import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import { createNota, getNotaByCodigo } from '../models/notaModel.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Configuração do multer (upload)
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../uploads'),
  filename: (req, file, cb) => {
    const nomeUnico = req.codigo + '-' + file.originalname;
    cb(null, nomeUnico);
  }
});
const upload = multer({ storage });

// POST /notas
router.post('/notas', upload.single('arquivo'), async (req, res) => {
  try {
    const conteudo = req.body.conteudo || null;
    const arquivo = req.file ? req.file.filename : null;
    const tipo = arquivo ? 'arquivo' : 'nota';

    const nota = await createNota({ conteudo, arquivo, tipo });
    res.status(201).json({ mensagem: 'Nota criada com sucesso!', codigo: nota.codigo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao salvar nota' });
  }
});

// GET /notas/:codigo
router.get('/notas/:codigo', async (req, res) => {
  try {
    const codigo = req.params.codigo;
    const nota = await getNotaByCodigo(codigo);

    if (!nota) {
      return res.status(404).json({ erro: 'Nota não encontrada' });
    }

    res.status(200).json(nota);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar nota' });
  }
});

export default router;
