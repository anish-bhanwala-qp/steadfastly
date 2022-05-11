import React from 'react'

interface Props {
  element: string
  content?: string
  className?: string
  placeholder?: string
  onChange(text: string): void
}

export const Contenteditable: React.FC<Props> = ({
  element,
  content,
  onChange,
  ...props
}) => {
  const elementRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect((): (() => void) | void => {
    if (elementRef.current) {
      const element = elementRef.current

      const inputListener = (): void => {
        onChange(element?.innerHTML)
      }
      element.addEventListener('input', inputListener)
      return (): void => {
        element?.removeEventListener('input', inputListener)
      }
    }
  }, [onChange])

  return React.createElement(element, {
    contentEditable: true,
    ref: elementRef,
    suppressContentEditableWarning: true,
    ...props,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    dangerouslySetInnerHTML: {__html: content},
  })
}
