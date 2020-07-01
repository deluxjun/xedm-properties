// const { app, BrowserWindow } = require("electron");

const electron = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");
const os = require("os");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

function createWindow() {
  /*
   * 넓이 1920에 높이 1080의 FHD 풀스크린 앱을 실행시킵니다.
   * */
  const win = new BrowserWindow({
    width: 1300,
    height: 700,
    backgroundColor: "#FFFFFF",
    // 여기가 바뀌었어요!
    // nodeJS API를 사용 가능하게하는 코드입니다.
    webPreferences: {
      nodeIntegration: true,
    },
  });

  /*
   * ELECTRON_START_URL을 직접 제공할경우 해당 URL을 로드합니다.
   * 만일 URL을 따로 지정하지 않을경우 (프로덕션빌드) React 앱이
   * 빌드되는 build 폴더의 index.html 파일을 로드합니다.
   * */
  //   const startUrl =
  //     process.env.ELECTRON_START_URL ||
  //     url.format({
  //       pathname: path.join(__dirname, "/../build/index.html"),
  //       protocol: "file:",
  //       slashes: true,
  //     });

  /*
   * startUrl에 배정되는 url을 맨 위에서 생성한 BrowserWindow에서 실행시킵니다.
   * */
  //   win.loadURL(startUrl);

  if (isDev) {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();

    // react extension
    // BrowserWindow.addDevToolsExtension(
    //   path.join(
    //     os.homedir(),
    //     "%LOCALAPPDATA%/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.7.0_0"
    //   )
    //   //  path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.3.0_0')
    // );
  } else {
    win.loadFile(path.join(__dirname, "../build/index.html"));
  }
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  app.quit();
});

// hide
// function createWindow () {
//   win = new BrowserWindow({width: 1024, height: 768})
//   win.loadURL('...')
//   win.webContents.openDevTools()
//   win.on('close', (event) => {
//     if (app.quitting) {
//       win = null
//     } else {
//       event.preventDefault()
//       win.hide()
//     }
//   })
// }

// app.on('ready', createWindow)

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', () => { win.show() })

// app.on('before-quit', () => app.quitting = true)
