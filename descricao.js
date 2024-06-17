const montaCard = (entrada) =>{
    const card = document.createElement('article')
    card.innerHTML += `
        <div class="card">
            <div class="img-container">
                <img src="${entrada.imagem}" alt="${entrada.nome}">
            </div>
            <p class="nome">${entrada.nome}</p>
        </div>
        <div class="descricao">
            <p class="detalhes">${entrada.detalhes}</p>
            <p class="jogos"> Jogos pelo menor time do rio:${entrada.jogos}</p>
            <p class="altura"> Altura:${entrada.altura}</p>
            <p class="naturalidade"> Jogos pelo menor time do rio:${entrada.naturalidade}</p>
            <p class="nascimento"> Jogos pelo menor time do rio:${entrada.nascimento}</p>
        </div>

        <button class="voltar">Voltar</button>
    
    `;

    return card;
}


obj = JSON.parse(localStorage.getItem('atleta'));

const parametros = new URLSearchParams(window.location.search);
obj.alturaPelaUrl = parametros.get('altura');
obj.elencoPelaUrl = parametros.get('elenco');

document.body.appendChild(montaCard(obj));