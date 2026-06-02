from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from routes.auth import auth_bp
from routes.events import events_bp
from routes.registrations import registrations_bp

load_dotenv()

app = Flask(__name__)
# Enable CORS for Vite dev server
CORS(app, resources={r"/api/*": {"origins": "*"}})

app.register_blueprint(auth_bp)
app.register_blueprint(events_bp)
app.register_blueprint(registrations_bp)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=True)
