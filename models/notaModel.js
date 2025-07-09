import db from '../database/db.js';

function gerarCodigoAleatorio(tamanho = 6) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < tamanho; i++) {
        const index = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[index];
    }
    return codigo;
}


export async function createNota({ conteudo = null, arquivo = null, tipo = 'nota' }) {
    return new Promise((resolve, reject) => {
        const codigo = gerarCodigoAleatorio(6);
        const sql = `
      INSERT INTO notas (codigo, conteudo, arquivo, tipo)
      VALUES (?, ?, ?, ?)
    `;
        db.run(sql, [codigo, conteudo, arquivo, tipo], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, codigo });
            }
        });
    });
}

export async function getNotaByCodigo(codigo) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM notas WHERE codigo = ?`;
        db.get(sql, [codigo], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}
