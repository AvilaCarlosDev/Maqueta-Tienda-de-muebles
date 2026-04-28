# Security Policy

## Vulnerabilidades Conocidas (Abril 2026)

### Resumen
- **Total:** 24 vulnerabilidades
- **High:** 9
- **Moderate:** 6
- **Low:** 9

### Origen
Las vulnerabilidades provienen de dependencias de `react-scripts@5.0.1`:
- `webpack-dev-server` - Dependencias desactualizadas
- `workbox-webpack-plugin` - Dependencias con vulnerabilidades conocidas
- `serialize-javascript` - Requiere actualización mayor
- `underscore` - Versión desactualizada en `jsonpath`

### Plan de Mitigación

#### Corto Plazo (Semana 1)
- [x] Aplicar `npm audit fix` para correcciones no destructivas
- [ ] Monitorear advisories de seguridad semanalmente
- [ ] Documentar nuevas vulnerabilidades

#### Mediano Plazo (Mes 1)
- [ ] Migrar de Create React App a Vite
- [ ] Actualizar `react-scripts` a la última versión estable
- [ ] Reemplazar `workbox-webpack-plugin` con alternativas modernas

#### Largo Plazo (Mes 2-3)
- [ ] Implementar SCA (Software Composition Analysis) en CI/CD
- [ ] Configurar Dependabot o Renovate para actualizaciones automáticas
- [ ] Establecer política de actualización mensual de dependencias

### Comandos Útiles

```bash
# Ver vulnerabilidades detalladas
npm audit

# Aplicar correcciones seguras
npm audit fix

# Ver árbol de dependencias vulnerables
npm ls <paquete-vulnerable>

# Actualizar dependencias (con precaución)
npm update

# Forzar actualizaciones (solo en entorno de desarrollo)
npm audit fix --force
```

### Referencias
- [NPM Audit Documentation](https://docs.npmjs.com/cli/v10/commands/npm-audit)
- [GitHub Security Advisories](https://github.com/advisories)
- [Snyk Vulnerability Database](https://security.snyk.io/)

---
*Última actualización: 2026-04-28*
*Responsable: AvilaCarlosDev*
