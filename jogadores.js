let dados;

const handleClick = (evento) => {
    const card = evento.target.closest('article');
    for (const propriedade in card.dataset) {
        // cookies
        document.cookie = `${propriedade}=${card.dataset[propriedade]}`;
        // localStorage item por item
        // localStorage.setItem(propriedade, card.dataset[propriedade]);
    }

    localStorage.setItem('atleta', JSON.stringify(card.dataset));
    window.location.href = `descricao.html?elenco=${card.dataset.elenco}&altura=${card.dataset.altura}`;
};

const acha_cookie = (chave) => {
    const array_cookies = document.cookie.split("; ");
    const procurado = array_cookies.find((e) => e.startsWith(`${chave}=`));
    return procurado?.split('=')[1];
};

const montaCard = (entrada) => {
    const card = document.createElement('article');

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

    console.log('Card created:', card); // Debugging log

    return card;
};

const pegaDados = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

if (sessionStorage.getItem('logado')) {
    document.body.innerHTML += `
         <header>
            <h1>Atletas Botafogo 2024-1</h1>
            <button id="logout">Sair</button>
        </header>
        <div class="filtros">
            <div class="botoes">
                <button id="masculino">Masculino</button>
                <button id="feminino">Feminino</button>
                <button id="elenco">Elenco Completo</button>
            </div>
            <input id="busca-nome" type="text" placeholder="BUSQUE POR NOME">
        </div>
    `;
    const conteudo = document.createElement('div');
    conteudo.className = 'conteudo'
    document.body.appendChild(conteudo);
    

    document.getElementById('logout').onclick = () => {
        sessionStorage.removeItem('logado');
    };

    document.getElementById('masculino').onclick = () => {
        console.log('Botão Masculino clicado');
        pegaDados("https://botafogo-atletas.mange.li/2024-1/masculino").then(
            (entrada) => {
                console.log('Dados recebidos', entrada);
                dados = entrada;
                conteudo.innerHTML = '';
                dados.forEach((atleta) => {
                    console.log('Adicionando card para', atleta);
                    conteudo.appendChild(montaCard(atleta));
                });
            }
        );
    };

    document.getElementById('feminino').onclick = () => {
        console.log('Botão Feminino clicado');
        pegaDados("https://botafogo-atletas.mange.li/2024-1/feminino").then(
            (entrada) => {
                console.log('Dados recebidos', entrada);
                dados = entrada;
                conteudo.innerHTML = '';
                dados.forEach((atleta) => {
                    console.log('Adicionando card para', atleta);
                    conteudo.appendChild(montaCard(atleta));
                });
            }
        );
    };

    document.getElementById('elenco').onclick = () => {
        console.log('Botão Feminino clicado');
        pegaDados("https://botafogo-atletas.mange.li/2024-1/all").then(
            (entrada) => {
                console.log('Dados recebidos', entrada); 
                dados = entrada;
                conteudo.innerHTML = '';
                dados.forEach((atleta) => {
                    console.log('Adicionando card para', atleta); 
                    conteudo.appendChild(montaCard(atleta));
                });
            }
        );
    };
    
    document.getElementById('busca-nome').onkeyup = (ev) =>{
        const filtrado = dados.filter(
            (elemento) => {
                const estaNoNome = elemento.nome.toLowerCase().includes(ev.target.value.toLowerCase());
                const estaNaPosicao = elemento.posicao.toLowerCase().includes(ev.target.value.toLowerCase());
                return estaNoNome || estaNaPosicao;
            }
        )
    
        conteudo.innerHTML = '';
    
        filtrado.forEach(
            (atleta) => {
                conteudo.appendChild(montaCard(atleta));
            }
        )
    };
    
}