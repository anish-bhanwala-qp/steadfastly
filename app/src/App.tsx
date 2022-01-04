import React from 'react'
import './App.css'

const checkCompatibility = () => {
  if (!('serviceWorker' in navigator)) {
    return <h1>Your browser doesn't support ServiceWorkers.</h1>
  }

  if (!window.indexedDB) {
    return <h1>Your browser doesn't support a stable version of IndexedDB.</h1>
  }
}

function App() {
  const compatibilityError = checkCompatibility()

  if (compatibilityError) return compatibilityError

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
