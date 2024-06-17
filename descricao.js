const montaCard = (entrada) =>{
    const card = document.createElement('article')
    card.innerHTML += `
        <div class="card">
            <div class="img-container">
                <img src="${entrada.imagem}" alt="${entrada.nome}">
            </div>
            <h3 class="nome">${entrada.nome}</h3>
        </div>
        <div class="descricao">
            <p class="detalhes">${entrada.detalhes}</p>
            <p class="jogos"> <strong>Jogos pelo menor time do rio:</strong> ${entrada.jogos}</p>
            <p class="altura"> <strong>Altura:</strong> ${entrada.altura}</p>
            <p class="naturalidade"><strong>Narturalidade:</strong> ${entrada.naturalidade}</p>
            <p class="nascimento"><strong>Nascimento:</strong> ${entrada.nascimento}</p>
        </div>

        <button class="voltar">Voltar</button>
    
    `;

    card.querySelector('.voltar').onclick = () => {
        window.location.href = 'jogadores.html';
    };

    return card;
}


obj = JSON.parse(localStorage.getItem('atleta'));

const parametros = new URLSearchParams(window.location.search);
obj.alturaPelaUrl = parametros.get('altura');
obj.elencoPelaUrl = parametros.get('elenco');

document.body.appendChild(montaCard(obj));