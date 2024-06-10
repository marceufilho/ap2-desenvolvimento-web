let dados;

const conteudo = document.createElement('div');
conteudo.className = 'conteudo'
conteudo.innerHTML = 'carregando...';
document.body.appendChild(conteudo);

const montaCard = (entrada) =>{
    const card = document.createElement('article')

    card.dataset.nome = entrada.nome;
    card.dataset.imagem = entrada.imagem;

    card.innerHTML += `
        <div class="card">
            <div class="img-container">
                <img src="${entrada.imagem}" alt="${entrada.nome}">
            </div>
            <p class="nome">${entrada.nome}</p>
            <button class="saiba-mais">Saiba Mais</button>
        </div>
    `;

    return card;
}

const pegaDados = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json()
    return dados;
}

pegaDados("https://botafogo-atletas.mange.li/2024-1/all").then(
    (entrada) => {
        dados = entrada;
        conteudo.innerHTML = '';
        dados.forEach(
            (atleta) => {
                conteudo.appendChild(montaCard(atleta));
            }
        )
    });