from flask import Flask, jsonify, request, make_response
import os


ALLOWED_ORIGINS = {"http://127.0.0.1:5173"}
ALLOWED_METHODS = {"GET", "POST", "PUT", "DELETE", "OPTIONS"}
ALLOWED_HEADERS = {"Content-Type", "Authorization"}


def create_app() -> Flask:
    app = Flask(__name__)

    # Configuración básica segura
    app.config.update(
        JSON_SORT_KEYS=False,
    )

    # Middleware CORS seguro sin dependencias externas
    @app.after_request
    def add_cors_headers(response):
        origin = request.headers.get("Origin")
        if origin in ALLOWED_ORIGINS:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Vary"] = "Origin"
            response.headers["Access-Control-Allow-Methods"] = ", ".join(sorted(ALLOWED_METHODS))
            response.headers["Access-Control-Allow-Headers"] = ", ".join(sorted(ALLOWED_HEADERS))
            response.headers["Access-Control-Allow-Credentials"] = "true"
            # No se añade Access-Control-Allow-Private-Network por seguridad
        return response

    # Manejo explícito de preflight
    @app.route('/api/<path:_any>', methods=['OPTIONS'])
    def cors_preflight(_any):
        origin = request.headers.get("Origin")
        if origin in ALLOWED_ORIGINS:
            resp = make_response("", 204)
            resp.headers["Access-Control-Allow-Origin"] = origin
            resp.headers["Vary"] = "Origin"
            resp.headers["Access-Control-Allow-Methods"] = ", ".join(sorted(ALLOWED_METHODS))
            resp.headers["Access-Control-Allow-Headers"] = ", ".join(sorted(ALLOWED_HEADERS))
            resp.headers["Access-Control-Allow-Credentials"] = "true"
            return resp
        return make_response("", 204)

    @app.get('/api/health')
    def health():
        return jsonify(status='ok', service='backend', version=os.getenv('APP_VERSION', '0.1.0'))

    return app


if __name__ == '__main__':
    port = int(os.getenv('PORT', '5000'))
    app = create_app()
    app.run(host='127.0.0.1', port=port, debug=False)
