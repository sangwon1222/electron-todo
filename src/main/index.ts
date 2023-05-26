import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { app, shell, BrowserWindow } from 'electron'
import icon from '../../resources/icon.png?asset'
import { join } from 'path'
import tray from './tray'

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    title: '검수 발행기',
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    icon: icon,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  tray.init(mainWindow, icon)

  mainWindow.on('close', function (event) {
    event.preventDefault()
    if (tray.quitMode) {
      app.exit()
    } else {
      mainWindow.hide()
    }
  })
  mainWindow.on('ready-to-show', () => {
    const { screen } = require('electron')
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize

    mainWindow.moveTop()
    mainWindow.setPosition(width - 300, height - 600)
    mainWindow.setContentSize(300, 600)
    mainWindow.setMinimumSize(300, 600)
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  require('@electron/remote/main').initialize()
  require('@electron/remote/main').enable(mainWindow.webContents)
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
