# Roman Number Converter

A full-stack application that converts numbers to Roman numerals, built with React (Frontend) and Node.js (Backend).

## How I started and approached till end

### 1. Vite Configured Basic React app

Evaluated three approaches for setting up the React application: 

1) Manual configuration with npm init, Babel, and Webpack for complete control but requiring significant setup time. 

2) Create React App (CRA) for a quick start but with limited customization and slower build times.

3) Vite for its superior development experience with instant server start and hot module replacement. Chose Vite for its modern architecture, faster build times, and built-in optimizations, making it ideal for a production-ready application.

### 2. Added Adobe React Spectrum Library

After evaluating several UI libraries, chose Adobe React Spectrum for its enterprise-grade components and accessibility features. Selected specific components based on the application's needs:

1) [TextField](https://react-spectrum.adobe.com/react-spectrum/TextField.html) - For number input with built-in validation and error states
2) [Button](https://react-spectrum.adobe.com/react-spectrum/Button.html) - For form submission with proper loading states
3) [Text](https://react-spectrum.adobe.com/react-spectrum/Text.html) - For consistent typography and error messages
4) [Form](https://react-spectrum.adobe.com/react-spectrum/Form.html) - For structured form layout and validation
5) [Flex](https://react-spectrum.adobe.com/react-spectrum/Flex.html) - For responsive layout management

Also Considered

1) [Grid](https://react-spectrum.adobe.com/react-spectrum/Grid.html) - Considered for complex layout management with fixed column widths and responsive behavior, but chose Flex for its simpler API and better suitability for the current form layout needs.
2) [Tabs](https://react-spectrum.adobe.com/react-spectrum/Tabs.html) - If in future, this app needs extension to more converters.

These components provided a solid foundation for building an accessible and user-friendly interface while maintaining consistent design patterns.

### 3. Added Form Validations, and Ready for Backend call

Implemented comprehensive form validation using Adobe Spectrum's TextField component capabilities. The validation system ensures data integrity and provides immediate user feedback through multiple layers:

Implemented Features:

1) `errorMessage` - Dynamic error messages that update based on validation state
2) `validationState` - Visual indicators for valid/invalid states with appropriate styling
3) `maxLength` - Prevents input of numbers larger than the maximum Roman numeral value
4) `inputMode="numeric"` - Triggers numeric keyboard on mobile devices

Also Considered

1) `pattern` - Regex-based validation was deemed too restrictive for the use case
2) `validate` - Custom validation function was unnecessary as built-in validation sufficed

The validation system works in conjunction with the backend API, ensuring that only valid numbers are sent for conversion while providing a smooth user experience with immediate feedback.

### 4. Added Header and Theming Capability - Dark Mode and Light Mode

Implemented a theme system that respects user preferences and system settings. The application automatically detects the user's preferred color scheme using the `window.matchMedia("(prefers-color-scheme: dark)").matches` API and applies the appropriate theme.

Leveraged Adobe Spectrum's [Provider](https://react-spectrum.adobe.com/react-spectrum/Provider.html#themes) component to implement theme switching functionality, ensuring consistent theming across all Spectrum components while maintaining accessibility standards.

### 5. Added Backend API with Roman Calc and setup Frontend to communicate with Backend

Chose Express.js as the backend framework for its simplicity and extensive middleware ecosystem, which perfectly suited the project's requirements without unnecessary complexity. The framework's lightweight nature and straightforward routing system made it ideal for this focused application.

Implemented a RESTful API with the endpoint `/romannumeral?number={number}` to maintain a clean, intuitive interface that follows REST principles. This design choice makes the API self-documenting and easy to test, while the query parameter approach simplifies client-side implementation.

Established secure communication between frontend and backend by implementing proper CORS policies and error handling middleware. This ensures robust error responses and prevents potential security issues while maintaining a smooth user experience even when errors occur.

### 6. Modularized Routes for future expansion, and depopulate app.js

Implemented a modular architecture by separating the application into distinct layers (routes, controllers, services) to improve code organization and maintainability. This approach not only simplifies the main `app.js` entry point but also establishes a clear pattern for future development, making it easier for other developers to understand and extend the codebase.

### 7. Improvization on Frontend

Enhanced the frontend user experience with additional refactorization and optimizations.

### 7.1. Frontend would remember last number from Local Storage

Implemented local storage to remember the user's last converted number, allowing them to continue from where they left off when they return to the application. This feature eliminates the need to re-enter the same number, creating a more seamless experience for users who frequently convert the same or similar numbers.

### 7.2. Created a Localstorage Custom Hook to read last converted number

Developed a reusable custom React hook that abstracts local storage operations, making it easy to implement state persistence in future converters. This hook encapsulates all storage logic in one place, reducing code duplication and ensuring consistent behavior across different conversion features.

### 8. Improvization on Backend

Optimized backend performance and added advanced features for better reliability.

### 8.1. Implemented a Simple Map based cache, so Roman Conversion logic doesn't have to be run everytime

