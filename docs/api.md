# Farm Connect Backend API Documentation

This document enumerates all API endpoints discovered in the backend codebase, including HTTP methods, auth requirements, request validation (from Joi schemas), common query parameters, and response shapes.

- Code references:
  - Routes index: `farmconnect_backend/src/routes/index.js`
  - Middleware: `farmconnect_backend/src/middleware/auth.js`
  - Controllers: under `farmconnect_backend/src/controllers/`
  - BaseController: `farmconnect_backend/src/controllers/baseController.js`
  - Models/associations: `farmconnect_backend/src/models/index.js`

## Base

- Base path: `/api` (see `src/index.js`)
- CORS, Helmet, JSON body parsing enabled (see `src/index.js`).
- Health check: `GET /api/health` → `{ status: "ok", timestamp }`
- Authentication header: `Authorization: Bearer <JWT>`
- Roles used in authorization: `farmer`, `buyer`, `trader`, `admin` (see `src/middleware/auth.js`)

### Common list pagination and filtering
Endpoints implemented with `BaseController.getAll()` support:
- Query params:
  - `page` (default: 1)
  - `limit` (default: 10)
  - `sortBy` (default: `createdAt`)
  - `sortOrder` (`ASC`|`DESC`, default `DESC`)
  - Arbitrary filters via query string:
    - `field=value` for exact match
    - `field_like=value` for LIKE match
    - `field_in=a,b,c` for IN match
    - `startDate` & `endDate` for `createdAt` range
- Response shape:
  - `{ data: [ ... ], pagination: { total, page, limit, totalPages } }`

Note: Some controller methods return arrays or single objects directly (as noted per-endpoint below).

---

## Auth Endpoints (`/api/auth`)

Source: `src/routes/authRoutes.js`, `src/controllers/userController.js`

- POST `/api/auth/register` [Public]
  - Body (Joi):
    - `firstName` (string, required)
    - `lastName` (string, required)
    - `email` (email, required)
    - `phone` (string, required)
    - `password` (string, min 6, required)
    - `role` (enum: `farmer|buyer|trader|admin`, required)
  - Responses:
    - 201: `{ message, user, token }` (password excluded)
    - 400: `{ message }` (validation or conflict)

    

- POST `/api/auth/login` [Public]
  - Body (Joi):
    - `email` (email, required)
    - `password` (string, required)
  - Responses:
    - 200: `{ message, user, token }`
    - 400: `{ message }` (invalid credentials)

- GET `/api/auth/me` [Auth]
  - Auth: `auth`
  - Response: user object (password excluded)

---

## Product Endpoints (`/api/products`)

Source: `src/routes/productRoutes.js`, `src/controllers/productController.js`

- GET `/api/products` [Public]
  - Supports BaseController pagination/filters.
  - Response: `{ data, pagination }` (includes `seller`, `orders.buyer` per `getIncludes()`)

- GET `/api/products/search` [Public]
  - Query:
    - `query` (text search in `name`, `description`)
    - `category`
    - `minPrice`, `maxPrice`
    - `location` (string `lng,lat`)
    - `radius` (km; default 10)
    - `page`, `limit`
  - Response: `{ data, pagination }` (includes `seller`)

- GET `/api/products/seller/:sellerId` [Auth]
  - Auth: `protect`
  - Query: `status` (optional)
  - Response: array of products (includes minimal `seller` attributes)

- GET `/api/products/:id` [Public]
  - Response: single product (includes `seller` and `orders.buyer` per `getIncludes()`)

- POST `/api/products` [Auth + Roles: `farmer|trader`]
  - Auth: `protect` + `authorize('farmer','trader')`
  - Body (Joi):
    - `name` (string, required)
    - `description` (string, allow empty)
    - `category` (enum: `cereals|vegetables|fruits|tubers|legumes|livestock|poultry|dairy|other`, required)
    - `grade` (enum: `A|B|C|D`, required)
    - `pricePerUnit` (number >= 0, required)
    - `unit` (enum: `kg|g|tonne|liter|piece|dozen`, required)
    - `quantity` (number >= 0, required)
    - `availableQuantity` (number >= 0, required)
    - `location` (GeoJSON): `{ type: 'Point', coordinates: [lng, lat] }`
    - `harvestDate` (date)
    - `isOrganic` (boolean, default false)
    - `status` (enum: `available|sold_out|inactive`, default `available`)
    - `images` (array of strings)
    - `sellerId` (UUID, required)
  - Responses:
    - 201: created product (includes `seller`)
    - 400: `{ message }`

