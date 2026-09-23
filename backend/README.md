# SEN 371: Full-Stack E-Commerce Web Application

A robust, scalable backend API for a cross-platform e-commerce web application. Built with a decoupled Model-View-Controller (MVC) architecture, this system emphasizes secure authentication, transactional relational data management, and strict TypeScript validation.

## Team Members

* Kelly Tiedt – 602730


* Jacobus Wilhelm de Jager – 6018948


* Thabang Donald Seitibaleng – 600525


* Thapelo Mphahlele – 577876



## Tech Stack

* **Runtime & Framework:** Node.js, Express.js


* **Language:** TypeScript


* **Database & ORM:** MySQL, Sequelize


* **Security:** JWT (JSON Web Tokens), bcryptjs, Helmet, HPP, CORS


* **Validation:** Zod


* **Testing:** Jest, Supertest


* **Documentation:** Swagger UI, Zod-to-OpenAPI



## Architecture & Features

* **Layered Design:** Separates routes, controllers, services, and data access (repositories) for high maintainability.
* **Authentication & RBAC:** Stateless JWT strategy with Role-Based Access Control (Admin vs. Customer).


* **Relational Schema:** Fully mapped e-commerce entities (`User`, `Product`, `Order`, `OrderItem`) with automated `sync`.


* **Automated Documentation:** Live interactive Swagger UI generated dynamically from Zod schemas.



## Prerequisites

* **Node.js** (v18 or higher recommended)
* **MySQL** database server (running locally or via Docker on port 3307 by default)



## Installation & Setup

1. **Clone the repository and install dependencies:**
```bash
npm install

```


2. **Environment Configuration:**
Create a `.env` file in the root directory and configure your local MySQL credentials:
```env
PORT=5001
DB_NAME=sen371_ecommerce
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3307
JWT_SECRET=your_super_secret_key

```


3. **Database Initialization & Seeding:**
Ensure your MySQL server is running and the database `sen371_ecommerce` exists. To automatically build the tables and insert the default Admin and Customer accounts, run:
```bash
npm run seed

```



## Development Commands

* **Start Development Server:** Runs the app using `nodemon` for hot-reloading.


```bash
npm run dev

```


* **Run Tests:** Executes the Jest integration test suite in isolation.


```bash
npm test

```


* **Build for Production:** Compiles TypeScript source code to JavaScript.


```bash
npm run build

```


* **Start Production Server:** Runs the compiled JavaScript build.


```bash
npm start

```



## API Documentation

Once the server is running, you can interact with the live API documentation by navigating to:
`http://localhost:5001/docs`