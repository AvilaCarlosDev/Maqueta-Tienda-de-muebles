/**
 * Sistema de Logging de Seguridad
 *
 * Este módulo proporciona funciones para registrar eventos de seguridad importantes
 * como intentos de acceso, errores de validación, y otros eventos críticos.
 */

class SecurityLogger {
  constructor() {
    this.logs = [];
    this.maxLogs = 1000; // Límite de logs en memoria
  }

  /**
   * Registra un evento de seguridad
   * @param {string} type - Tipo de evento (auth, validation, error, etc.)
   * @param {string} message - Mensaje descriptivo
   * @param {Object} data - Datos adicionales del evento
   */
  log(type, message, data = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type,
      message,
      data,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Mantener solo los últimos maxLogs registros
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Enviar al servidor en producción
    if (process.env.NODE_ENV === "production") {
      this.sendToServer(logEntry);
    }

    // Registrar en consola en desarrollo
    if (process.env.NODE_ENV === "development") {
      console.log(`[Security] ${type}: ${message}`, data);
    }
  }

  /**
   * Envía el log al servidor
   * @param {Object} logEntry - Entrada de log a enviar
   */
  async sendToServer(logEntry) {
    try {
      const response = await fetch("/api/security/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logEntry),
      });

      if (!response.ok) {
        throw new Error("Error al enviar log de seguridad");
      }
    } catch (error) {
      console.error("Error al enviar log de seguridad:", error);
    }
  }

  /**
   * Registra un intento de acceso fallido
   * @param {string} username - Nombre de usuario intentado
   * @param {string} reason - Razón del fallo
   */
  logFailedAuth(username, reason) {
    this.log("auth_failed", `Intento de acceso fallido para ${username}`, {
      username,
      reason,
      ip: this.getClientIP(),
    });
  }

  /**
   * Registra un error de validación
   * @param {string} component - Componente donde ocurrió el error
   * @param {string} field - Campo con error
   * @param {string} error - Mensaje de error
   */
  logValidationError(component, field, error) {
    this.log("validation_error", `Error de validación en ${component}`, {
      component,
      field,
      error,
    });
  }

  /**
   * Registra un intento de XSS
   * @param {string} input - Input sospechoso
   * @param {string} context - Contexto donde ocurrió
   */
  logXSSTAttempt(input, context) {
    this.log("xss_attempt", `Intento de XSS detectado en ${context}`, {
      input,
      context,
    });
  }

  /**
   * Obtiene la IP del cliente (solo para referencia, no es 100% confiable)
   */
  getClientIP() {
    // En producción, esto debería obtenerse del servidor
    return "127.0.0.1";
  }

  /**
   * Obtiene los logs almacenados
   * @returns {Array} Lista de logs
   */
  getLogs() {
    return [...this.logs];
  }

  /**
   * Limpia los logs almacenados
   */
  clearLogs() {
    this.logs = [];
  }
}

// Exportar una instancia única del logger
export const securityLogger = new SecurityLogger();
