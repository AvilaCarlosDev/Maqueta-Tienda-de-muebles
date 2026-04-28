/**
 * Sistema de Rate Limiting
 *
 * Este módulo proporciona funciones para limitar la frecuencia de las peticiones
 * a la API y prevenir ataques de fuerza bruta.
 */

class RateLimiter {
  constructor() {
    this.requests = new Map();
    this.config = {
      windowMs: 15 * 60 * 1000, // 15 minutos
      maxRequests: 100, // Máximo 100 peticiones por ventana
      blockDuration: 60 * 60 * 1000, // 1 hora de bloqueo
    };
  }

  /**
   * Verifica si una petición está permitida
   * @param {string} key - Identificador único (IP, usuario, etc.)
   * @returns {Object} - Resultado de la verificación
   */
  check(key) {
    const now = Date.now();
    const requestData = this.requests.get(key) || {
      count: 0,
      firstRequest: now,
      blockedUntil: 0,
    };

    // Si está bloqueado
    if (now < requestData.blockedUntil) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: requestData.blockedUntil,
        message: "Demasiadas peticiones. Intente más tarde.",
      };
    }

    // Si la ventana de tiempo ha expirado
    if (now - requestData.firstRequest > this.config.windowMs) {
      requestData.count = 0;
      requestData.firstRequest = now;
    }

    // Si se ha excedido el límite
    if (requestData.count >= this.config.maxRequests) {
      requestData.blockedUntil = now + this.config.blockDuration;
      this.requests.set(key, requestData);
      return {
        allowed: false,
        remaining: 0,
        resetTime: requestData.blockedUntil,
        message: "Demasiadas peticiones. Cuenta bloqueada temporalmente.",
      };
    }

    // Incrementar contador
    requestData.count++;
    this.requests.set(key, requestData);

    return {
      allowed: true,
      remaining: this.config.maxRequests - requestData.count,
      resetTime: requestData.firstRequest + this.config.windowMs,
    };
  }

  /**
   * Limpia las peticiones antiguas
   */
  cleanup() {
    const now = Date.now();
    for (const [key, data] of this.requests.entries()) {
      if (
        now - data.firstRequest > this.config.windowMs &&
        now > data.blockedUntil
      ) {
        this.requests.delete(key);
      }
    }
  }

  /**
   * Configura los límites
   * @param {Object} config - Nueva configuración
   */
  setConfig(config) {
    this.config = {
      ...this.config,
      ...config,
    };
  }

  /**
   * Obtiene el estado actual de un identificador
   * @param {string} key - Identificador a consultar
   * @returns {Object} - Estado actual
   */
  getStatus(key) {
    const data = this.requests.get(key);
    if (!data) {
      return {
        count: 0,
        blocked: false,
        remaining: this.config.maxRequests,
      };
    }

    return {
      count: data.count,
      blocked: Date.now() < data.blockedUntil,
      remaining: this.config.maxRequests - data.count,
      resetTime: data.firstRequest + this.config.windowMs,
    };
  }
}

// Exportar una instancia única del rate limiter
export const rateLimiter = new RateLimiter();

// Limpiar peticiones antiguas cada 5 minutos
setInterval(() => rateLimiter.cleanup(), 5 * 60 * 1000);
