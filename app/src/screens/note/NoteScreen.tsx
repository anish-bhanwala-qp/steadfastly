import React from 'react'
import {useParams} from 'react-router-dom'
import {useDb} from 'src/providers/DbProvider'
import {useAppStore} from 'src/store/appStore'
import {NoteEditor} from './components/NoteEditor'
import {NoteTitle} from './components/NoteTitle'
import {NoteWrapper} from './components/NoteWrapper'

export const NoteScreen: React.FC = () => {
  const db = useDb()
  const params = useParams()
  const data = useAppStore(state => state.notes.find(n => n.id === params.id!))
  const updateNote = useAppStore(state => state.updateNote)

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
