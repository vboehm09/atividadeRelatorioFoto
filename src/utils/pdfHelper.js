import htmlPdf from 'html-pdf-node';
// html-pdf-node é uma biblioteca que converte HTML em PDF usando o mecanismo do Chrome, garantindo alta qualidade e compatibilidade com CSS moderno
import fs from 'fs';

export async function gerarPdfAluno(aluno) {
    let fotoHtml = '-';

    if (aluno.foto) {
        const base64 = fs.readFileSync(aluno.foto).toString('base64');
        // base64 é um formato de codificação que representa dados binários (como imagens) em texto
        fotoHtml = `<img src="data:image/jpeg;base64,${base64}" width="120"/>`;
        // data:image/jpeg;base64, é um formato de URL que permite incorporar diretamente a imagem codificada em base64 no HTML
    }

    const html = `
    <html>
    <body>
        <h1>Relatório do Aluno</h1>

        <p>Foto: ${fotoHtml}</p>
        <p>Nome: ${aluno.nome}</p>
        <p>Escola: ${aluno.escola || '-'}</p>
        <p>Turma: ${aluno.turma || '-'}</p>
    </body>
    </html>
    `;

    return htmlPdf.generatePdf({ content: html }, { format: 'A4' });
}

export async function gerarPdfTodos(alunos) {
    const linhas = alunos
        .map(
            (a) => `
        <tr>
            <td>${a.nome}</td>
            <td>${a.escola || '-'}</td>
            <td>${a.turma || '-'}</td>
            <td>${a.foto || '-'}</td>
        </tr>`,
        )
        .join('');

    const html = `
    <h1 style="text-align: center;">Relatório de Alunos</h1>

    <table border="1" cellspacing="0" cellpadding="8">
        <tr>
            <th>Nome</th>
            <th>Escola</th>
            <th>Turma</th>
            <th>Foto</th>
        </tr>
        ${linhas}
    </table>
        <p>Total: ${alunos.length} alunos</p>
    `;

    return htmlPdf.generatePdf({ content: html }, { format: 'A4' });
}
