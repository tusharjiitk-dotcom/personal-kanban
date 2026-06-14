const PRIORITY_OPTS = [
  { val: '',       label: 'All Priority' },
  { val: 'high',   label: 'High' },
  { val: 'medium', label: 'Medium' },
  { val: 'low',    label: 'Low' },
]

const DUE_OPTS = [
  { val: '',           label: 'All Dates' },
  { val: 'overdue',    label: 'Overdue' },
  { val: 'this-week',  label: 'This Week' },
  { val: 'later',      label: 'Later' },
]

export default function FilterBar({ priorityFilter, dueFilter, onPriorityChange, onDueChange }) {
  return (
    <div className="filter-bar">
      <span className="filter-label">Filter:</span>
      <div className="filter-group">
        {PRIORITY_OPTS.map(({ val, label }) => (
          <button
            key={val}
            className={`filter-btn ${priorityFilter === val ? 'active' : ''}`}
            onClick={() => onPriorityChange(val)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="filter-divider" />
      <div className="filter-group">
        {DUE_OPTS.map(({ val, label }) => (
          <button
            key={val}
            className={`filter-btn ${dueFilter === val ? 'active' : ''}`}
            onClick={() => onDueChange(val)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
