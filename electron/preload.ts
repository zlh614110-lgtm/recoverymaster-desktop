import { contextBridge, ipcRenderer } from 'electron'

export interface ElectronAPI {
  getAppVersion: () => Promise<string>
  getPlatform: () => Promise<string>
  openExternal: (url: string) => Promise<void>
  onTokenUpdate: (callback: (balance: number) => void) => () => void
}

const api: ElectronAPI = {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getPlatform: () => ipcRenderer.invoke('get-platform'),
  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),
  onTokenUpdate: (callback: (balance: number) => void) => {
    const handler = (_: unknown, balance: number) => callback(balance)
    ipcRenderer.on('token-update', handler)
    return () => ipcRenderer.removeListener('token-update', handler)
  },
}

contextBridge.exposeInMainWorld('electronAPI', api)

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
