document.addEventListener('DOMContentLoaded', function () {
    const resultados = document.getElementById('lista-ongs');

    // Fetch para obter o arquivo CSV gerado pelo main.py
    fetch('../py/resultados_ongs_abrigos.csv')
        .then(response => response.text())
        .then(csv => {
            const rows = csv.split('\n');
            const lista = document.createElement('ul');
            lista.classList.add('lista-ongs');
            rows.forEach(row => {
                const [title, link] = row.split(';');
                if (title && link) {
                    const listItem = document.createElement('li');
                    const linkElement = document.createElement('a');
                    linkElement.href = link;
                    linkElement.textContent = title;
                    linkElement.target = '_blank';
                    listItem.appendChild(linkElement);
                    lista.appendChild(listItem);
                }
            });
            resultados.appendChild(lista);
        })
        .catch(error => console.error('Error fetching CSV:', error));
});
