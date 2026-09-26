import React, { useEffect, useState } from 'react'

const emptyItem = {
  name: '',
  category: '',
  price: 0,
  quantity: 0,
}

export default function InventoryForm({ onSave, editingItem, onCancel }) {
  const [item, setItem] = useState(emptyItem)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingItem) {
      setItem(editingItem)
    } else {
      setItem(emptyItem)
    }
    setErrors({})
  }, [editingItem])

  const handleChange = (e) => {
    const { name, value } = e.target
    setItem((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value,
    }))
  }

  const validate = () => {
    const newErrors = {}
    if (!item.name.trim()) newErrors.name = 'Name is required'
    if (!item.category.trim()) newErrors.category = 'Category is required'
    if (item.quantity < 0) newErrors.quantity = 'Quantity cannot be negative'
    if (item.price < 0) newErrors.price = 'Price cannot be negative'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSave(item)
    setItem(emptyItem)
  }

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>

      <div className="form-row">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            placeholder="e.g. Wireless Mouse"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={item.category}
            onChange={handleChange}
            placeholder="e.g. Electronics"
          />
          {errors.category && <span className="error">{errors.category}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Price ($)</label>
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={handleChange}
            min="0"
          />
          {errors.quantity && <span className="error">{errors.quantity}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingItem ? 'Update Item' : 'Add Item'}
        </button>
        {editingItem && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
