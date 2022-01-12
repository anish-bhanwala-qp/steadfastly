import React from 'react'

interface Props {
    onElementClick(): void
    displayText: string | undefined
}

export const ContentPointer: React.FC<Props> = ({
    onElementClick,
    displayText,
    ...props
}) => {

    return (
    <div style={{cursor: 'pointer'}} className='content-pointer' onClick={onElementClick}>{displayText}</div>)

}
