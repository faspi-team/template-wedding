# Generador de Invitaciones

Una aplicación web moderna para crear y gestionar invitaciones digitales con URLs únicas.

## Características

- 📝 **Creación de invitaciones personalizadas**
- 🔗 **URLs únicas para cada invitación**
- 📱 **Diseño responsive**
- 🎨 **Múltiples plantillas**
- 📊 **Dashboard con estadísticas**
- ✨ **Interfaz moderna con Bootstrap**

## Tecnologías

- **Frontend**: Nuxt 3 + Vue 3 + TypeScript
- **UI**: Bootstrap 5 + Tabler Icons
- **Deployment**: Vercel/Netlify

## Configuración

### 1. Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## Uso

### 1. Crear Invitaciones

1. Ve a "Invitaciones" en el menú lateral
2. Haz clic en "Nueva Invitación"
3. Completa el formulario con los datos del evento
4. Selecciona una plantilla
5. Guarda la invitación

### 2. Compartir Invitaciones

- Cada invitación genera una URL única
- Comparte la URL con tus invitados
- Los invitados pueden ver la invitación y confirmar asistencia

### 3. Ver Estadísticas

- El dashboard muestra estadísticas de tus invitaciones
- Ve las invitaciones recientes
- Monitorea las confirmaciones de asistencia

## Estructura del Proyecto

```
├── components/          # Componentes reutilizables
├── composables/         # Composables de Vue
│   ├── useAuth.ts      # Autenticación
│   └── useInvitations.ts # Gestión de invitaciones
├── layouts/            # Layouts de la aplicación
│   └── classic.vue     # Layout principal
├── middleware/         # Middleware de autenticación
├── pages/             # Páginas de la aplicación
│   ├── invitations/   # Gestión de invitaciones
│   └── index.vue      # Página principal
├── plugins/           # Plugins de Nuxt
├── public/            # Archivos estáticos
├── server/            # Configuración del servidor
├── types/             # Tipos TypeScript
└── utils/             # Utilidades
```

## Características Técnicas

### Frontend
- Nuxt 3 con SSR
- Vue 3 Composition API
- TypeScript para type safety
- Bootstrap 5 para el diseño

### Funcionalidades
- ✅ Crear invitaciones
- ✅ URLs únicas
- ✅ Vista pública de invitaciones
- ✅ Dashboard con estadísticas
- ✅ Gestión de plantillas
- ✅ Sistema de RSVP (preparado)
- ✅ Responsive design

## Nota Importante

**Las funcionalidades de backend (autenticación, base de datos, almacenamiento) han sido removidas.** 

Los composables (`useAuth`, `useInvitations`, `useFileUpload`, `useMusic`) están preparados para ser implementados con un backend alternativo. Actualmente muestran advertencias en la consola indicando que las funcionalidades no están implementadas.

## Próximas Características

- [ ] Implementar backend alternativo
- [ ] Sistema de autenticación
- [ ] Sistema de RSVP completo
- [ ] Más plantillas de diseño
- [ ] Personalización avanzada
- [ ] Notificaciones por email
- [ ] Exportación de datos
- [ ] Múltiples idiomas

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## Licencia

MIT License - ver el archivo LICENSE para más detalles.
