import pandas as pd
import os

def analyze_csv(file_path):
    # Verifica se o arquivo existe
    if not os.path.exists(file_path):
        print(f"Erro: O arquivo {file_path} não foi encontrado.")
        return

    # Lê o CSV
    try:
        df = pd.read_csv(file_path)
    except Exception as e:
        print(f"Erro ao ler o arquivo CSV: {e}")
        return

    # Exibe informações básicas
    print(f"Analisando o arquivo: {file_path}")
    print("Resumo dos dados:")
    print(df.describe(include='all'))

    # Verifica valores nulos
    print("\nValores nulos por coluna:")
    print(df.isnull().sum())

    # Gera um relatório simples
    output_file = "relatorio_resumo.csv"
    df.describe(include='all').to_csv(output_file)
    print(f"\nResumo salvo em: {output_file}")

# Exemplo de uso
if __name__ == "__main__":
    caminho = input("Digite o caminho do arquivo CSV: ")
    analyze_csv(caminho)
