export default function StatsBar({ stats }) {
  return (
    <div className="stats-bar">
      <div className="stat-item">
        <span className="stat-value">{stats.total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-value" style={{ color: '#3B82F6' }}>{stats.wip}</span>
        <span className="stat-label">In Progress</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-value" style={{ color: '#DC2626' }}>{stats.overdue}</span>
        <span className="stat-label">Overdue</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-value" style={{ color: '#10B981' }}>{stats.completed}</span>
        <span className="stat-label">Completed</span>
      </div>
    </div>
  )
}
