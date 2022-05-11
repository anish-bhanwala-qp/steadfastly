import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from 'react-query'
import {NoteDataStore} from 'src/database/NoteDataStore'
import {NoteModel} from 'src/models/NoteModel'
import {useDb} from 'src/providers/DbProvider'
import {v4 as uuid} from 'uuid'

const createEmptyNote = (): NoteModel => ({
  id: uuid(),
  createdAt: new Date(),
  updatedAt: new Date(),
})

export const useAddNoteMutation = (): UseMutationResult<
  NoteModel,
  Error,
  void
> => {
  const db = useDb()

  return useMutation<NoteModel, Error, void>(async (): Promise<NoteModel> => {
    const note = createEmptyNote()
    await NoteDataStore.insert(db, note)

    return note
  })
}

export const useNotesQuery = (): UseQueryResult<NoteModel[]> => {
  const db = useDb()

  return useQuery(['notes'], () => NoteDataStore.findAll(db))
}
