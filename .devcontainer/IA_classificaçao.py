from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Carregar o conjunto de dados Iris
data = load_iris()
X = data.data  # Features
y = data.target  # Labels

# Dividir os dados entre treino e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Criar e treinar o modelo
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Fazer previsões
y_pred = model.predict(X_test)

# Avaliar o modelo
accuracy = accuracy_score(y_test, y_pred)
print(f"Acurácia do modelo: {accuracy:.2f}")

# Exemplo de uso: prever a classe de uma nova amostra
new_sample = [[5.1, 3.5, 1.4, 0.2]]  # Exemplo de dados
prediction = model.predict(new_sample)
print(f"Classe prevista para a nova amostra: {data.target_names[prediction][0]}")
