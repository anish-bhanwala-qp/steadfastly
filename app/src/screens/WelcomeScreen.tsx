import React from 'react'
import {AddNoteButton} from 'src/components/addNoteButton/AddNoteButton'

export const WelcomeScreen: React.FC = () => {
  return (
    <div>
      <h1>Get started</h1>
      <AddNoteButton />
    </div>
  )
}
