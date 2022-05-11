import React from 'react'
import {Link} from 'react-router-dom'
import {AddNoteButton} from 'src/components/addNoteButton/AddNoteButton'
import {useAppStore} from 'src/store/appStore'
import {WelcomeScreen} from './WelcomeScreen'

export const HomeScreen: React.FC = () => {
  const notes = useAppStore(state => state.notes)

  if (notes.length === 0) return <WelcomeScreen />

  return (
    <div>
      <h1>Your Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.title || 'Untitled'}</Link>
          </li>
        ))}
      </ul>
      <div>
        <AddNoteButton />
      </div>
    </div>
  )
}
