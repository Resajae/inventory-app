# Inventory Management System

A simple React (Vite) inventory app with full CRUD functionality:

- **Create** — add new inventory items (name, category, price, quantity)
- **Read** — view all items in a searchable table, with a live summary strip and an auto-computed status (In Stock / Low Stock / Out of Stock)
- **Update** — edit any existing item
- **Delete** — remove items (with confirmation)

Each item has: **ID, Name, Category, Price, Quantity, Status** (Status is derived from Quantity, not entered manually).

Data persists in the browser's `localStorage`, so your inventory is saved between reloads.

## Getting Started

1. Install [Node.js](https://nodejs.org/) (v18 or later recommended).
2. Unzip this project, then open a terminal in the project folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for Production

```bash
npm run build
npm run preview
```

The production-ready files will be in the `dist/` folder.

## Project Structure

```
inventory-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx            # Main app: CRUD logic, stats, search
    ├── App.css            # Styling
    └── components/
        ├── InventoryForm.jsx   # Add/edit form with validation
        └── InventoryList.jsx   # Table view with edit/delete actions
```

## Notes / Next Steps

- This starter uses `localStorage` for persistence. To connect it to a real backend,
  replace the `loadItems`/`localStorage.setItem` calls in `App.jsx` with API calls
  (e.g. `fetch('/api/items')`).
- Feel free to extend the `Item` shape (e.g. add supplier, location, image) in
  `InventoryForm.jsx` and `InventoryList.jsx`.
