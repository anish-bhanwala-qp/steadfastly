import React from 'react'

interface Props {
  title?: string
}

export const TextBlock: React.FC<Props> = ({title}) => {
  const elementRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current

      const inputListener = (e: any): void => {
        console.log(element?.innerHTML)
      }
      element.addEventListener('input', inputListener)
      return (): void => {
        element?.removeEventListener('input', inputListener)
      }
    }
  }, [])

  return (
    <div contentEditable={true} ref={elementRef} placeholder="Empty">
      {title}
    </div>
  )
}
