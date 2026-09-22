# RoyalsWebtech - Product Management System

Full-stack Web Application with a customer-facing **Store Front** (Home Page) and an **Admin Dashboard** for performing complete product **CRUD (Create, Read, Update, Delete)** operations. Built using **React (Vite + Tailwind CSS)**, **Java (Spring Boot REST API)**, and **MySQL Database**.

---

## 📁 Project Structure

```
RoyalsWebtech/
├── database/
│   └── schema.sql              # MySQL database schema & seed data
├── backend/                    # Java (Spring Boot) REST API
│   ├── pom.xml                 # Maven configuration & dependencies
│   └── src/
│       ├── main/
│       │   ├── java/com/royalswebtech/productapp/
│       │   │   ├── ProductApplication.java
│       │   │   ├── controller/
│       │   │   │   └── ProductController.java
│       │   │   ├── dto/
│       │   │   │   ├── ProductDto.java
│       │   │   │   └── MessageResponse.java
│       │   │   ├── model/
│       │   │   │   └── Product.java
│       │   │   ├── repository/
│       │   │   │   └── ProductRepository.java
│       │   │   └── security/
│       │   │       └── SecurityConfig.java
│       │   └── resources/
│       │       └── application.properties
├── frontend/                   # React + Vite + Tailwind CSS Application
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx             # Main Application container
│       ├── main.jsx
│       ├── services/
│       │   └── api.js          # Axios REST API Client
│       └── components/
│           ├── Navbar.jsx      # Header with navigation & Add action
│           ├── HomePage.jsx    # Store Front product catalog grid
│           ├── AdminDashboard.jsx # Admin Dashboard with CRUD table & KPIs
│           ├── ProductFormModal.jsx # Add & Edit Product Modal
│           └── ProductDetailModal.jsx # Detailed view modal
└── README.md
```

---

## 🚀 How to Run the Application

### 1. Database Setup (MySQL)
1. Open your MySQL client (MySQL Workbench, Command Line, or phpMyAdmin).
2. Run the SQL script located at `database/schema.sql`:
   ```sql
   SOURCE d:/RoyalsWebtech/database/schema.sql;
   ```
   This will create the `royals_db` database, `products` table, and populate initial seed products.

### 2. Backend Setup (Java Spring Boot)
1. Update database credentials in `backend/src/main/resources/application.properties` if your MySQL username/password is different:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```
2. Navigate to `backend` and run the Spring Boot application using Maven or your Java IDE (IntelliJ IDEA / Eclipse / VS Code):
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   *The backend REST API will start at `http://localhost:8080`.*

### 3. Frontend Setup (React)
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

---

## 🛠️ Features & CRUD Functionality

### 🛒 Store Front (Home Page)
- **Product Gallery Grid**: Displays all products with images, categories, prices, and low-stock indicators.
- **Search & Filter**: Search products by name/description in real-time, or filter by categories (*Electronics, Fashion, Home & Living, Accessories*).
- **Product Detail Modal**: View comprehensive product descriptions and stock status.

### ⚙️ Admin Dashboard
- **KPI Metrics Cards**: Displays real-time metrics for *Total Products*, *Total Inventory Value*, *Low Stock Warning*, and *Active Categories*.
- **Interactive Data Table**: View all inventory items with image thumbnails, price formatting, category badges, and stock level indicators.
- **CRUD Actions**:
  - **Create**: Click "+ Add Product" to open the form modal with real-time image preview and validation.
  - **Read**: View details of any product directly.
  - **Update**: Click the Edit icon on any table row to modify price, stock, description, or image.
  - **Delete**: Click the Trash icon to instantly remove a product from inventory.
