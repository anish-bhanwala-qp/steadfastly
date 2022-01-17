import React from 'react'
import {BlockDataStore} from 'src/database/BlockDataStore'
import {useDb} from 'src/providers/DbProvider'
import {usePageContext} from 'src/providers/PageProvider'
import {Block} from 'src/types/Block'
import {TextBlock} from 'src/types/blocks/TextBlock'
import {BlockType} from 'src/types/BlockType'
import {TextBlockComponent} from './TextBlockComponent'

export const BlockContents: React.FC = () => {
  const {page} = usePageContext()
  const db = useDb()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [blocks, setBlocks] = React.useState<(Block | undefined)[]>([])

  React.useEffect(() => {
    if (!page.contents || page.contents.length === 0) return

    setLoading(true)
    const blockPromises = page.contents.map(content =>
      BlockDataStore.getById<Block>(db, content),
    )

    Promise.all(blockPromises)
      .then(setBlocks)
      .then(() => setLoading(false))
  }, [db, page.contents])

  if (!page.contents || page.contents.length === 0) return null

  if (loading) return <div>Loading...</div>

  if (blocks.some(b => b == null)) throw new Error(`Some block is not found`)

  return (
    <>
      {(blocks as Block[]).map(block => {
        switch (block.type) {
          case BlockType.Text:
            return (
              <TextBlockComponent
                key={block.id}
                textBlock={block as TextBlock}
              />
            )
        }
        throw new Error(`BlockType not handled: ${block.type}`)
      })}
    </>
  )
}
