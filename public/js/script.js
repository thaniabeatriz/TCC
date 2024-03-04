document.addEventListener('DOMContentLoaded', function () {
    const resultados = document.getElementById('lista-ongs');

    // Fetch para obter o arquivo CSV gerado pelo main.py
    fetch('../py/resultados_ongs_abrigos.csv')
        .then(response => response.text())
        .then(csv => {
            const rows = csv.split('\n');
            const gridContainer = document.createElement('div');
            gridContainer.classList.add('conteudo-ongs', 'grid-container');
            rows.forEach(row => {
                const [title, link] = row.split(';');
                if (title && link) {
                    const card = createCard(title, link);
                    gridContainer.appendChild(card);
                }
            });
            resultados.appendChild(gridContainer);
        })
        .catch(error => console.error('Error fetching CSV:', error));
});

function createCard(title, link) {

    var imgIndex = Math.floor((Math.random() * 6 ) + 1);
    const card = document.createElement('div');
    card.classList.add('card');

    const icon = document.createElement('img');
    icon.classList.add('icon');
    icon.src =  `img/undraw${imgIndex}.png`
    icon.alt = "Icones variados de cachorros e gatos"
    icon.textContent = '🐕'; 
    card.appendChild(icon);

    const cardTitle = document.createElement('p');
    cardTitle.textContent = title;
    card.appendChild(cardTitle);

    const learnMoreLink = document.createElement('a');
    learnMoreLink.href = link;
    learnMoreLink.textContent = 'Saiba mais';
    learnMoreLink.target = '_blank';
    card.appendChild(learnMoreLink);

    return card;
}
