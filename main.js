const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");
const { WAConnection } = require("@adiwajshing/baileys");
const storage = require("electron-json-storage");
const os = require("os");

let mainWindow;

function createWindow() {
  storage.setDataPath(os.tmpdir());
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      nativeWindowOpen: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `./dist/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

async function connectToWhatsApp() {
  const wp = new WAConnection();

  wp.logger.level = "warn";

  wp.on("contacts-received", () => {
    storage.set("contacts", wp.contacts, () => console.log("Contacts saved!"));
  });

  wp.on("qr", (qr) => {
    mainWindow.webContents.send("qr", qr);
  });

  wp.on("open", () => {
    mainWindow.webContents.send("ready");
    const authInfo = wp.base64EncodedAuthInfo();
    storage.set("auth", authInfo, () => console.log("Session saved!"));
  });

  storage.has("auth", function (error, hasKey) {
    if (error) throw error;

    if (hasKey) {
      const authInfo = storage.getSync("auth");
      wp.loadAuthInfo(authInfo);
    }
  });

  await wp.connect();
}

app.on("ready", () => {
  createWindow();
  connectToWhatsApp();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
