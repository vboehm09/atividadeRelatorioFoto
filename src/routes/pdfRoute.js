import express from 'express';
import { relatorioPorId, relatorioTodos } from '../controllers/pdfController.js';

const router = express.Router();

router.get('/relatorio/pdf', relatorioTodos);
router.get('/relatorio/:id', relatorioPorId);

export default router;