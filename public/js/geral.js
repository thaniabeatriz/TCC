$( document ).ready(function() {

    // VERIFICA SE BOTÃO DE CONTRASTE ESTÁ ATIVADO NA PÁGINA
    var verificaContraste = localStorage.getItem("contraste");
    if (verificaContraste === "1") {
        definicoesContraste();
    }

});

function contraste() { //Ao clicar

    /* VERIFICA SE A PESSOA CLICOU NO BOTÃO DE CONTRATE, 
       CASO ESTEJA JÁ ATIVO, ELE FAZ O REFRESH NA PÁGINA PARA VOLTAR AS CONFIGURAÇÕES PADRÃO */
    var verificaContraste = localStorage.getItem("contraste");
    if (verificaContraste === "1") {
        
        localStorage.setItem("contraste", "0");
        location.reload();

    } else {
        
        definicoesContraste();

        // Define um cookie de navegador para guardar as informações de contraste
        localStorage.setItem("contraste", "1");
    }

}

function definicoesContraste() {
    $("body").css("background-color","black");
    $(".header").css("background-color","#1f6d00");
    $("body").css("color","white");
    $(".carrossel").css("background-color","black");
    $(".motivacional").css("background-color","black");
    $("a").css("color","#EEFF00");
    $(".botao-contraste").css("background-color","#1f6d00");
    $(".botao-contribuir").css("background-color","#ff5b0e");
    $(".frase-motivacional").css("background-color","black");
    $(".ongs a").css("color","#EEFF00");
    $(".ongs a").css("background-color","black");
}