# BudgetMe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.

# Docker Setup
Development can be done using Docker. Hot reload and watch are enabled. 
### prerequisites
- Docker
- Docker Compose
- Node.js
- npm
- mysql

#### Environment Variables
Create the following environment files in the project root.
### .env.dev
FRONTEND_PORT=4200 BACKEND_PORT=3000
+ PORT=3000
+ HOST=0.0.0.0
+ MYSQL_ROOT_PASSWORD=myrootpassword
+ MYSQL_DATABASE=mydb
+ MYSQL_USER=appuser
+ MYSQL_PASSWORD=apppassword
### .env.prod
+ FRONTEND_PORT=4200
+ BACKEND_PORT=3000
+ PORT=3000
+ HOST=0.0.0.0
+ MYSQL_ROOT_PASSWORD=myrootpassword
+ MYSQL_DATABASE=mydb
+ MYSQL_USER=appuser
+ MYSQL_PASSWORD=apppassword

**Adjust these values as needed for your environment.**

Running the Application
Development Environment
Build and Start
npm run docker-dev-build

Application URLs

Service	URL
Angular Frontend	http://localhost:4200
Node Backend	http://localhost:3000

## Frontend Development server

#### Start the frontend server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

#### Build frontend

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Project published files are in the dist/budgeme/browser folder.

## Backend Development server

- Run `cd backend && npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
- Run `cd backend && npm run dev` to start nodemon.
- Run `cd backend && npm run migrate` to migrate the database.
- Run `cd backend && npm run seed` to seed the database.
