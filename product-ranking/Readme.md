# Product Ranking API

A RESTful API built with Node.js, Express.js, and MongoDB that ranks and filters products based on ratings, reviews, returns, price, storage capacity, RAM, and other specifications to help users find the best products.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [API Routes](#api-routes)
- [Architecture & Design Principles](#architecture--design-principles)
- [Usage Examples](#usage-examples)
- [Environment Configuration](#environment-configuration)

---

## 🎯 Project Overview

The Product Ranking API is a backend service that manages product information and provides intelligent search and filtering capabilities. It follows modern backend development practices including separation of concerns, modular architecture, and clean coding principles.

---

## ✨ Features

### Core Functionality

1. **Add Products** - Create new product entries with detailed metadata and ratings/reviews
2. **Search by Brand** - Filter products by popular brands:
   - iPhone (Apple)
   - Samsung (Galaxy)
   - Google (Pixel)
   - OnePlus
   - Budget phones (Sasta - ≤50,000 price range)

3. **Search by Storage Capacity** - Find products with specific storage (64GB)
4. **Search by Price Range** - Filter by minimum price (50000, 60000)
5. **Search by Ratings** - Filter products with minimum ratings (3, 4)
6. **Search by Reviews** - Filter products with minimum review count (1000, 2000)
7. **Search by RAM** - Filter by RAM capacity (4GB, 8GB, 14GB, 16GB)
8. **Sort by Ratings** - Get top 10 products sorted by highest ratings (descending)
9. **Sort by Reviews** - Get top 10 products sorted by fewest reviews (ascending)
10. **Sort by Returns** - Get top 10 products sorted by fewest returns (ascending)
11. **Fetch Product by ID** - Retrieve detailed information for a specific product
12. **Update Metadata** - Modify product metadata information

---

## 📁 Project Structure

```
product-ranking/
├── controllers/
│   └── product.controller.js          # Business logic for product operations
├── models/
│   └── product.model.js               # MongoDB schema definition
├── routes/
│   └── product.routes.js              # API endpoint definitions
├── configs/
│   └── mongodb.configs.js             # Database connection configuration
├── middlewares/                       # Placeholder for future middleware
├── .env                               # Environment variables (PORT=3030)
├── package.json                       # Project dependencies
├── server.js                          # Express server entry point
└── Readme.md                          # Project documentation
```

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js ^5.2.1 |
| **Database** | MongoDB with Mongoose ^9.1.5 |
| **Environment** | dotenv ^17.2.3 |
| **HTTP Client** | Axios |
| **Dev Server** | Nodemon |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud - Atlas)
- npm or yarn

### Steps

1. **Clone and navigate to project:**
   ```bash
   cd product-ranking
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=3030
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Start the server:**
   ```bash
   npm run dev    # Uses nodemon for development
   # or
   node server.js # Direct execution
   ```

   Server will run at: `http://localhost:3030`

---

## 🌐 API Routes

### Base URL
```
http://localhost:3030/api/v1/product
```

### Endpoints

1. **Add Product**
- **Route:** `POST /api/v1/product/add`
- **Description:** Create a new product entry
- **Request Body:**
  ```json
  {
    "model": "Motorola Moto G72",
    "storage_capacity": "128GB",
    "release_date": "2023-01-01",
    "Price": 20599,
    "ratings": 4.5,
    "reviews": 1250,
    "returns": 15,
    "metadata": {
      "ram": "6GB",
      "storage": "128GB",
      "screensize": "6.6-inches",
      "brightness": "1300nits"
    }
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "message": "Product added successfully",
    "product": { ...product details }
  }
  ```

#### 2. Search Products (Advanced Filters)
- **Route:** `GET /api/v1/product/search`
- **Description:** Search products by brand, storage, price, ratings, reviews, or RAM
- **Query Parameters:**
  - `brand`: Search by brand (sasta, iphone, samsung, google, oneplus)
  - `storage`: Search by storage capacity (64GB)
  - `price`: Filter by minimum price (50000, 60000)
  - `ratings`: Filter by minimum rating (3, 4)
  - `reviews`: Filter by minimum review count (1000, 2000)
  - `ram`: Filter by RAM capacity (4gb, 8gb, 14gb, 16gb)
- **Examples:**
  ```
  GET /api/v1/product/search?brand=iphone
  GET /api/v1/product/search?storage=64GB
  GET /api/v1/product/search?price=50000
  GET /api/v1/product/search?ratings=4
  GET /api/v1/product/search?reviews=1000
  GET /api/v1/product/search?ram=8gb
  GET /api/v1/product/search?brand=samsung&price=60000
  ```
- **Response:** `200 OK`
  ```json
  {
    "message": "Product fetched successfully",
    "data": [ ...products ]
  }
  ```

#### 3. Sort Products by Ratings
- **Route:** `GET /api/v1/product/sortByRatings`
- **Description:** Fetch top 10 products sorted by highest ratings (descending)
- **Response:** `200 OK`
  ```json
  {
    "message": "Products fetched successfully",
    "data": [ ...products ]
  }
  ```

#### 4. Sort Products by Reviews
- **Route:** `GET /api/v1/product/sortByReviews`
- **Description:** Fetch top 10 products sorted by most reviews (descending)
- **Response:** `200 OK`
  ```json
  {
    "message": "Products fetched successfully",
    "data": [ ...products ]
  }
  ```

#### 5. Sort Products by Returns
- **Route:** `GET /api/v1/product/sortByReturns`
- **Description:** Fetch top 10 products sorted by fewest returns (ascending)
- **Response:** `200 OK`
  ```json
  {
    "message": "Products fetched successfully",
    "data": [ ...products ]
  }
  ```

#### 6. Get Product by ID
- **Route:** `GET /api/v1/product/search/:id`
- **Description:** Fetch a specific product by MongoDB ObjectId
- **Path Parameters:**
  - `id`: Product MongoDB ID
- **Response:** `200 OK` or `404 Not Found`
  ```json
  {
    "message": "Product fetched successfully",
    "product": { ...product details }
  }
  ```

#### 7. Update Metadata
- **Route:** `PATCH /api/v1/product/meta-data`
- **Description:** Update product metadata information
- **Response:** `201 Created`
  ```json
  {
    "message": "Meta data updated successfully"
  }
  ```

#### 8. Test Route
- **Route:** `GET /test`
- **Description:** Health check endpoint
- **Response:** `200 OK`
  ```json
  {
    "message": "This is test route."
  }
  ```

---

## 🏗️ Architecture & Design Principles

### 1. **Separation of Concerns**
The project follows a **3-layer architecture**:

#### **Controllers Layer** (`controllers/product.controller.js`)
- Handles HTTP request/response logic
- Validates incoming data
- Calls model methods
- Returns formatted responses
- **Responsibility:** Pure business logic implementation

#### **Models Layer** (`models/product.model.js`)
- Defines MongoDB schema with Mongoose
- Enforces data validation and constraints
- Specifies data types and required fields
- **Responsibility:** Data structure and persistence logic

#### **Routes Layer** (`routes/product.routes.js`)
- Maps HTTP methods to controller functions
- Defines API endpoint paths
- Acts as router between requests and controllers
- **Responsibility:** Routing and endpoint mapping

### 2. **Modularity**
- Each file has a **single responsibility**
- Controllers export reusable functions
- Routes are imported and used as middleware
- Models are self-contained schemas
- Easy to test, maintain, and extend

### 3. **Clean Coding Practices**

#### Error Handling
```javascript
try {
  // Business logic
  res.status(200).json({ message: "Success", data });
} catch (error) {
  console.log(error);
  res.status(500).json({ message: "Something went wrong, try again." });
}
```

#### Naming Conventions
- **Descriptive file names:** `product.controller.js`, `product.model.js`
- **Clear function names:** `addProduct`, `getProduct`, `getProductById`
- **Query parameters:** `brand`, `storage`

#### Code Organization
- Grouped related functionality
- Consistent indentation and formatting
- Comments for complex logic
- Separation of concerns at each layer

### 4. **Async/Await Pattern**
All database operations use `async/await` for cleaner, more readable code:
```javascript
const getProduct = async (req, res) => {
  try {
    const data = await ProductModel.find({ /* query */ });
    res.status(200).json({ message: "Success", data });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};
```

### 5. **Database Integration**
- **Mongoose:** Object Data Modeling for MongoDB
- **Schema Validation:** Enforces data types and constraints
- **Enums:** Limited valid values for metadata fields (RAM: 4GB/8GB/14GB, Storage: 32GB/64GB/128GB/256GB)
- **Indexed Queries:** Efficient database searches
- **New Numeric Fields:** ratings, reviews, returns for product analytics

---

## 💡 Usage Examples

### Using Postman or cURL

#### Example 1: Add a Product
```bash
curl -X POST http://localhost:3030/api/v1/product/add \
  -H "Content-Type: application/json" \
  -d '{
    "model": "iPhone 15 Pro",
    "storage_capacity": "256GB",
    "release_date": "2023-09-22",
    "price": 999,
    "metadata": {
      "ram": "8GB",
      "storage": "256GB",
      "screensize": "6.1-inches",
      "brightness": "2000nits"
    }
  }'
```

#### Example 2: Search by Price
```bash
curl "http://localhost:3030/api/v1/product/search?price=50000"
```

#### Example 3: Search by Ratings
```bash
curl "http://localhost:3030/api/v1/product/search?ratings=4"
```

#### Example 4: Search by Reviews
```bash
curl "http://localhost:3030/api/v1/product/search?reviews=1000"
```

#### Example 5: Search by RAM
```bash
curl "http://localhost:3030/api/v1/product/search?ram=8gb"
```

#### Example 6: Get Top Rated Products
```bash
curl "http://localhost:3030/api/v1/product/sortByRatings"
```

#### Example 7: Get Products with Fewest Returns
```bash
curl "http://localhost:3030/api/v1/product/sortByReturns"
```

#### Example 8: Get Product by ID
```bash
curl "http://localhost:3030/api/v1/product/search/507f1f77bcf86cd799439011"
```

---

## ⚙️ Environment Configuration

### `.env` File
```env
PORT=3030
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/product-ranking
```

### Default Configuration
- **Port:** 3030 (fallback: 8080)
- **Server Mode:** Development with Nodemon
- **JSON Parsing:** Enabled via `express.json()` middleware

---

## 🔄 Development Workflow

1. **Start Server:**
   ```bash
   npm run dev
   ```

2. **Make Requests:** Use Postman or cURL to test endpoints

3. **View Logs:** Console logs appear in terminal for debugging

4. **Make Changes:** Nodemon auto-restarts on file changes

---

**Happy Coding! 🚀**
