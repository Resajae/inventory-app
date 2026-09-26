import React from 'react'

function getStatus(quantity) {
  if (quantity === 0) return { label: 'Out of Stock', className: 'status-out' }
  if (quantity <= 5) return { label: 'Low Stock', className: 'status-low' }
  return { label: 'In Stock', className: 'status-ok' }
}

export default function InventoryList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return <p className="empty-state">No inventory items yet. Add one above to get started.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const status = getStatus(item.quantity)
            return (
              <tr key={item.id} className={item.quantity === 0 ? 'out-of-stock' : ''}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category || '—'}</td>
                <td>₱{Number(item.price).toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>
                  <span className={`status-badge ${status.className}`}>{status.label}</span>
                </td>
                <td className="actions">
                  <button className="btn btn-small btn-edit" onClick={() => onEdit(item)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-small btn-delete"
                    onClick={() => {
                      if (window.confirm(`Delete "${item.name}"?`)) onDelete(item.id)
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
