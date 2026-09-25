# SEN371 E-Commerce Frontend

This folder contains the React and TypeScript user interface for the SEN371 e-commerce project. The frontend is connected to the Express/MySQL backend for products, authentication, and checkout.

## What the frontend does

- Loads the product catalogue from `GET /api/products`.
- Displays the same live products on the Home, Shop, and Product Details pages.
- Registers and signs in users through the authentication API.
- Stores the signed-in user, JWT token, and cart in browser local storage.
- Sends the JWT token to the protected checkout endpoint: `POST /api/orders/checkout`.
- Keeps record-cover images as frontend UI assets in `public/images/products`.

There is currently no Cart API. Keeping the cart in local storage is intentional: it lets a user keep items after a refresh or sign-out while the backend handles the product catalogue and saved orders.

## Frontend file guide

| Location | Purpose |
| --- | --- |
| `src/main.tsx` | React entry point. It starts the React application in the browser. |
| `src/App.tsx` | Main application component. It loads products from the API, keeps cart/user state, and connects routes to pages. |
| `src/pages/` | Full-screen React pages such as Home, Shop, Product Details, Cart, Checkout, and Login/Register. |
| `src/components/` | Reusable UI pieces such as `Navbar.tsx`, `Footer.tsx`, `ProductCard.tsx`, and `ProductGrid.tsx`. |
| `src/styles.css` and component CSS files | Visual styling, responsive layout, colours, spacing, and mobile behaviour. |
| `src/services/api.ts` | Shared frontend fetch helper. It sends requests to the configured backend API. |
| `src/services/authService.ts` | Login and registration requests. It receives the JWT token returned by the backend. |
| `src/services/productService.ts` | Calls the Product API and maps backend fields such as `title` and `stockQuantity` to the existing frontend product shape. |
| `src/services/orderService.ts` | Sends cart product IDs and quantities to checkout with `Authorization: Bearer <token>`. |
| `src/data/products.ts` | Frontend artwork and fallback display metadata. Live price and stock come from the API. |

### File extensions

- `.tsx` means **TypeScript + JSX**. These are React components with TypeScript logic and HTML-like React markup.
- `.ts` means **TypeScript** without JSX. Service files use it because they contain request/data logic rather than visual markup.
- `.css` contains the visual styling for the frontend.

## Team responsibility overview

This table separates the frontend integration work from the backend API work. It is based on the agreed team roles and the available Git history.

| Team member | Main responsibility | Relevant project areas |
| --- | --- | --- |
| Wilhelm de Jager | Frontend/UI lead and frontend API integration | `frontend/src/pages`, `frontend/src/components`, `frontend/src/styles.css`, `App.tsx`, and the frontend services used to connect the UI to the API. |
| Thabang Donald Seitibaleng | Product/Order API feature work | Product API history under `backend/src`, including Product endpoints, validation, filtering, and repository-related API work. |
| Thapelo Mphahlele | Backend architecture, authentication, and backend test work | Backend setup, models, JWT/authentication improvements, order security improvements, and the backend unit/integration test history. |
| Kelly Tiedt | Test environment / quality assurance role | Running and checking the project in the test environment as allocated by the team. |

The React pages and components are frontend work. The backend API routes, controllers, models, repositories, and database configuration remain backend work. Frontend integration connects the two through service files; it does not move backend logic into React.

## API integration flow

```text
React pages
    ↓
Frontend services (`productService.ts`, `orderService.ts`)
    ↓
Shared request helper (`api.ts`)
    ↓
Express API routes, middleware, controllers, and repositories
    ↓
MySQL database in Docker
```

For checkout, the frontend sends the saved JWT as a Bearer token. The backend verifies the token, uses its user ID, checks product stock and database prices, then saves the order and order items.

## Run locally

1. Start Docker Desktop and wait until the Docker engine is running.
2. In a terminal, start MySQL and the backend:

   ```powershell
   cd backend
   docker compose up -d
   npm install
   npm run dev
   ```

3. If `GET http://localhost:5001/api/products` returns an empty list, seed the record catalogue once:

   ```powershell
   cd backend
   npm run seed
   ```

4. In a second terminal, start the frontend:

   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

5. Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

Useful local URLs:

- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:5001/api/health`
- Product API: `http://localhost:5001/api/products`
- Swagger API documentation: `http://localhost:5001/docs`

The frontend API base URL is configured in `.env.example` as:

```env
VITE_API_BASE_URL=http://localhost:5001/api
```
