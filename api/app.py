from flask import Flask
from flask_cors import CORS
from routes.file_routes import file_bp
from routes.chat_routes import chat_bp
from routes.model_routes import model_bp
from config.config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Register blueprints
app.register_blueprint(file_bp, url_prefix='/api/file')
app.register_blueprint(chat_bp, url_prefix='/api/chat')
app.register_blueprint(model_bp, url_prefix='/api/model')

if __name__ == '__main__':
    app.run(debug=True)