import { useState } from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import { COLUMNS, WIP_LIMIT } from '../constants'
import Column from './Column'

export default function Board({ cards, cardsByCol, addCard, deleteCard, moveCard }) {
  const [draggingFromCol, setDraggingFromCol] = useState(null)
  const wipCount = cards.filter(c => c.col === 'wip').length

  function onDragStart(start) {
    setDraggingFromCol(start.source.droppableId)
  }

  function onDragEnd(result) {
    setDraggingFromCol(null)
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const srcColId = source.droppableId
    const dstColId = destination.droppableId

    // Guard: WIP limit (also enforced via isDropDisabled, but safety net)
    if (dstColId === 'wip' && srcColId !== 'wip' && wipCount >= WIP_LIMIT) return

    const srcList = [...(cardsByCol[srcColId] || [])]
    const movedCard = srcList[source.index]
    if (!movedCard) return
    srcList.splice(source.index, 1)

    let newSrcList = srcList
    let newDstList

    if (srcColId === dstColId) {
      newDstList = newSrcList
      newDstList.splice(destination.index, 0, movedCard)
    } else {
      newDstList = [...(cardsByCol[dstColId] || [])]
      newDstList.splice(destination.index, 0, { ...movedCard, col: dstColId })
    }

    moveCard({ srcColId, dstColId, newSrcList, newDstList })
  }

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="board">
        {COLUMNS.map(col => (
          <Column
            key={col.id}
            col={col}
            cards={cardsByCol[col.id] || []}
            totalInCol={cards.filter(c => c.col === col.id).length}
            wipCount={wipCount}
            draggingFromCol={draggingFromCol}
            addCard={addCard}
            deleteCard={deleteCard}
          />
        ))}
      </div>
    </DragDropContext>
  )
}
