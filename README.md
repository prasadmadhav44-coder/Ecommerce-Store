# Ecommerce Store

A learning project built with React and Vite to practice building a modern e-commerce storefront.

This project demonstrates front-end app structure, routing, state management, and interactive UI patterns while using real product data from a demo API.

## Features

- Home page with hero section and featured products
- Product catalog with:
  - search
  - category filtering
  - sorting
  - load-more pagination
- Product details page with product information
- Shopping cart with:
  - quantity updates
  - remove item
  - clear cart
- Checkout preview page with order summary
- Contact page with validated form using `react-hook-form` and `zod`
- About page and responsive navigation
- Lazy-loaded contact route for improved performance
- Error page for invalid routes

## Tech stack

- React
- Vite
- Tailwind CSS
- React Router DOM
- React Hook Form
- Zod
- React Shimmer Effects
- React Lazy Load Image Component

## Project structure

- `src/index.jsx` — App entry point
- `src/router/Router.jsx` — Route configuration
- `src/pages/` — Page components
- `src/components/` — UI components and feature components
- `src/store/` — Context stores for cart and wishlist
- `src/hooks/` — Custom hooks
- `src/utils/` — Utility helpers

## Demo summary

This demo app lets users:

- browse products from `https://dummyjson.com/products`
- filter and sort items
- view detailed product pages
- add and manage items in a shopping cart
- preview checkout totals
- submit a contact form with validation

It is built as a learning exercise to combine React UI composition, client-side routing, and form validation.

## Getting started

```bash
npm install
npm run dev
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
```
