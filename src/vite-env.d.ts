/// <reference types="vite/client" />

declare global {
  interface Window {
    electronAPI: {
      getAppVersion: () => Promise<string>
      getPlatform: () => Promise<string>
      openExternal: (url: string) => Promise<void>
      onTokenUpdate: (callback: (balance: number) => void) => () => void
    }
  }
}

export {}
