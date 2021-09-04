const { app, BrowserWindow } = require("electron");
const { ipcRenderer } = require("electron");
const url = require("url");
const path = require("path");
const { Client } = require("whatsapp-web.js");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      nativeWindowOpen: true
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

function createWhatsapp() {
  const client = new Client({});

  client.on("qr", (qr) => {
    console.log("QR RECEIVED", qr);
    mainWindow.webContents.send("qr", qr);
  });

  client.on("ready", () => {
    console.log("Client is ready!");
  });

  client.on("message", (msg) => {
    if (msg.body === "!ping") {
      msg.reply("pong");
    }
  });

  client
    .initialize()
    .then(() => {
      console.log("Successfully initialized");
    })
    .catch(() => {
      console.log("error");
    });
}

app.on("ready", createWindow);
app.on("ready", createWhatsapp);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
