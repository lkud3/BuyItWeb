# BuyItWeb
The repository of my final project on CS306 at American College at Thessaloniki. It is a rebuild of my BuyIt project adapted for the web version using the Angular framework.

This version allows the user to login to their personal account or to create a new one. After the registration is done, user can dive into variety of available items in stock, have a closer look at the price and description of each item, and add them into cart. Each item has a counter of views as well as accumulated rating and comments of other users. 

THe current version is not final, having some minor bugs in cart system, as well as awaits implementation of leaving comments and ratings by the users and adding the wishlist.

Project was built on Angular with implementation of free to use css layout and Bootstrap. 

In order to start project locally, execute 

```bash
npm install
```

and follow the guidelines below.


# This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
