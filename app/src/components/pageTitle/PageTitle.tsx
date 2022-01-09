import React from 'react'
import {usePage} from 'src/providers/PageProvider'

export const PageTitle: React.FC = () => {
  const elementRef = React.useRef<HTMLDivElement | null>(null)
  const {page, onUpdateTitle} = usePage()

  React.useEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current

      const inputListener = (e: any): void => {
        onUpdateTitle(element?.innerHTML)
      }
      element.addEventListener('input', inputListener)
      return (): void => {
        element?.removeEventListener('input', inputListener)
      }
    }
  }, [onUpdateTitle])

  return (
    <h1
      className="container"
      contentEditable={true}
      ref={elementRef}
      placeholder="Untitled"
      suppressContentEditableWarning={true}
    >
      {page!.title}
    </h1>
  )
}
