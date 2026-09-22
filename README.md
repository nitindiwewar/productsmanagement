# RoyalsWebtech - Product Management System

Full-stack Web Application featuring a **Store Front** (Home Page with Buy action) and an **Admin Dashboard** for performing product **CRUD (Create, Read, Update, Delete)** operations. Built using **React (Vite + Tailwind CSS)**, **Java (Spring Boot REST API)**, and **MySQL Database**.

---

## 🐳 Docker Deployment Guide

### Option 1: One-Command Deployment using Docker Compose
Make sure Docker Desktop is running, then run:

```bash
docker compose up --build -d
```

This will automatically build and start:
- **MySQL Database**: Running on port `3306` with `royals_db` auto-initialized.
- **Spring Boot Backend**: Running on port `8080`.

To stop the containers:
```bash
docker compose down
```

### Option 2: Build & Run Backend Docker Container Manually

1. **Build Docker Image**:
   ```bash
   cd backend
   docker build -t product-backend .
   ```

2. **Run Container**:
   ```bash
   docker run -d -p 8080:8080 --name royals_backend_app product-backend
   ```

---

## 📁 Project Structure

```
RoyalsWebtech/
├── docker-compose.yml          # Docker Compose orchestration
├── database/
│   └── schema.sql              # MySQL database schema
├── backend/                    # Java (Spring Boot) REST API
│   ├── Dockerfile              # Multi-stage Docker build file
│   ├── pom.xml                 # Maven configuration & dependencies
│   └── src/
│       └── main/
│           ├── java/com/royalswebtech/productapp/
│           │   ├── ProductApplication.java
│           │   ├── controller/ProductController.java
│           │   ├── dto/ProductDto.java
│           │   ├── model/Product.java
│           │   └── repository/ProductRepository.java
│           └── resources/application.properties
└── frontend/                   # React + Vite + Tailwind CSS Application
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx             # React Router (/ and /admin)
        ├── services/api.js      # REST API client
        └── components/
            ├── Navbar.jsx
            ├── HomePage.jsx    # Store Front (Buy Now action)
            ├── AdminDashboard.jsx # Admin Dashboard (CRUD table)
            ├── ProductFormModal.jsx
            └── ProductDetailModal.jsx
```
