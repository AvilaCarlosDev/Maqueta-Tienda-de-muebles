from flask import Flask, jsonify
from flask_cors import CORS
import os


def create_app() -> Flask:
    app = Flask(__name__)

    # Configuración básica segura
    app.config.update(
        JSON_SORT_KEYS=False,
    )

    # CORS restringido al loopback para desarrollo
    CORS(app, resources={r"/api/*": {"origins": ["http://127.0.0.1:5173"]}})

    @app.get('/api/health')
    def health():
        return jsonify(status='ok', service='backend', version=os.getenv('APP_VERSION', '0.1.0'))

    return app


if __name__ == '__main__':
    port = int(os.getenv('PORT', '5000'))
    app = create_app()
    app.run(host='127.0.0.1', port=port, debug=False)
