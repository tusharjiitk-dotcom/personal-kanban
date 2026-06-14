import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useCards() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    supabase
      .from('cards')
      .select('*')
      .order('position')
      .then(({ data }) => {
        if (mounted && data) {
          setCards(data)
          setLoading(false)
        }
      })

    const channel = supabase
      .channel('cards-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cards' }, () => {
        supabase
          .from('cards')
          .select('*')
          .order('position')
          .then(({ data }) => { if (mounted && data) setCards(data) })
      })
      .subscribe()

    return () => {
      mounted = false
      supabase.removeChannel(channel)
    }
  }, [])

  async function addCard({ title, priority, due_date, col }) {
    const position = cards.filter(c => c.col === col).length
    const { data, error } = await supabase
      .from('cards')
      .insert({ title, priority, due_date: due_date || null, col, position })
      .select()
      .single()
    if (data) setCards(prev => [...prev, data])
    return { data, error }
  }

  async function deleteCard(id) {
    setCards(prev => prev.filter(c => c.id !== id))
    await supabase.from('cards').delete().eq('id', id)
  }

  async function updateCard(id, { title, priority, due_date }) {
    setCards(prev => prev.map(c => c.id === id ? { ...c, title, priority, due_date: due_date || null } : c))
    await supabase.from('cards').update({ title, priority, due_date: due_date || null }).eq('id', id)
  }

  async function moveCard({ srcColId, dstColId, newSrcList, newDstList }) {
    // Optimistic update
    setCards(prev => {
      const map = new Map(prev.map(c => [c.id, { ...c }]))
      if (srcColId !== dstColId) {
        newSrcList.forEach((c, i) => map.set(c.id, { ...map.get(c.id), col: srcColId, position: i }))
      }
      newDstList.forEach((c, i) => map.set(c.id, { ...map.get(c.id), col: dstColId, position: i }))
      return Array.from(map.values())
    })

    const updates = []
    if (srcColId !== dstColId) {
      newSrcList.forEach((c, i) => updates.push({ id: c.id, col: srcColId, position: i }))
    }
    newDstList.forEach((c, i) => updates.push({ id: c.id, col: dstColId, position: i }))

    await Promise.all(
      updates.map(u => supabase.from('cards').update({ col: u.col, position: u.position }).eq('id', u.id))
    )
  }

  return { cards, loading, addCard, deleteCard, moveCard, updateCard }
}
