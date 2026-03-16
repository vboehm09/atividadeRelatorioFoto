import prisma from '../utils/prismaClient.js';

export default class AlunoModel {
    constructor({ id = null, nome, escola = true, turma = null, foto = null } = {}) {
        this.id = id;
        this.nome = nome;
        this.escola = escola;
        this.turma = turma;
        this.foto = foto;
    }

    async criar() {
        return prisma.aluno.create({
            data: {
                nome: this.nome,
                escola: this.escola,
                turma: this.turma,
                foto: this.foto
            },
        });
    }

    async atualizar() {
        return prisma.aluno.update({
            where: { id: this.id },
            data: { nome: this.nome, escola: this.escola, turma: this.turma, foto: this.foto },
        });
    }

    async deletar() {
        return prisma.aluno.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) where.nome = { contains: filtros.nome, mode: 'insensitive' };
        if (filtros.escola !== undefined) where.escola = { equals: filtros.escola === 'true' };
        if (filtros.turma !== undefined) where.turma = { equals: filtros.turma };
        if (filtros.foto !== undefined) where.foto = { equals: filtros.foto };

        return prisma.aluno.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.aluno.findUnique({ where: { id } });
        if (!data) return null;
        return new AlunoModel(data);
    }
}