Implemented a Map-based caching system on the backend to store previously calculated Roman numerals. After evaluating both frontend and backend caching approaches, chose backend implementation to ensure all users benefit from cached results, rather than limiting the performance improvement to individual user sessions.

### 8.2. Created a Localstorage Custom Hook to read last converted number

Developed a reusable custom React hook that abstracts local storage operations, making it easy to implement state persistence in future converters. This hook encapsulates all storage logic in one place, reducing code duplication and ensuring consistent behavior across different conversion features.

### 9. Minimal Test Cases

Implemented comprehensive test coverage for both frontend and backend components.

### 9.1. Added successfully passing tests cases for Backend Service

Created comprehensive test suite covering both API endpoints and core service functionality:

#### API Tests (app.test.js)

- Base route test:
  - Verifies correct welcome message and URL format
- Roman numeral endpoint tests:
  - Validates error handling for missing number parameter
  - Validates error handling for non-numeric inputs
  - Verifies correct conversion of valid numbers
  - Tests boundary conditions (0 and 4000)
- CORS tests:
  - Ensures proper cross-origin resource sharing headers

#### Service Tests (RomanCalcService.test.js)

- Input validation tests:
  - Tests for numbers less than 1
  - Tests for numbers greater than 3999
  - Tests for non-integer numbers
  - Tests for non-numeric inputs
- Conversion accuracy tests:
  - Single symbol numbers (I, V, X, L, C, D, M)
  - Numbers with subtractive notation (IV, IX, XL, XC, CD, CM)
  - Complex numbers (III, LVIII, MCMXCIV, MMMCMXCIX)
- Cache tests:
  - Verifies caching mechanism for repeated conversions

These tests ensure reliability and proper error handling across the entire backend system.

### 9.2. Added minimal successfully passing tests cases for Frontend App

Implemented comprehensive test suite covering both component-level and integration testing:

#### Form Component Tests (FormContent.test.jsx)

- Input validation and button state test:
  - Validates number range (0-3999)
  - Tests invalid inputs (0, 4000)
  - Verifies button state based on input validity
- API integration test:
  - Tests successful API calls
  - Verifies correct display of converted Roman numerals
  - Validates API endpoint construction

#### Header Component Tests (Header.test.jsx)

- Theme button text test:
  - Verifies button shows "Dark" when theme is light
  - Verifies button shows "Light" when theme is dark
- Theme toggle test:
  - Tests theme toggle function is called on button click

These tests ensure proper component behavior, user interactions, and integration with backend services while maintaining a consistent user experience.

### 10. Added Observability

Implemented comprehensive monitoring and logging across the application.

### 10.1. Added Observability - Metrics, Logs and Traces for Backend Services

Integrated Winston for logging, Prometheus for metrics, and OpenTelemetry for tracing. This provides deep insights into backend performance and error tracking. Added cache observability metrics to track:

- Cache hits and misses
- Current cache size
- Cache hit ratio
- Success rates for conversions

### 10.2. Added Observability - Metrics, Logs and Traces for Frontend App

Implemented Web Vitals monitoring to track core user experience metrics:

- Cumulative Layout Shift (CLS) to measure visual stability
- First Input Delay (FID) to measure interactivity
- Largest Contentful Paint (LCP) to measure loading performance
- First Contentful Paint (FCP) to measure initial rendering
- Time to First Byte (TTFB) to measure server response time

These metrics help identify and fix performance issues that directly impact user experience. Added error tracking and user interaction monitoring for better debugging.

### 11. Added Docker Containerization for Standalone Backend and Frontend apps, also Full-Stack

Implemented two deployment strategies to cater to different use cases:

#### Separate Containers (Recommended for Production)

- Frontend and backend run in independent containers
- Enables independent scaling of backend instances to handle increased load
- Each backend container maintains its own cache, providing natural load distribution
- Allows for independent updates and maintenance of frontend and backend
- Better resource isolation and management
- This kind of setup might need extra configurations, as mentioned below (in "While using Separate Containers, we can use multiple backend containers with one or many frontend containers" section)

#### Combined Container (Useful for Testing)

- Single container running both frontend and backend
- Simplified setup for testing and development
- Easier to manage for small applications
- Reduced deployment complexity
- Suitable for proof-of-concept and testing scenarios

Both configurations are provided to support different deployment needs while maintaining flexibility for future scaling.

#### While using Separate Containers, we can use multiple backend containers with one or many frontend containers

Simple Load Balancer Setup (Docker Compose + Nginx):

Good for: Fixed number of backend instances
Pros:

- Simpler to set up and maintain
- Less overhead

Good for development and small-scale production
Cons:

- Manual scaling (need to manually add/remove containers)
- No automatic failover
- No automatic health checks

Kubernetes Setup:

Good for: Dynamic scaling, high availability

Pros:

- Automatic scaling based on load
- Automatic failover
- Health checks and self-healing
- Service discovery

Cons:

- More complex to set up and maintain
- Higher resource overhead
- Steeper learning curve


[README](README.md)

[Concise Devepment Journey](./SHORT_DEVELOPMENT_JOURNEY.md)

[Start Up Steps](./START_UP.md)