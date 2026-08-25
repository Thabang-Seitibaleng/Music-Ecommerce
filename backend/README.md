## SEN371 E-Commerce Backend

This is the core Node.js/TypeScript backend for the SEN371 E-Commerce web application. It features a MySQL database configured with Sequelize, JWT authentication, and automated Swagger documentation.

### 1. Prerequisites

Before cloning this repository, ensure you have the following installed on your machine:

* Node.js
* Docker Desktop (must be running in the background)

### 2. Environment & Database Setup

We use a containerized MySQL instance for isolated local development.

1. Copy the environment template to create your local `.env` file:
```bash
cp .env.example .env

```


2. Install the project dependencies:
```bash
npm install

```


3. Spin up the local MySQL database in the background:
```bash
docker compose up -d

```



### 3. Running & Seeding

Once the database container is running, you can start the development server. Sequelize will automatically synchronize the models and build the tables.

1. Start the backend server:
```bash
npm run dev

```


2. Open a new terminal tab and seed the database with test accounts:
```bash
npm run seed

```



**Test Accounts:**

* **Admin:** `admin@test.com` | Password: `Password123!`
* **Customer:** `customer@test.com` | Password: `Password123!`

Once running, you can view the interactive API documentation at `http://localhost:5001/docs`.