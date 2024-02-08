document.addEventListener('DOMContentLoaded', function () {
    const resultados = document.getElementById('lista-ongs');

    // Fetch para obter o arquivo CSV gerado pelo main.py
    fetch('../py/resultados_ongs_teste.csv')
        .then(response => response.text())
        .then(csv => {
            const rows = csv.split('\n');
            rows.forEach(row => {
                const [title, link] = row.split(';');
                if (title && link) {
                    const resultElement = document.createElement('div');
                    resultElement.classList.add('result');
                    resultElement.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
                    resultados.appendChild(resultElement);
                }
            });
        })
        .catch(error => console.error('Error fetching CSV:', error));
});