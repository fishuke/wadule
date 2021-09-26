const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");
const { WAConnection } = require("@adiwajshing/baileys");
const storage = require("electron-json-storage");

let mainWindow;

function createWindow() {
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
  const conn = new WAConnection();

  conn.on("contacts-received", () => {
    console.log("you have " + Object.keys(conn.contacts).length + " contacts");
  });

  conn.on("qr", (qr) => {
    mainWindow.webContents.send("qr", qr);
  });

  conn.on("open", () => {
    mainWindow.webContents.send("ready");
    const authInfo = conn.base64EncodedAuthInfo();
    storage.set("auth", authInfo, () => console.log("Session saved!"));
  });

  storage.has("auth", function (error, hasKey) {
    if (error) throw error;

    if (hasKey) {
      const authInfo = storage.getSync("auth");
      conn.loadAuthInfo(authInfo);
    }
  });

  await conn.connect();

  conn.on("chat-update", (chatUpdate) => {
    if (chatUpdate.messages && chatUpdate.count) {
      const message = chatUpdate.messages.all()[0];
      console.log(message);
    } else console.log(chatUpdate);
  });
}

app.on("ready", createWindow);
app.on("ready", connectToWhatsApp);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
