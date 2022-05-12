import {DatabaseManager} from 'src/database/DatabaseManager'
import {NoteDataStore} from 'src/database/NoteDataStore'
import {LoadingState} from 'src/models/LoadingState'
import {NoteModel} from 'src/models/NoteModel'
import create, {StoreApi, UseBoundStore} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {v4 as uuid} from 'uuid'

export interface ApiState<T> {
  state: LoadingState
  data: T
}

export interface AppStore {
  notes: NoteModel[]
  loadingState: LoadingState
  error?: unknown
  loadNotes(db: DatabaseManager): Promise<void>
  updateNote(updatedNote: NoteModel, db: DatabaseManager): Promise<void>
  addNote(db: DatabaseManager): Promise<NoteModel>
}

export const createAppStore = (): UseBoundStore<StoreApi<AppStore>> => {
  return create<AppStore>()(
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

      async addNote(db: DatabaseManager): Promise<NoteModel> {
        const note = createEmptyNote()
        await NoteDataStore.insert(db, note)

        set(state => {
          state.notes.push(note)
        })

        return note
      },
    })),
  )
}

const createEmptyNote = (): NoteModel => ({
  id: uuid(),
  createdAt: new Date(),
  updatedAt: new Date(),
})
