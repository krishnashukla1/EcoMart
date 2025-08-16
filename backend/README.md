// FILE: README.md (basic instructions)
# Amazon-style e-commerce API (Node.js + Express + MongoDB)

## Quick start
1. Clone project and `cd` into folder.
2. Copy `.env.example` -> `.env` and set `MONGO_URI` and `JWT_SECRET`.
3. `npm install`
4. `npm run seed` (creates sample products and a test user `test@example.com` / `password123`)
5. `npm run dev` (requires nodemon) or `npm start`

## Endpoints overview
- `POST /api/auth/register` - register
- `POST /api/auth/login` - login -> returns JWT
- `GET /api/products` - search & listing
- `GET /api/products/:id` - single product
- `GET /api/cart` - get user cart (auth required)
- `POST /api/cart` - add to cart (auth required)
- `PUT /api/cart/:itemId` - update item qty
- `DELETE /api/cart/:itemId` - remove cart item
- `POST /api/orders` - create order (auth required)
- `GET /api/orders` - list user orders
- `POST /api/payments` - payment stub

## Notes & next steps (production)
- Add validation (Joi / express-validator) for all routes.
- Use MongoDB transactions when decrementing stock + creating orders to avoid race conditions.
- Integrate a real payment gateway (Razorpay / Stripe / PayPal).
- Add rate limiting, request size limits, and stronger security settings.
- Add logging & monitoring (Winston, Sentry).
- Add tests (Jest / Supertest) and CI pipeline.


// ---------------
// CURL examples (quick)
// 1) Register
// curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"name":"Me","email":"me@example.com","password":"pass123"}'

// 2) Login
// curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}'

// 3) List Products
// curl http://localhost:5000/api/products

// 4) Add to cart (replace TOKEN and PRODUCT_ID)
// curl -X POST http://localhost:5000/api/cart -H "Authorization: Bearer TOKEN" -H "Content-Type: application/json" -d '{"productId":"PRODUCT_ID","qty":2}'

// ---------------
