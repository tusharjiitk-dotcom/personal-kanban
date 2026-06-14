import { Draggable } from '@hello-pangea/dnd'
import { PRIORITY_COLORS } from '../constants'

function getDueStatus(due_date) {
  if (!due_date) return null
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7)
  const due = new Date(due_date + 'T00:00:00')
  if (due < today) return 'overdue'
  if (due <= nextWeek) return 'this-week'
  return 'later'
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const DUE_STYLES = {
  overdue:    { bg: '#FEE2E2', text: '#DC2626' },
  'this-week':{ bg: '#FEF9C3', text: '#CA8A04' },
  later:      { bg: '#F1F5F9', text: '#64748B' },
}

export default function Card({ card, index, accentColor, deleteCard }) {
  const isCompleted = card.col === 'completed'
  const dueStatus = getDueStatus(card.due_date)
  const priorityStyle = PRIORITY_COLORS[card.priority] || PRIORITY_COLORS.medium
  const dueStyle = dueStatus ? DUE_STYLES[dueStatus] : null

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`card ${snapshot.isDragging ? 'card-dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ borderLeftColor: accentColor, ...provided.draggableProps.style }}
        >
          <div className="card-top">
            <p className={`card-title ${isCompleted ? 'card-completed' : ''}`}>{card.title}</p>
            <button
              className="card-delete"
              onClick={e => { e.stopPropagation(); deleteCard(card.id) }}
              title="Delete card"
            >
              ×
            </button>
          </div>
          <div className="card-meta">
            <span className="badge" style={{ backgroundColor: priorityStyle.bg, color: priorityStyle.text }}>
              {card.priority}
            </span>
            {card.due_date && dueStyle && (
              <span className="badge" style={{ backgroundColor: dueStyle.bg, color: dueStyle.text }}>
                {dueStatus === 'overdue' ? '⚠ ' : ''}{formatDate(card.due_date)}
              </span>
            )}
            {card.due_date && !dueStatus && (
              <span className="badge" style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}>
                {formatDate(card.due_date)}
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}
