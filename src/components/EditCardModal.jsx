import { useState } from 'react'

export default function EditCardModal({ card, colors, updateCard, onClose }) {
  const [title, setTitle] = useState(card.title)
  const [priority, setPriority] = useState(card.priority)
  const [dueDate, setDueDate] = useState(card.due_date || '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) { setError('Title is required'); return }
    setSaving(true)
    await updateCard(card.id, { title: title.trim(), priority, due_date: dueDate || null })
    setSaving(false)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ borderLeftColor: colors.accent }}>
          <h2 className="modal-title">Edit Card</h2>
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
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
