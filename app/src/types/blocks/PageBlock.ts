import {Block} from 'src/types/Block'

export interface PageBlockProperties {
  title?: string
}

export interface PageBlock extends Block {
  properties: PageBlockProperties
}
