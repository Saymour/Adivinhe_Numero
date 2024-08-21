let listaDeNumerosEscolhido = [];
let limite = 100;
let numeroSecreto = '';
let tentativas = 1;

gerarNumeroAleatorio();
exibirMensagemInicial();

function exibirMensagemInicial() {
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p',`Escolha um número entre 1 e ${limite}`);
}

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function limpaCampo(tag){
    let campo = document.querySelector(tag);
    campo.value = '';
}

function gerarNumeroAleatorio() {
    if( listaDeNumerosEscolhido.length == limite ) listaDeNumerosEscolhido = [];
    numeroSecreto = parseInt(Math.random() * limite + 1);
    console.log(numeroSecreto);
    if( listaDeNumerosEscolhido.includes(numeroSecreto) ){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosEscolhido.push(numeroSecreto);
        console.log(listaDeNumerosEscolhido);
    }
}

function verificarChute(){
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    console.log(chute + ' ' + numeroSecreto);

    if( chute == numeroSecreto ){
        exibirTextoNaTela('h1', 'ACERTOU');
        exibirTextoNaTela('p', `Voce descobriu o número secreto em ${tentativas} ${palavraTentativa}.` );
        document.getElementsByClassName('chute container__botoes')[0].firstElementChild.setAttribute('disabled',true);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if( chute > numeroSecreto ) exibirTextoNaTela('p', `O número secreto é MENOR que ${chute}`);
        if( chute < numeroSecreto ) exibirTextoNaTela('p', `O número secreto é MAIOR que ${chute}`);
    }

    limpaCampo('input');
    tentativas++;
}

function reiniciar() {
    limpaCampo('input');
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
    document.getElementsByClassName('chute container__botoes')[0].firstElementChild.removeAttribute('disabled');
    gerarNumeroAleatorio();
}
