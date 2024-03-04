// Função para restaurar o tamanho padrão da fonte
function restaurarFonte() {
  // Seleciona todos os elementos de texto comuns no corpo do documento
  var elementosDeTexto = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, td, th');

  // Itera sobre cada elemento de texto
  elementosDeTexto.forEach(function(elemento) {
    // Verifica se o tamanho original da fonte está armazenado no dataset
    if (elemento.dataset.tamanhoOriginal) {
      // Obtém o tamanho original da fonte do dataset
      var tamanhoOriginal = parseFloat(elemento.dataset.tamanhoOriginal);

      // Aplica o tamanho original da fonte ao elemento
      elemento.style.fontSize = tamanhoOriginal + "px";
    }
  });

  // Limpa o dataset de tamanhos originais
  elementosDeTexto.forEach(function(elemento) {
    delete elemento.dataset.tamanhoOriginal;
  });
}

// Variável para rastrear o número de cliques
var contadorCliques = 0;

// Função para diminuir o tamanho da fonte
function diminuir() {
  // Incrementa o contador de cliques a cada chamada da função
  contadorCliques++;

  // Verifica se o número de cliques é maior que 2
  if (contadorCliques > 2) {
    // Se for maior que 2, redefine o contador de cliques para 0
    contadorCliques = 0;
    // Chama a função para restaurar o tamanho padrão da fonte
    restaurarFonte();
    // Sai da função para evitar que o código restante seja executado
    return;
  }

  // Seleciona os elementos de texto comuns no corpo do documento
  var elementosDeTexto = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, td, th');

  // Itera sobre cada elemento de texto e ajusta o tamanho da fonte
  elementosDeTexto.forEach(function(elemento) {
    // Verifica se o tamanho original da fonte já foi armazenado para este elemento
    if (!elemento.dataset.tamanhoOriginal) {
      // Se não foi armazenado, armazena o tamanho atual da fonte como o tamanho original
      elemento.dataset.tamanhoOriginal = window.getComputedStyle(elemento).fontSize;
    }

    // Obtém o tamanho da fonte atual
    var estiloAtual = window.getComputedStyle(elemento).fontSize;
    var tamanhoAtual = parseFloat(estiloAtual);

    // Diminui o tamanho da fonte em 0.75x
    var novoTamanho = tamanhoAtual * 0.75;

    // Aplica o novo tamanho da fonte ao elemento
    elemento.style.fontSize = novoTamanho + "px";
  });
}
