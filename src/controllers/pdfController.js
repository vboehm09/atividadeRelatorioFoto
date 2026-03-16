import AlunoModel from '../models/AlunoModel.js';
import { gerarPdfTodos, gerarPdfAluno } from '../utils/pdfHelper.js';

export const relatorioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const aluno = await AlunoModel.buscarPorId(parseInt(id));

        if (!aluno) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        const pdf = await gerarPdfAluno(aluno);
        return res
            .set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `inline; filename="aluno_${id}.pdf"`,
            })

            .send(pdf);
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        return res.status(500).json({ error: 'Erro ao gerar relatório.' });
    }
};
