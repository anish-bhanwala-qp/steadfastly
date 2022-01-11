import {Block} from 'src/types/Block'

export interface TextBlockProperties {
  text?: string
}

export interface TextBlock extends Block {
  properties: TextBlockProperties
}
