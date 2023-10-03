import React from 'react'

export const CompatibilityProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  if (!('serviceWorker' in navigator)) {
    return <h1>Your browser doesn't support ServiceWorkers.</h1>
  }

  if (!window.indexedDB) {
    return <h1>Your browser doesn't support a stable version of IndexedDB.</h1>
  }

  return <>{children}</>
}
