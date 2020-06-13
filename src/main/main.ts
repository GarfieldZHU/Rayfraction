import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import path from 'path'
import url from 'url'
import { Channels, Message, MessageStatus } from '../common/types'
import { serveMessage, serveMessageSync } from './services/messageService'
import { APP_WIDTH, APP_HEIGHT } from '../common/constants'

let win: BrowserWindow | null

const installExtensions = async () => {
  const installer = await import('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

  return Promise.all(
    extensions.map(name => installer.default((installer as any)[name], forceDownload))
  ).catch(console.log) // eslint-disable-line no-console
}

const createWindow = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await installExtensions()
  }

  // Main window configuration
  win = new BrowserWindow({
    width: APP_WIDTH,
    height: APP_HEIGHT,
    title: 'Integrity Manager',
    frame: false,
    resizable: false,
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      // **Important** enable node integration to electron
      nodeIntegration: true
    }
  })

  if (process.env.NODE_ENV !== 'production') {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1' // eslint-disable-line require-atomic-updates
    win.loadURL(`http://localhost:2003`)
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
    win.webContents.once('dom-ready', () => {
      win!.webContents.openDevTools()
    })
  }

  win.on('closed', () => {
    win = null
  })
}

// ----- IPC events handler ----- //

// Async message channel
ipcMain.on(Channels.ASYNC_REQUEST_MESSAGE, async (e: IpcMainEvent, message: Message) => {
  console.log(Channels.ASYNC_REQUEST_MESSAGE, message)
  try {
    const jsonResult = await serveMessage(message)
    e.sender.send(Channels.ASYNC_RESPONSE_JSON, {
      mid: message?.mid,
      status: MessageStatus.SUCCESS,
      body: jsonResult
    })
  } catch (error) {
    e.sender.send(Channels.ASYNC_RESPONSE_JSON, {
      mid: message?.mid,
      status: MessageStatus.FAILED,
      body: error.toString()
    })
  }
})

// Synchronous message channel
ipcMain.on(Channels.SYNC_REQUEST_MESSAGE, (e: IpcMainEvent, message: Message) => {
  console.log(Channels.SYNC_REQUEST_MESSAGE, message)
  try {
    const result = serveMessageSync(message)
    e.returnValue({
      mid: message?.mid,
      status: MessageStatus.SUCCESS,
      body: result
    })
  } catch (error) {
    e.returnValue({
      mid: message?.mid,
      status: MessageStatus.FAILED,
      body: error.toString()
    })
  }
})

// ----- App events handler ----- //

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