- PUT `/api/products/:id` [Auth + Roles: `farmer|trader`]
  - Auth: `protect` + `authorize('farmer','trader')`
  - Body: fields to update (no explicit Joi validation in controller)
  - Response: updated product

- DELETE `/api/products/:id` [Auth + Roles: `farmer|trader`]
  - Auth: `protect` + `authorize('farmer','trader')`
  - Response: `{ message }`

---

## Order Endpoints (`/api/orders`)

Source: `src/routes/orderRoutes.js`, `src/controllers/orderController.js`

All routes use `protect`.

- POST `/api/orders` [Roles: `buyer`]
  - Body (Joi):
    - `productId` (UUID, required)
    - `quantity` (number >= 0.1, required)
    - `deliveryAddress` (string, required)
    - `deliveryInstructions` (string, allow empty)
    - `paymentMethod` (enum: `ecocash|onemoney|zipit|bank_transfer|cash`, required)
    - `buyerId` (UUID, required)
  - Response: 201 order with includes (`product.seller`, `buyer`, `transactions`)

- GET `/api/orders/buyer/:buyerId` [Roles: `buyer`]
  - Query: `status` (optional), `page`, `limit`
  - Response: `{ data, pagination }` (includes `product.seller`, `transactions`)

- GET `/api/orders/buyer/:buyerId/:id` [Roles: `buyer`]
  - Response: single order by id

- GET `/api/orders/seller/:sellerId` [Roles: `farmer|trader`]
  - Query: `status` (optional), `page`, `limit`
  - Response: `{ data, pagination }` (includes `product`, `buyer`, `transactions`)

- GET `/api/orders/seller/:sellerId/:id` [Roles: `farmer|trader`]
  - Response: single order by id

- PUT `/api/orders/:id/status` [Roles: `farmer|trader`]
  - Body (Joi):
    - `status` (enum: `pending|accepted|rejected|payment_pending|paid|shipped|delivered|cancelled|disputed|refunded`, required)
    - `cancellationReason` (string; required if `status=cancelled`)
  - Response: updated order with includes

- GET `/api/orders` [Roles: `admin`]
  - Supports BaseController pagination/filters.
  - Response: `{ data, pagination }`

- GET `/api/orders/:id` [Roles: `admin`]
  - Response: single order

- PUT `/api/orders/:id` [Roles: `admin`]
  - Body: fields to update (no explicit Joi validation in controller)
  - Response: updated order

### Examples

```http
POST /api/orders HTTP/1.1
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "productId": "1d4a1af2-8f93-4a2b-9a0e-5f8a7c710001",
  "quantity": 2.5,
  "deliveryAddress": "123 Mbare Rd, Harare",
  "deliveryInstructions": "Leave at the gate",
  "paymentMethod": "ecocash",
  "buyerId": "b7f8fdb0-9e9d-42d0-8c16-0a3b9e550001"
}
```

201 Response (truncated):

```json
{
  "id": "c4a1c0f0-1c99-44c8-9d76-a3f9d2f40001",
  "productId": "1d4a1af2-8f93-4a2b-9a0e-5f8a7c710001",
  "buyerId": "b7f8fdb0-9e9d-42d0-8c16-0a3b9e550001",
  "sellerId": "15e9b86b-2b45-4c7a-9d2a-a1f1f0e90001",
  "unitPrice": 3.5,
  "quantity": 2.5,
  "totalPrice": 8.75,
  "status": "pending",
  "paymentMethod": "ecocash",
  "createdAt": "2024-08-27T10:12:00.000Z",
  "updatedAt": "2024-08-27T10:12:00.000Z",
  "product": { "id": "...", "seller": { "id": "...", "firstName": "..." } },
  "buyer": { "id": "...", "firstName": "..." },
  "transactions": [ { "id": "...", "amount": 8.75, "type": "escrow_hold", "status": "pending" } ]
}
```

