import React from 'react'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

interface Props {
  content?: string
  onChange(content: string): void
}

export const NoteEditor: React.FC<Props> = ({content, onChange}) => {
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    'write',
  )
  const [value, setValue] = React.useState(content || '')
  const handleOnChange = (newValue: string): void => {
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="container">
      <ReactMde
        value={value}
        toolbarCommands={[
          ['header', 'bold', 'italic'],
          ['unordered-list', 'ordered-list'],
        ]}
        onChange={handleOnChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown): Promise<React.ReactNode> =>
          Promise.resolve(
            <ReactMarkdown skipHtml={true}>{markdown}</ReactMarkdown>,
          )
        }
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
      />
    </div>
  )
}
