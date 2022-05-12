import React from 'react'
import {useParams} from 'react-router-dom'
import {useAppStore} from 'src/providers/AppStoreProvider'
import {useDb} from 'src/providers/DbProvider'
import {useStore} from 'zustand'
import {NoteEditor} from './components/NoteEditor'
import {NoteTitle} from './components/NoteTitle'
import {NoteWrapper} from './components/NoteWrapper'

export const NoteScreen: React.FC = () => {
  const db = useDb()
  const params = useParams()
  const data = useStore(useAppStore(), state =>
    state.notes.find(n => n.id === params.id!),
  )
  const updateNote = useStore(useAppStore(), state => state.updateNote)

  const note = data!

  const handleUpdateContent = (content?: string): void => {
    updateNote({...note, content}, db)
  }

  const handleUpdateTitle = (title?: string): void => {
    updateNote({...note, title}, db)
  }

  if (!data) return <h1>Note not found</h1>

  return (
    <NoteWrapper>
      <NoteTitle title={note.title} onChange={handleUpdateTitle} />
      <NoteEditor content={note.content} onChange={handleUpdateContent} />
    </NoteWrapper>
  )
}
