# SEN371 E-Commerce Frontend

React + TypeScript frontend for the SEN371 e-commerce project.

## Run locally

1. Copy `.env.example` to `.env` (the default API URL already matches the backend).
2. Run `npm install`.
3. Run `npm run dev` and open the displayed URL, normally `http://localhost:5173`.

Run the backend separately from `../backend` using `npm run dev`. Authentication calls `POST /api/auth/login` and `POST /api/auth/register`.

## Temporary frontend data

The backend currently has no product, cart, or order routes. The product catalogue is therefore temporary local data in `src/data/products.ts`; cart data is stored in the browser's local storage; and checkout displays a confirmation without creating an order. These are deliberately isolated so they can be replaced with API services when the endpoints are added.