```http
GET /api/orders/buyer/b7f8fdb0-9e9d-42d0-8c16-0a3b9e550001?status=paid&page=1&limit=10 HTTP/1.1
Authorization: Bearer <JWT>
```

200 Response (paginated):

```json
{
  "data": [
    {
      "id": "...",
      "status": "paid",
      "totalPrice": 20.0,
      "product": { "id": "...", "seller": { "id": "...", "firstName": "..." } },
      "transactions": [ { "id": "...", "type": "escrow_hold", "status": "completed" } ]
    }
  ],
  "pagination": { "total": 1, "page": 1, "limit": 10, "totalPages": 1 }
}
```

```http
PUT /api/orders/c4a1c0f0-1c99-44c8-9d76-a3f9d2f40001/status HTTP/1.1
Authorization: Bearer <JWT>
Content-Type: application/json

{ "status": "accepted" }
```

Possible `status` values: `pending|accepted|rejected|payment_pending|paid|shipped|delivered|cancelled|disputed|refunded`.

Invalid transitions return 400: `{ "message": "Cannot change status from <from> to <to>" }`.

```http
GET /api/orders/seller/15e9b86b-2b45-4c7a-9d2a-a1f1f0e90001?page=1&limit=10 HTTP/1.1
Authorization: Bearer <JWT>
```

200 Response (paginated): same shape as buyer list.

---

## Transaction Endpoints (`/api/transactions`)

Source: `src/routes/transactionRoutes.js`, `src/controllers/transactionController.js`

All routes use `protect`.

- POST `/api/transactions` [Roles: `buyer|farmer|trader`]
  - Body (Joi):
    - `amount` (number >= 0.01, required)
    - `currency` (enum: `USD|ZWL`, default `USD`)
    - `type` (enum: `deposit|withdrawal|escrow_hold|escrow_release|escrow_refund|purchase|refund|payout|fee|bonus|other`, required)
    - `paymentMethod` (enum: `ecocash|onemoney|zipit|bank_transfer|wallet|other`, required)
    - `paymentReference` (string, allow empty)
    - `description` (string, allow empty)
    - `userId` (UUID, required)
    - `orderId` (UUID, optional)
  - Response: 201 transaction with includes (`user`, `order.buyer`, `order.product`)

- GET `/api/transactions/user/:userId` [Roles: `buyer|farmer|trader`]
  - Query: `type`, `status`, `startDate`, `endDate`, `page`, `limit`
  - Response: `{ data, pagination }` (ordered by `processedAt DESC`)

- GET `/api/transactions/wallet/:userId` [Roles: `buyer|farmer|trader`]
  - Response: `{ walletBalance, escrowBalance, availableBalance, availableEscrow, pendingWithdrawals, pendingEscrow }`

- GET `/api/transactions` [Roles: `admin`]
  - Supports BaseController pagination/filters.
  - Response: `{ data, pagination }`

- GET `/api/transactions/:id` [Roles: `admin`]
  - Response: single transaction

---

## Notification Endpoints (`/api/notifications`)

Source: `src/routes/notificationRoutes.js`, `src/controllers/notificationController.js`

All routes use `protect`.

- GET `/api/notifications/user/:userId`
  - Query: `isRead` (`true|false`), `type`, `page`, `limit`
  - Response: `{ data, pagination }` (non-expired only)

- GET `/api/notifications/unread/count/:userId`
  - Response: `{ count }`

- PUT `/api/notifications/read/:id`
  - Response: updated notification (sets `isRead=true`, `readAt`)

- PUT `/api/notifications/read-all/:userId`
  - Response: `{ message, count }`

- DELETE `/api/notifications/expired/:userId`
  - Response: `{ message, count }`

Notes:
- Notification creation is available internally via controller (used by KYC and Price Alert flows), not currently exposed as a public route.
- Notification types (Joi enum): `order_placed|order_accepted|order_rejected|order_shipped|order_delivered|payment_received|payout_processed|kyc_approved|kyc_rejected|price_alert|system|promotional|other`

---

## Price Alert Endpoints (`/api/price-alerts`)

Source: `src/routes/priceAlertRoutes.js`, `src/controllers/priceAlertController.js`

All routes use `protect`.

