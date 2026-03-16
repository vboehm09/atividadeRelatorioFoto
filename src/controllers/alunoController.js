import AlunoModel from '../models/AlunoModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { nome, escola, turma, foto } = req.body;

        if (!nome) return res.status(400).json({ error: 'O campo "nome" é obrigatório!' });

        const aluno = new AlunoModel({ nome, escola, turma, foto });
        const data = await aluno.criar();

        res.status(201).json({ message: 'Registro do aluno criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar registro de aluno:', error);
        res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await AlunoModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(200).json({ message: 'Nenhum registro encontrado.' });
        }

        res.json(registros);
    } catch (error) {
        console.error('Erro ao buscar registros de alunos:', error);
        res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const aluno = await AlunoModel.buscarPorId(parseInt(id));

        if (!aluno) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        res.json({ data: aluno });
    } catch (error) {
        console.error('Erro ao buscar registro de aluno:', error);
        res.status(500).json({ error: 'Erro ao buscar registro.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const aluno = await AlunoModel.buscarPorId(parseInt(id));

        if (!aluno) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) aluno.nome = req.body.nome;
        if (req.body.escola !== undefined) aluno.escola = req.body.escola;
        if (req.body.turma !== undefined) aluno.turma = req.body.turma;
        if (req.body.foto !== undefined) aluno.foto = req.body.foto;

        const data = await aluno.atualizar();

        res.json({ message: `O registro "${data.nome}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar registro de aluno:', error);
        res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const aluno = await AlunoModel.buscarPorId(parseInt(id));

        if (!aluno) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await aluno.deletar();

        res.json({ message: `O registro "${aluno.nome}" foi deletado com sucesso!`, deletado: aluno });
    } catch (error) {
        console.error('Erro ao deletar registro de aluno:', error);
        res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
