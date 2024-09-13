from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Configuração da chave secreta para assinar os tokens
app.config['JWT_SECRET_KEY'] = 'minha_chave_secreta'
jwt = JWTManager(app)

LOG_FILE_PATH = '../logs/logs.txt'

# Função para gravar logs no arquivo
def log_to_file(message):
    with open(LOG_FILE_PATH, 'a') as log_file:
        log_file.write(message + '\n')

# Simulação de um banco de dados de usuários
users_db = {
    "admin": {"password": "1234"},
}

# Rota para fazer login e gerar o token JWT
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Verifica se o usuário existe e a senha está correta
    user = users_db.get(username)
    if not user or user["password"] != password:
        return jsonify({"message": "Usuário ou senha incorretos"}), 401

    # Gera um token JWT válido para o usuário
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200

# Rota para capturar eventos de envio de holerites (autenticada)
@app.route('/api/send-holerite', methods=['POST'])
@jwt_required()  # Exige que o usuário esteja autenticado
def send_holerite():
    data = request.json  # Recebe os dados enviados do frontend
    log_message = f"Holerite enviado para {data['nome']} ({data['email']}) por {get_jwt_identity()}"
    log_to_file(log_message)  # Escreve o log no arquivo
    return jsonify({"message": "Holerite enviado com sucesso!"}), 200

# Rota para acessar os logs (autenticada)
@app.route('/api/logs', methods=['GET'])
@jwt_required()  # Exige que o usuário esteja autenticado
def get_logs():
    if not os.path.exists(LOG_FILE_PATH):
        return jsonify({"message": "Nenhum log encontrado"}), 404

    with open(LOG_FILE_PATH, 'r') as log_file:
        logs = log_file.readlines()

    return jsonify(logs), 200

if __name__ == '__main__':
    if not os.path.exists('../logs'):
        os.makedirs('../logs')  # Garante que a pasta de logs exista
    app.run(debug=True, host='0.0.0.0')
