from flask import Flask
from flask_cors import CORS
from routes.pdf_routes import pdf_bp
from routes.chat_routes import chat_bp
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Register blueprints
app.register_blueprint(pdf_bp, url_prefix='/api/pdf')
app.register_blueprint(chat_bp, url_prefix='/api/chat')

if __name__ == '__main__':
    app.run(debug=True)