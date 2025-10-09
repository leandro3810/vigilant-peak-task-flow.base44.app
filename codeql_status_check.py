import requests
import os

# Configurações
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
REPO_OWNER = "seu-usuario-ou-org"
REPO_NAME = "seu-repositorio"

if not GITHUB_TOKEN:
    print("Error: GITHUB_TOKEN environment variable is not set. Please set it to authenticate with GitHub.")
    exit(1)

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github+json"
}

# Função para buscar alertas do CodeQL
def get_codeql_alerts():
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/code-scanning/alerts"
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            return response.json()
        else:
            print("Erro ao buscar alertas:", response.status_code, response.text)
            return []
    except requests.Timeout:
        print("Erro: requisição ao GitHub API excedeu o tempo limite.")
        return []
    except requests.RequestException as e:
        print("Erro ao buscar alertas:", str(e))
        return []

# Exibe os alertas encontrados
def show_alerts(alerts):
    if not alerts:
        print("Nenhum alerta CodeQL encontrado.")
    else:
        print("Alertas CodeQL encontrados:")
        for alert in alerts:
            print(f"- [{alert['rule']['name']}] {alert['description']}")
            print(f"  Severidade: {alert['severity']}")
            print(f"  Estado: {alert['state']}")
            print(f"  URL: {alert['html_url']}\n")

if __name__ == "__main__":
    alerts = get_codeql_alerts()
    show_alerts(alerts)
