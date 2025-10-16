# Project: svgDad

## Project Overview

This is an Angular web application built with the Angular CLI. It uses TypeScript, SCSS, and HTML. The project includes features like routing, state management with NgRx, and uses the Angular Material component library. The application appears to be an e-commerce or product catalog application, with features for displaying products, a shopping cart, and user authentication.

## Building and Running

### Development Server

To start the development server, run:

```bash
npm start
```

This will start a development server on `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Building

To build the project for production, run:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running Unit Tests

To run the unit tests, run:

```bash
npm test
```

This will execute the unit tests via Karma.

### Running End-to-End Tests

To run the end-to-end tests, run:

```bash
npm run e2e
```

This will execute the end-to-end tests via Protractor.

## Development Conventions

* **Component Style:** The project uses SCSS for styling components.
* **State Management:** The project uses NgRx for state management.
* **Component Library:** The project uses Angular Material for UI components.
* **Routing:** The project uses the Angular Router for navigation, with lazy-loading for feature modules.
* **Standalone Components:** The root component is a standalone component, which is a newer feature in Angular.
