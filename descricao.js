const montaCard = (entrada) =>{
    const card = document.createElement('article')
    card.innerHTML = `
        
    
    `
}


obj = JSON.parse(localStorage.getItem('atleta'));

const parametros = new URLSearchParams(window.location.search);
obj.alturaPelaUrl = parametros.get('altura');
obj.elencoPelaUrl = parametros.get('elenco');

document.body.appendChild(montaCard(obj));