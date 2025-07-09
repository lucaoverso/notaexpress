const params = new URLSearchParams(window.location.search);
const codigo = params.get('codigo');

async function buscarNota() {
    try {
        const res = await fetch(`/notas/${codigo}`);
        if (!res.ok) {
            document.getElementById('conteudo').innerText = '❌ Nota não encontrada';
            return;
        }

        const nota = await res.json();

        if (nota.tipo === 'nota') {
            document.getElementById('conteudo').innerHTML = nota.conteudo;
        } else if (nota.tipo === 'arquivo') {
            document.getElementById('conteudo').innerHTML = `
            <p>📄 Arquivo disponível para download:</p>
            <a class="download" href="/uploads/${nota.arquivo}" download>
              ⬇️ Baixar arquivo
            </a>
          `;
        }
    } catch (err) {
        document.getElementById('conteudo').innerText = 'Erro ao buscar nota';
    }
}

buscarNota();