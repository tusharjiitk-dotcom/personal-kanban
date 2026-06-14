import { useState } from 'react'
import { Droppable } from '@hello-pangea/dnd'
import { COLORS, WIP_LIMIT } from '../constants'
import Card from './Card'
import AddCardModal from './AddCardModal'

export default function Column({ col, cards, totalInCol, wipCount, draggingFromCol, addCard, deleteCard }) {
  const [showModal, setShowModal] = useState(false)
  const colors = COLORS[col.color]

  const isWip = col.id === 'wip'
  const wipFull = isWip && totalInCol >= WIP_LIMIT
  const isDropDisabled = isWip && draggingFromCol !== 'wip' && wipCount >= WIP_LIMIT

  return (
    <div className="column" style={{ backgroundColor: colors.columnBg }}>
      <div className="column-header" style={{ backgroundColor: colors.headerBg }}>
        <div className="column-header-left">
          <div className="column-accent" style={{ backgroundColor: colors.accent }} />
          <span className="column-title" style={{ color: colors.headerText }}>{col.label}</span>
          <span className="column-count badge" style={{ backgroundColor: colors.badgeBg, color: colors.badgeText }}>
            {isWip ? `${totalInCol}/${WIP_LIMIT}` : cards.length}
          </span>
        </div>
        <button
          className="add-card-btn"
          style={{ color: colors.headerText }}
          onClick={() => setShowModal(true)}
          disabled={wipFull}
          title={wipFull ? `WIP limit of ${WIP_LIMIT} reached` : `Add to ${col.label}`}
        >
          +
        </button>
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
    </div>
  )
}
