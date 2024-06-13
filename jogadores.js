let dados;

const conteudo = document.createElement('div');
conteudo.className = 'conteudo'
conteudo.innerHTML = 'carregando...';
document.body.appendChild(conteudo);

const handleClick = ( evento ) => {
    const card = evento.target.closest('article'); 
    for (const propriedade in card.dataset){
        
        //cookies
        document.cookie = `${propriedade}=${card.dataset[propriedade]}`;

        //localStorage item por item
        //localStorage.setItem(propriedade, card.dataset[propriedade]);

    }


    localStorage.setItem('atleta', JSON.stringify(card.dataset))

    window.location.href = `outra.html?elenco=${card.dataset.elenco}&altura=${card.dataset.altura}`;
}

const acha_cookie = ( chave ) => {
    const array_cookies = document.cookie.split("; ");
    const procurado = array_cookies.find(
        ( e ) => e.startsWith(`${chave}=`))
    return procurado?.split('=')[1];
}


const montaCard = (entrada) =>{
    const card = document.createElement('article')

    card.dataset.id = entrada.id;
    card.dataset.nome = entrada.nome;
    card.dataset.imagem = entrada.imagem;
    card.dataset.jogos = entrada.n_jogos;
    card.dataset.posicao = entrada.posicao;
    card.dataset.naturalidade = entrada.naturalidade;
    card.dataset.nascimento = entrada.nascimento;
    card.dataset.altura = entrada.altura;
    card.dataset.detalhes = entrada.detalhes;
    card.dataset.elenco = entrada.elenco;

    card.onclick = handleClick;


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