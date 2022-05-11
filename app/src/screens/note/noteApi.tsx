import {useQuery, UseQueryResult} from 'react-query'
import {NoteDataStore} from 'src/database/NoteDataStore'
import {NoteModel} from 'src/models/NoteModel'
import {queryClient} from 'src/providers/AppProviders'
import {useDb} from 'src/providers/DbProvider'

export const useNoteQuery = (
  id: string,
): UseQueryResult<NoteModel | undefined> => {
  const db = useDb()

  return useQuery(['notes', id], () => NoteDataStore.findById(db, id))
}

export const invalidateNoteQuery = (id: string): Promise<void> =>
  queryClient.invalidateQueries(['notes', id])
