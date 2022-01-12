import React from 'react'
import {BlockDataStore} from 'src/db/BlockDataStore'
import {useDb} from 'src/providers/DbProvider'
import {usePage} from 'src/providers/PageProvider'
import {Block} from 'src/types/Block'
import {TextBlock} from 'src/types/blocks/TextBlock'
import {BlockType} from 'src/types/BlockType'
import {TextBlockComponent} from './TextBlockComponent'
import {PageBlockComponent} from './PageBlockComponent'
import { PageBlock } from 'src/types/blocks/PageBlock'

export const BlockContents: React.FC = () => {
  const {page} = usePage()
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
          case BlockType.Page:
            return (
              <PageBlockComponent
                key={block.id}
                pageBlock={block as PageBlock}
              />
            )
        }
        throw new Error(`BlockType not handled: ${block.type}`)
      })}
    </>
  )
}
