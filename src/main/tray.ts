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
    const type = 'normal'
    const myMenu = Menu.buildFromTemplate([
      { label: 'SONID', enabled: false },
      { label: '열기', type, click: () => this.mWin.show() },
      { label: '최소화', type, click: () => this.mWin.minimize() },
      { label: '닫기', type, click: () => this.mWin.hide() },
      { label: '', type: 'separator' },
      {
        label: '종료',
        type,
        click: () => {
          this.mIsQuit = true
          app.exit()
        }
      }
    ])
    this.mTray.setToolTip('SONID TODO')
    this.mTray.setContextMenu(myMenu)
  }

  doubleClick() {
    let motionflag = false
    this.mTray.on('double-click', () => {
      if (motionflag) return
      motionflag = true
      const { screen } = require('electron')
      const primaryDisplay = screen.getPrimaryDisplay()
      const { height } = primaryDisplay.workAreaSize
      const [x, y] = this.mWin.getPosition()
      const appHeight = this.mWin.getSize()[1]
      const isVisible = this.mWin.isVisible()
      if (!isVisible) {
        this.mWin.show()
      }

      if (y > height) {
        const moveY = height - appHeight
        for (let i = y; i >= moveY; i -= 4) {
          this.mWin.setPosition(x, i)
          if (i === moveY) {
            motionflag = false
          }
        }
      } else {
        const moveY = height + appHeight
        for (let i = y; i <= moveY; i += 4) {
          this.mWin.setPosition(x, i)
          if (i === moveY) {
            motionflag = false
            this.mWin.hide()
          }
        }
      }
    })
  }
}

export default new CustomTray()
