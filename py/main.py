import requests
from bs4 import BeautifulSoup
import csv
import re
from datetime import datetime

# Função para remover espaços e caracteres especiais das palavras exceto '@', '(', letras, números
# Também remove espaços extras
def remove_caracteres_especiais(text):
    text_sem_caracteres_especiais = re.sub(r'\s', ' ', re.sub(r'[^@\w\s()]+', '', text)).strip()

    # Remove caracteres específicos
    text_sem_caracteres_indesejados = text_sem_caracteres_especiais.replace('â€¢ Ð¡Ð½Ð¸Ð¼ÐºÐ¸ Ð¸', '')

    return text_sem_caracteres_indesejados

# Função para fazer a pesquisa no google
def obter_titulos_links(query, limite=8):
    url = f'https://www.google.com/search?q={query}'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

    # Realiza a requisição HTTP
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Encontra os elementos 'a' dentro das tags 'div' com a classe 'tF2Cxc'
    links = soup.select('div.tF2Cxc a')

    # Conjunto para armazenar títulos únicos
    titulos_unicos = set()

    # Lista para armazenar os resultados
    resultados = []

    # Itera sobre os links até atingir o limite
    for link in links[:limite]:
        title = link.find('h3')
        if title:
            # Verifica se o título já foi encontrado antes
            title_text = title.text
            title_text_sem_caracteres_especiais = remove_caracteres_especiais(title_text)
            if title_text_sem_caracteres_especiais not in titulos_unicos:
                titulos_unicos.add(title_text_sem_caracteres_especiais)
                resultados.append({'Titulo': title_text_sem_caracteres_especiais, 'Link': link['href']})

    return resultados

# Informações para o log
query = "clinicas veterinarias porto velho instagram"
hora_inicio = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# Caminho do arquivo TXT de log
log_filename = "log_processamento.txt"

# Escreve informações de busca no arquivo de log
with open(log_filename, 'a', encoding='utf-8') as log_file:
    log_file.write(f"Busca pesquisada: {query}\n")
    log_file.write(f"Hora de início da busca: {hora_inicio}\n")

# Pesquisa por ONGs de animais em Porto Velho no Instagram
resultados = obter_titulos_links(query, limite=8)

# Caminho do arquivo CSV
csv_filename = "resultados_clinicas_teste.csv"

# Escreve os resultados no arquivo CSV
with open(csv_filename, 'w', newline='', encoding='utf-8-sig') as csv_file:
    fieldnames = ['Titulo', 'Link']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames, delimiter=';')

    # Escreve o cabeçalho
    writer.writeheader()

    # Escreve os resultados
    for resultado in resultados:
        writer.writerow(resultado)

# Informações para o log
hora_fim = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# Escreve informações de conclusão no arquivo de log
with open(log_filename, 'a', encoding='utf-8') as log_file:
    log_file.write(f"Hora de fim da busca: {hora_fim}\n")
    log_file.write("------\n")

print(f"Resultados salvos em {csv_filename}")
print(f"Log de processamento salvo em {log_filename}")