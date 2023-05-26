import { app } from 'electron'
const { Menu, Tray } = require('electron')

class CustomTray {
  private mTray: any
  private mWin: any
  private mIsQuit = false

  get getTray() {
    return this.mTray
  }
  get quitMode() {
    return this.mIsQuit
  }

  init(window, icon) {
    this.mWin = window
    this.mTray = new Tray(icon)

    this.setMenu()
    this.doubleClick()
  }

  setMenu() {
    const myMenu = Menu.buildFromTemplate([
      { label: 'SONID', enabled: false },
      {
        label: '열기',
        type: 'normal',
        click: () => {
          this.mWin.maximize()
          this.mWin.show()
        }
      },
      {
        label: '최소화',
        type: 'normal',
        click: () => {
          this.mWin.minimize()
          this.mWin.setSize(1000, 800)
        }
      },
      {
        label: '닫기',
        type: 'normal',
        click: () => this.mWin.hide()
      },
      { label: '', type: 'separator' },
      {
        label: '종료',
        type: 'normal',
        click: () => {
          this.mIsQuit = true
          app.exit()
        }
      }
    ])
    this.mTray.setToolTip('SONID 검수기')
    this.mTray.setContextMenu(myMenu)
  }

  doubleClick() {
    this.mTray.on('double-click', () => {
      const isVisible = this.mWin.isVisible()
      if (isVisible) {
        this.mWin.hide()
      } else {
        this.mWin.show()
      }
    })
  }
}

export default new CustomTray()