- POST `/api/price-alerts` [Roles: `buyer`]
  - Body (Joi):
    - `productName` (string, required)
    - `category` (enum as in Product categories, required)
    - `condition` (enum: `above|below|equal`, required)
    - `targetPrice` (number >= 0, required)
    - `currency` (enum: `USD|ZWL`, default `USD`)
    - `unit` (enum: `kg|g|tonne|liter|piece|dozen`, required)
    - `userId` (UUID, required)
  - Response: 201 price alert (`isActive=true` by default)

- GET `/api/price-alerts/user/:userId` [Roles: `buyer`]
  - Query: `isActive` (`true|false`), `page`, `limit`
  - Response: `{ data, pagination }`

- GET `/api/price-alerts/active/user/:userId` [Roles: `buyer`]
  - Response: array of active alerts

- PUT `/api/price-alerts/toggle/:id` [Roles: `buyer`]
  - Body: `{ isActive: boolean }`
  - Response: updated alert

- POST `/api/price-alerts/check` [Auth]
  - Body: `{ productName, category, currentPrice }` (all required)
  - Response: `{ message, triggeredAlerts: [ { alertId, userId, productName, category, condition, targetPrice, currentPrice, unit, currency } ] }`

---

## KYC Endpoints (`/api/kyc`)

Source: `src/routes/kycRoutes.js`, `src/controllers/kycController.js`

All routes use `protect`.

- POST `/api/kyc` [Roles: `buyer|farmer|trader`]
  - Body (Joi):
    - `userId` (UUID, required)
    - `documentType` (enum: `national_id|passport|drivers_license|utility_bill`, required)
    - `documentNumber` (string, required)
    - `documentImages` (array of URI strings, min 1, required)
    - `status` (enum: `pending|verified|rejected`, default `pending`)
    - `rejectionReason` (string, allow empty)
    - `metadata` (object, default `{}`)
  - Response: 201 KYC document with `user` include and metadata

- GET `/api/kyc/status/:userId` [Auth]
  - Response: `{ userId, kycStatus, latestKyc: { id, documentType, status, submittedAt, reviewedAt, rejectionReason } | null }`

- GET `/api/kyc` [Roles: `admin`]
  - Query: `userId`, `status`, `documentType`, `startDate`, `endDate`, `page`, `limit`
  - Response: `{ data, pagination }`

- PUT `/api/kyc/:id/status` [Roles: `admin`]
  - Body (Joi):
    - `status` (enum: `verified|rejected`, required)
    - `rejectionReason` (required if `status=rejected`)
  - Response: `{ message, kycStatus, document }`

---

## Error Responses

- Auth middleware errors (`src/middleware/auth.js`):
  - 401: `{ message: 'No token, authorization denied' | 'User not found' | 'Token expired' | 'Invalid token' }`
  - 403: `{ message: 'User role <role> is not authorized to access this route' }`
- Controllers typically return:
  - 400: `{ message }` (validation/business rule)
  - 404: `{ message }`
  - 500: `{ message: 'Server error' | domain-specific message }`
- Global error handler (`src/index.js`) formats unhandled errors as:
  - `{ success: false, error: { message, stack? } }` (stack only in development)

---

## Notes & Observations

- List endpoints may either return a raw array or the `{ data, pagination }` wrapper. The wrapper is used by `BaseController.getAll()` and specific pagination-aware methods like `productController.search()`, `notificationController.getByUser()`, `priceAlertController.getByUser()`, `transactionController.getByUser()`, `kycController.getKycDocuments()`. Order buyer/seller lists return `{ data, pagination }`.
- Role checks occur at the router level via `protect` + `authorize(...)`. Per-resource ownership checks are enforced in controllers where relevant (e.g., `orderController` buyer/seller scoping, `notificationController` user scoping, `priceAlertController` user scoping).
- Geo filtering in product search uses PostGIS (`ST_DWithin`, `ST_Distance`) with `location` as `GEOMETRY(Point)`. Provide `location` as `lng,lat` in query and `radius` in km.

---

## Changelog

- Initial extraction from source (routes/controllers) to Markdown documentation.
- Files referenced: `src/routes/*.js`, `src/controllers/*.js`, `src/middleware/auth.js`, `src/index.js`.
