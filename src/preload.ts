// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'
import { DbInfos } from './types';

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    runReq: <T>(requestId: string, query: string) => {
        return new Promise<T>((resolve, reject) => {
            ipcRenderer.once(requestId, (_, result) => {
                resolve(result as T);

            });
            ipcRenderer.send("execute-query", query, requestId);
        });
    },

    connect: (dbInfos: DbInfos) => ipcRenderer.send("connect", dbInfos),

    onRun: (callback: Function) => {
        ipcRenderer.removeAllListeners('sql-run')
        ipcRenderer.on('sql-run', (_event) => callback())
    },

    onConnected: (callback: Function) => {
        ipcRenderer.removeAllListeners('connected')
        ipcRenderer.on('connected', (_event,dbInfos) => callback(dbInfos))
    },

    onConnectError: (callback: Function) => {
        ipcRenderer.removeAllListeners('connect-error')
        ipcRenderer.on('connect-error', (_event, msg) => callback(msg))
    },
    removeEventListener: (name: string) => ipcRenderer.removeAllListeners(name)
})