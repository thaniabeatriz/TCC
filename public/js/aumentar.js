// Função para restaurar o tamanho padrão da fonte
function restaurarFonte() {
  var elementosDeTexto = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, td, th');
  elementosDeTexto.forEach(function(elemento) {
    if (elemento.dataset.tamanhoOriginal) {
      var tamanhoOriginal = parseFloat(elemento.dataset.tamanhoOriginal);
      elemento.style.fontSize = tamanhoOriginal + "px";
    }
  });
  elementosDeTexto.forEach(function(elemento) {
    delete elemento.dataset.tamanhoOriginal;
  });
  
    var cards = document.querySelectorAll('.conteudo-ongs .card');
    cards.forEach(function(card) {
      var widthAtual = parseFloat(getComputedStyle(card).width);
      card.style.width = widthAtual / 1.1 + "px"; // Reduz em 10%
    });
}

var contadorCliques = 0;

function aumentar() {
  contadorCliques++;
  if (contadorCliques > 1) {
    contadorCliques = 0;
    restaurarFonte();
    return;
  }

  var elementosDeTexto = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, td, th');

  elementosDeTexto.forEach(function(elemento) {
    if (!elemento.dataset.tamanhoOriginal) {
      elemento.dataset.tamanhoOriginal = window.getComputedStyle(elemento).fontSize;
    }

    var estiloAtual = window.getComputedStyle(elemento).fontSize;
    var tamanhoAtual = parseFloat(estiloAtual);

    var novoTamanho = tamanhoAtual * 1.5;

    elemento.style.fontSize = novoTamanho + "px";

  });

  // Aumenta o width dos cards dentro da div conteudo-ongs
  var cards = document.querySelectorAll('.conteudo-ongs .card');
  cards.forEach(function(card) {
    var widthAtual = parseFloat(getComputedStyle(card).width);
    card.style.width = widthAtual * 1.1 + "px"; // Aumenta em 10%
  });
}
