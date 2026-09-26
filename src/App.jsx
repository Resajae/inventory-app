import React, { useEffect, useMemo, useState } from 'react'
import InventoryForm from './components/InventoryForm.jsx'
import InventoryList from './components/InventoryList.jsx'

const STORAGE_KEY = 'inventory-items'

const seedData = [
  { id: 1, name: 'Wireless Mouse', category: 'Electronics', price: 799.99, quantity: 42 },
  { id: 2, name: 'Mechanical Keyboard', category: 'Electronics', price: 1559.99, quantity: 15 },
  { id: 3, name: 'Office Chair', category: 'Furniture', price: 1529.55, quantity: 0 },
]

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : seedData
  } catch {
    return seedData
  }
}

export default function App() {
  const [items, setItems] = useState(loadItems)
  const [editingItem, setEditingItem] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  // CREATE + UPDATE
  const handleSave = (item) => {
    if (editingItem) {
      setItems((prev) => prev.map((i) => (i.id === editingItem.id ? { ...item, id: editingItem.id } : i)))
      setEditingItem(null)
    } else {
      const newItem = { ...item, id: Date.now() }
      setItems((prev) => [...prev, newItem])
    }
  }

  // DELETE
  const handleDelete = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    if (editingItem && editingItem.id === id) setEditingItem(null)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => setEditingItem(null)

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return items
    return items.filter(
      (i) =>
        i.name.toLowerCase().includes(term) ||
        (i.category || '').toLowerCase().includes(term) ||
        String(i.id).includes(term)
    )
  }, [items, search])

  const totals = useMemo(() => {
    const totalItems = items.reduce((sum, i) => sum + Number(i.quantity), 0)
    const totalValue = items.reduce((sum, i) => sum + Number(i.quantity) * Number(i.price), 0)
    const lowStock = items.filter((i) => i.quantity > 0 && i.quantity <= 5).length
    const outOfStock = items.filter((i) => i.quantity === 0).length
    return { totalItems, totalValue, lowStock, outOfStock }
  }, [items])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Inventory Management System</h1>
        <p>Welcome! Manage your inventory with ease.</p>
      </header>

      <section className="stats">
        <div className="stat-card">
          <span className="stat-value">{items.length}</span>
          <span className="stat-label">Products</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totals.totalItems}</span>
          <span className="stat-label">Units in Stock</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">₱{totals.totalValue.toFixed(2)}</span>
          <span className="stat-label">Total Value</span>
        </div>
        <div className="stat-card warn">
          <span className="stat-value">{totals.lowStock}</span>
          <span className="stat-label">Low Stock</span>
        </div>
        <div className="stat-card danger">
          <span className="stat-value">{totals.outOfStock}</span>
          <span className="stat-label">Out of Stock</span>
        </div>
      </section>

      <InventoryForm onSave={handleSave} editingItem={editingItem} onCancel={handleCancelEdit} />

      <section className="list-section">
        <div className="list-header">
          <h2>Inventory ({filteredItems.length})</h2>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, category or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <InventoryList items={filteredItems} onEdit={handleEdit} onDelete={handleDelete} />
      </section>
    </div>
  )
}
