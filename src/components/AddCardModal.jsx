import { useState } from 'react'

export default function AddCardModal({ colId, colLabel, colors, addCard, onClose }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) { setError('Title is required'); return }
    setSaving(true)
    const { error: err } = await addCard({ title: title.trim(), priority, due_date: dueDate || null, col: colId })
    setSaving(false)
    if (err) { setError(err.message); return }
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ borderLeftColor: colors.accent }}>
          <h2 className="modal-title">Add to {colLabel}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="form-label">
            Title *
            <input
              className="form-input"
              type="text"
              value={title}
              onChange={e => { setTitle(e.target.value); setError('') }}
              placeholder="Card title…"
              autoFocus
              maxLength={200}
            />
          </label>
          <label className="form-label">
            Priority
            <select className="form-input" value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <label className="form-label">
            Due Date
            <input
              className="form-input"
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: colors.accent }}
              disabled={saving}
            >
              {saving ? 'Adding…' : 'Add Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
