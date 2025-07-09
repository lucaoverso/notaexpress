const quill = new Quill('#editor', {
  theme: 'snow',
  placeholder: 'Escreva sua nota aqui...',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ header: [1, 2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'code'],
      ['clean']
    ]
  }
});

function acao(tipo) {
  const nota = document.getElementById("editorDiv");
  const arquivo = document.getElementById("arquivo");

  const notaAtiva = !nota.classList.contains("desativado");
  const arquivoAtivo = !arquivo.classList.contains("desativado");

  if (tipo === "nota") {
    if (notaAtiva) {
      nota.classList.add("desativado"); // oculta se já estiver visível
    } else {
      nota.classList.remove("desativado");
      arquivo.classList.add("desativado"); // oculta o outro
    }
  } else if (tipo === "arquivo") {
    if (arquivoAtivo) {
      arquivo.classList.add("desativado");
    } else {
      arquivo.classList.remove("desativado");
      nota.classList.add("desativado");
    }
  }
}

const form = document.getElementById('formNota');
const resposta = document.getElementById('resposta');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const conteudo = quill.root.innerHTML.trim();
  const arquivo = document.getElementById('arquivo').files[0];

  const formData = new FormData();
  if (arquivo) {
    formData.append('arquivo', arquivo);
  } else {
    formData.append('conteudo', conteudo);
  }

  try {
    const res = await fetch('/notas', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();

    if (res.ok) {
      resposta.innerHTML = `✅ Salvo com sucesso! Código de acesso: <strong>${data.codigo}</strong>`;
      form.reset();
      quill.root.innerHTML = '';
    } else {
      resposta.innerText = '❌ Erro ao salvar a nota.';
    }
  } catch (err) {
    resposta.innerText = '❌ Erro de conexão com o servidor.';
  }
});

function buscarNota() {
  const codigo = document.getElementById('codigo').value.trim();
  if (codigo !== '') {
    window.location.href = `/nota.html?codigo=${encodeURIComponent(codigo)}`;
  } else {
    alert('Digite um código válido.');
  }
}