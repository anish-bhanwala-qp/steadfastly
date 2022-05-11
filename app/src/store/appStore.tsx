import {DatabaseManager} from 'src/database/DatabaseManager'
import {NoteDataStore} from 'src/database/NoteDataStore'
import {LoadingState} from 'src/models/LoadingState'
import {NoteModel} from 'src/models/NoteModel'
import create from 'zustand'
import {immer} from 'zustand/middleware/immer'

export interface ApiState<T> {
  state: LoadingState
  data: T
}

interface Store {
  notes: NoteModel[]
  loadingState: LoadingState
  error?: unknown
  loadNotes(db: DatabaseManager): Promise<void>
  updateNote(updatedNote: NoteModel, db: DatabaseManager): Promise<void>
}

export const useAppStore = create<Store>()(
  immer((set, get) => ({
    notes: [],
    loadingState: LoadingState.PENDING,
    async loadNotes(db: DatabaseManager): Promise<void> {
      try {
        const notes = await NoteDataStore.findAll(db)
        set(state => {
          state.notes = notes
          state.loadingState = LoadingState.DONE
        })
      } catch (error) {
        set(state => {
          state.error = error
          state.loadingState = LoadingState.ERROR
        })
      }
    },

    async updateNote(
      updatedNote: NoteModel,
      db: DatabaseManager,
    ): Promise<void> {
      set(state => {
        const note = state.notes.find(n => updatedNote.id === n.id)
        if (!note) throw new Error(`Note not found for id: ${updatedNote.id}`)
        note.title = updatedNote.title
        note.content = updatedNote.content
        note.updatedAt = updatedNote.updatedAt
      })

      await NoteDataStore.updateById(db, updatedNote.id, updatedNote)
    },
  })),
)
