const alvo = 'ad820de7200cf1c42d0d28465b4df85b287363e8b48c5241845eb74b5a93632f';

document.getElementById('btn_login').onclick = () => {
    const entrada = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');
    if (hex_sha256(entrada) === alvo){
        mensagem.innerHTML = "<h2>Senha correta.</h2>";
        sessionStorage.setItem('logado', 1);
        window.location.href = 'jogadores.html';
    } else {
        window.alert("Senha Errada")
    }
}