import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente do arquivo .env
load_dotenv()

# Configurações do projeto
DEBUG = os.getenv("DEBUG", "False") == "True"
DATABASE_URL = os.getenv("DATABASE_URL")
API_KEY = os.getenv("API_KEY")

print(f"DEBUG: {DEBUG}")
print(f"DATABASE_URL: {DATABASE_URL}")
print(f"API_KEY: {API_KEY}")
