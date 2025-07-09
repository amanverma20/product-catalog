# 🛍️ Product Catalog Viewer – Front-End Intern Assignment

A fully responsive e-commerce product catalog built using **Next.js**, **Tailwind CSS**, and **ShadCN UI**, integrated with the [FakeStoreAPI.in](https://fakestoreapi.in). The project includes infinite scrolling, filtering by category, cart functionality with local storage, and dynamic product detail pages.

---

## 🎯 Objective

> Build a product listing app using React/Next.js with real API integration, infinite scroll, cart functionality, filtering, and responsive design.

---

## 🌐 API Reference – fakestoreapi.in

**Base URL:** `https://fakestoreapi.in`

| Feature               | Endpoint                                                  |
|----------------------|-----------------------------------------------------------|
| List Products        | `GET /api/products?page=<number>&limit=<number>`         |
| Single Product       | `GET /api/products/<product_id>`                         |
| List Categories      | `GET /api/categories`                                    |
| Products by Category | `GET /api/categories/<category_slug>/products`           |

Example: `/api/products?page=1&limit=8`

---

## ⚙️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN UI
- **State Management**: `useState`, `useContext`
- **Persistence**: localStorage (for cart)
- **Pagination**: Infinite scroll via `IntersectionObserver`

---

## 📦 Features

### 1. 🗂 Product Listing Page
- Displays products in a responsive grid
- Loads 8 products per page from paginated API
- Infinite scroll using `IntersectionObserver`
- Loading spinner while fetching new data

### 2. 📄 Product Detail Page
- Dynamic route `/product/[id]`
- Shows image, title, price, description, category, and rating

### 3. 🛒 Cart
- Add/remove products from the cart
- Cart state stored in `localStorage`
- Cart page with:
  - Product title, quantity, price
  - Remove item button
  - Total cost calculation

### 4. 🔍 Filter by Category
- Fetch categories from API
- Filter product list based on selected category
- (Bonus) Filtering + infinite scroll integration

### 5. 📱 Responsive UI
- Mobile view inspired by: [Savana Activity](https://www.savana.com/activity/dresses-12023)
- Desktop layout customized creatively
- Fluid grid, flexible buttons, and consistent styling

---

## 📁 Folder Structure

