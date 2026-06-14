import { useState, useMemo } from 'react'
import { useCards } from './hooks/useCards'
import { COLUMNS } from './constants'
import StatsBar from './components/StatsBar'
import FilterBar from './components/FilterBar'
import Board from './components/Board'

function getDueStatus(due_date) {
  if (!due_date) return 'none'
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7)
  const due = new Date(due_date + 'T00:00:00')
  if (due < today) return 'overdue'
  if (due <= nextWeek) return 'this-week'
  return 'later'
}

export default function App() {
  const { cards, loading, addCard, deleteCard, moveCard, updateCard } = useCards()
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [dueFilter, setDueFilter] = useState('')

  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      if (search && !card.title.toLowerCase().includes(search.toLowerCase())) return false
      if (priorityFilter && card.priority !== priorityFilter) return false
      if (dueFilter) {
        const status = getDueStatus(card.due_date)
        if (dueFilter === 'overdue'   && status !== 'overdue')   return false
        if (dueFilter === 'this-week' && status !== 'this-week') return false
        if (dueFilter === 'later'     && status !== 'later' && status !== 'none') return false
      }
      return true
    })
  }, [cards, search, priorityFilter, dueFilter])

  const cardsByCol = useMemo(() => {
    const byCol = Object.fromEntries(COLUMNS.map(c => [c.id, []]))
    filteredCards.forEach(card => { if (byCol[card.col]) byCol[card.col].push(card) })
    Object.keys(byCol).forEach(col => byCol[col].sort((a, b) => a.position - b.position))
    return byCol
  }, [filteredCards])

  const stats = useMemo(() => {
    const today = new Date(); today.setHours(0, 0, 0, 0)
    return {
      total:     cards.length,
      wip:       cards.filter(c => c.col === 'wip').length,
      overdue:   cards.filter(c => c.due_date && new Date(c.due_date + 'T00:00:00') < today).length,
      completed: cards.filter(c => c.col === 'completed').length,
    }
  }, [cards])

  if (loading) return <div className="loading">Loading board…</div>

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Kanban Board</h1>
        <input
          className="search-input"
          type="search"
          placeholder="Search cards…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </header>

      <StatsBar stats={stats} />

      <FilterBar
        priorityFilter={priorityFilter}
        dueFilter={dueFilter}
        onPriorityChange={setPriorityFilter}
        onDueChange={setDueFilter}
      />

      <Board
        cards={cards}
        cardsByCol={cardsByCol}
        addCard={addCard}
        deleteCard={deleteCard}
        moveCard={moveCard}
        updateCard={updateCard}
      />
    </div>
  )
}
