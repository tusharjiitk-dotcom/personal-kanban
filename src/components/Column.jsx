import { useState } from 'react'
import { Droppable } from '@hello-pangea/dnd'
import { COLORS, WIP_LIMIT } from '../constants'
import Card from './Card'
import AddCardModal from './AddCardModal'
import EditCardModal from './EditCardModal'

export default function Column({ col, cards, totalInCol, wipCount, draggingFromCol, addCard, deleteCard, updateCard }) {
  const [showModal, setShowModal] = useState(false)
  const [editingCard, setEditingCard] = useState(null)
  const [collapsed, setCollapsed] = useState(false)
  const colors = COLORS[col.color]

  const isWip = col.id === 'wip'
  const wipFull = isWip && totalInCol >= WIP_LIMIT
  const isDropDisabled = isWip && draggingFromCol !== 'wip' && wipCount >= WIP_LIMIT
  const count = isWip ? `${totalInCol}/${WIP_LIMIT}` : cards.length

  if (collapsed) {
    return (
      <div
        className="column column-collapsed"
        style={{ backgroundColor: colors.columnBg }}
        onClick={() => setCollapsed(false)}
        title={`Expand ${col.label}`}
      >
        <div className="column-collapsed-inner">
          <div className="column-accent" style={{ backgroundColor: colors.accent }} />
          <span className="column-collapsed-label" style={{ color: colors.headerText }}>{col.label}</span>
          <span className="badge" style={{ backgroundColor: colors.badgeBg, color: colors.badgeText, fontSize: '0.55rem' }}>
            {count}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="column" style={{ backgroundColor: colors.columnBg }}>
      <div className="column-header" style={{ backgroundColor: colors.headerBg }}>
        <div className="column-header-left">
          <div className="column-accent" style={{ backgroundColor: colors.accent }} />
          <span className="column-title" style={{ color: colors.headerText }}>{col.label}</span>
          <span className="column-count badge" style={{ backgroundColor: colors.badgeBg, color: colors.badgeText }}>
            {count}
          </span>
        </div>
        <div className="column-header-actions">
          <button
            className="add-card-btn"
            style={{ color: colors.headerText }}
            onClick={() => setShowModal(true)}
            disabled={wipFull}
            title={wipFull ? `WIP limit of ${WIP_LIMIT} reached` : `Add to ${col.label}`}
          >
            +
          </button>
          <button
            className="collapse-btn"
            style={{ color: colors.headerText }}
            onClick={() => setCollapsed(true)}
            title={`Collapse ${col.label}`}
          >
            ‹
          </button>
        </div>
      </div>

      {wipFull && (
        <div className="wip-banner" style={{ backgroundColor: colors.badgeBg, color: colors.badgeText }}>
          WIP limit reached — {WIP_LIMIT}/{WIP_LIMIT}
        </div>
      )}

      <Droppable droppableId={col.id} isDropDisabled={isDropDisabled}>
        {(provided, snapshot) => (
          <div
            className={`column-body ${snapshot.isDraggingOver && !isDropDisabled ? 'dragging-over' : ''} ${isDropDisabled && snapshot.draggingFromThisWith == null ? 'drop-blocked' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={snapshot.isDraggingOver && !isDropDisabled ? { backgroundColor: colors.headerBg } : undefined}
          >
            {cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                accentColor={colors.accent}
                deleteCard={deleteCard}
                onEdit={setEditingCard}
              />
            ))}
            {provided.placeholder}
            {cards.length === 0 && (
              <p className="column-empty">Drop cards here</p>
            )}
          </div>
        )}
      </Droppable>

      {showModal && (
        <AddCardModal
          colId={col.id}
          colLabel={col.label}
          colors={colors}
          addCard={addCard}
          onClose={() => setShowModal(false)}
        />
      )}

      {editingCard && (
        <EditCardModal
          card={editingCard}
          colors={colors}
          updateCard={updateCard}
          onClose={() => setEditingCard(null)}
        />
      )}
    </div>
  )
}
