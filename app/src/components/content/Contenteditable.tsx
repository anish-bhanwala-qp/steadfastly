import React from 'react'

interface Props {
  element: string
  className?: string
  placeholder?: string
  onChange(text: string): void
}

export const Contenteditable: React.FC<Props> = ({
  element,
  onChange,
  children,
  ...props
}) => {
  const elementRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current

      const inputListener = (e: any): void => {
        onChange(element?.innerHTML)
      }
      element.addEventListener('input', inputListener)
      return (): void => {
        element?.removeEventListener('input', inputListener)
      }
    }
  }, [onChange])

  return React.createElement(
    element,
    {
      contentEditable: true,
      ref: elementRef,
      suppressContentEditableWarning: true,
      ...props,
    },
    children,
  )
}
