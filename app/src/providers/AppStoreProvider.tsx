import React from 'react'
import {AppStore, createAppStore} from 'src/store/appStore'
import {UseBoundStore, StoreApi} from 'zustand'

interface Props {}

const AppStoreContext = React.createContext<
  UseBoundStore<StoreApi<AppStore>> | undefined
>(undefined)

export const AppStoreProvider: React.FC<Props> = ({children}) => {
  const appStoreRef = React.useRef<UseBoundStore<StoreApi<AppStore>>>(
    createAppStore(),
  )

  return (
    <AppStoreContext.Provider value={appStoreRef.current}>
      {children}
    </AppStoreContext.Provider>
  )
}

export const useAppStore = (): UseBoundStore<StoreApi<AppStore>> => {
  const context = React.useContext(AppStoreContext)
  if (context === undefined) {
    throw new Error(`useAppStore must be used within a AppStoreProvider`)
  }

  return context
}
