# Roman Number Converter - Development Journey

A concise overview of the development process for a full-stack Roman numeral converter application. For detailed implementation notes and technical decisions, see [Detailed Development Journey](./DEVELOPMENT_JOURNEY.md).

## Key Technical Decisions

### Frontend
1. **Framework & Build Tool**: Chose Vite over CRA for faster development experience and build times ([see details](./DEVELOPMENT_JOURNEY.md#1-vite-configured-basic-react-app))
2. **UI Library**: Selected Adobe React Spectrum for enterprise-grade components and accessibility ([see details](./DEVELOPMENT_JOURNEY.md#2-added-adobe-react-spectrum-library))
3. **State Management**: Implemented local storage for persisting user's last converted number ([see details](./DEVELOPMENT_JOURNEY.md#71-frontend-would-remember-last-number-from-local-storage))
4. **Performance**: Added Web Vitals monitoring for core user experience metrics ([see details](./DEVELOPMENT_JOURNEY.md#102-added-observability---metrics-logs-and-traces-for-frontend-app))

### Backend
1. **Framework**: Express.js for its simplicity and middleware ecosystem ([see details](./DEVELOPMENT_JOURNEY.md#5-added-backend-api-with-roman-calc-and-setup-frontend-to-communicate-with-backend))
2. **API Design**: RESTful endpoint `/romannumeral?number={number}` for clean, intuitive interface ([see details](./DEVELOPMENT_JOURNEY.md#5-added-backend-api-with-roman-calc-and-setup-frontend-to-communicate-with-backend))
3. **Performance**: Implemented Map-based caching for frequently converted numbers ([see details](./DEVELOPMENT_JOURNEY.md#81-implemented-a-simple-map-based-cache-so-roman-conversion-logic-doesnt-have-to-be-run-everytime))
4. **Observability**: Integrated Winston (logs), Prometheus (metrics), and OpenTelemetry (traces) ([see details](./DEVELOPMENT_JOURNEY.md#101-added-observability---metrics-logs-and-traces-for-backend-services))

## Architecture Highlights

### Modular Design
- Separated frontend and backend into independent services ([see details](./DEVELOPMENT_JOURNEY.md#6-modularized-routes-for-future-expansion-and-depopulate-appjs))
- Modularized backend into routes, controllers, and services
- Implemented custom hooks for reusable functionality ([see details](./DEVELOPMENT_JOURNEY.md#72-created-a-localstorage-custom-hook-to-read-last-converted-number))

### Testing Strategy
- Backend: Comprehensive API and service tests ([see details](./DEVELOPMENT_JOURNEY.md#91-added-successfully-passing-tests-cases-for-backend-service))
- Frontend: Component-level and integration tests ([see details](./DEVELOPMENT_JOURNEY.md#92-added-minimal-successfully-passing-tests-cases-for-frontend-app))
- Focus on critical user flows and edge cases

### Deployment Options
1. **Separate Containers** (Production) ([see details](./DEVELOPMENT_JOURNEY.md#11-added-docker-containerization-for-standalone-backend-and-frontend-apps-also-full-stack))
   - Independent scaling of services
   - Better resource isolation
   - Flexible maintenance

2. **Combined Container** (Testing)
   - Simplified setup
   - Easier development
   - Quick deployment

## Key Features
- Number to Roman numeral conversion
- Dark/Light mode theming ([see details](./DEVELOPMENT_JOURNEY.md#4-added-header-and-theming-capability---dark-mode-and-light-mode))
- Form validation ([see details](./DEVELOPMENT_JOURNEY.md#3-added-form-validations-and-ready-for-backend-call))
- Local storage persistence
- Performance caching
- Comprehensive observability
- Docker containerization

[README](README.md)

[Devepment Journey](./DEVELOPMENT_JOURNEY.md)

[Start Up Steps](./START_UP.md)
