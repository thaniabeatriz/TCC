import requests
from bs4 import BeautifulSoup
import csv
import re
from datetime import datetime

def remove_caracteres_especiais(text):
    text_sem_caracteres_especiais = re.sub(r'\s', ' ', re.sub(r'[^@\w\s()]+', '', text)).strip()
    text_sem_caracteres_indesejados = text_sem_caracteres_especiais.replace('â€¢ Ð¡Ð½Ð¸Ð¼ÐºÐ¸ Ð¸', '')
    return text_sem_caracteres_indesejados

#Função para fazer a pesquisa no google
def obter_titulos_links(query, limite=5):
    url = f'https://www.google.com/search?q={query}'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

    # faz a req http
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    # encontra os elementos 'a' dentro das tags 'div' com a classe 'tF2Cxc'
    links = soup.select('div.tF2Cxc a')

    # armazena titulos unicos
    titulos_unicos = set()

    # lista para armazenar os resultados
    resultados = []

    # Itera sobre os links até atingir o limite
    for link in links[:limite]:
        title = link.find('h3')
        if title:
            # verifica se o titulo ja foi encontrado antes /p evitar duplicidade
            title_text = title.text
            title_text_sem_caracteres_especiais = remove_caracteres_especiais(title_text)
            if title_text_sem_caracteres_especiais not in titulos_unicos:
                titulos_unicos.add(title_text_sem_caracteres_especiais)
                resultados.append({'Titulo': title_text_sem_caracteres_especiais, 'Link': link['href']})

    return resultados

# Informações para o log
query = "instagram ong de animais em porto velho"
hora_inicio = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

log_filename = "log_processamento.txt"

with open(log_filename, 'a', encoding='utf-8') as log_file:
    log_file.write(f"Busca pesquisada: {query}\n")
    log_file.write(f"Hora de início da busca: {hora_inicio}\n")

# Realizando a pesquisa utilizando a query e limitando a 6, passando isso como parâmetro na função de pesquisa
resultados = obter_titulos_links(query, limite=6)

# Armazenando os resultados da pesquisa no arquivo csv
csv_filename = "resultados_ongs_abrigos.csv"

# Escrevendo os resultados (titulo e link) no arquivo CSV
with open(csv_filename, 'w', newline='', encoding='utf-8-sig') as csv_file:
    writer = csv.DictWriter(csv_file, fieldnames=['Titulo', 'Link'], delimiter=';')
    for resultado in resultados:
        writer.writerow(resultado)

#  Passando a data de fim da busca para o log
hora_fim = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# Escrevendo informações de conclusão no arquivo de log
with open(log_filename, 'a', encoding='utf-8') as log_file:
    log_file.write(f"Hora de fim da busca: {hora_fim}\n")
    log_file.write("------\n")

print(f"Resultados salvos em {csv_filename}")
print(f"Log de processamento salvo em {log_filename}")