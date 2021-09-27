const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const { WAConnection, MessageType } = require("@adiwajshing/baileys");
const storage = require("electron-json-storage");
const os = require("os");

let mainWindow;
let whatsappClient;
let scheduledMessages = [];
let mappedContacts;
const listeners = {};

function setListeners() {
  ipcMain.on("instantMessage", (event, message) => {
    sendMessage(message);
  });
  ipcMain.on("scheduledMessage", (event, message) => {
    console.log(message);
    const timeDifference = message.schedule - Date.now();
    if (timeDifference <= 0) return;
    scheduledMessages.push(message);
    listeners[message.id] = setTimeout(
      () => sendMessage(message),
      timeDifference
    );
    storage.set("scheduledMessages", scheduledMessages, {});
  });
  ipcMain.on("deleteMessage", (event, message) => {
    const index = scheduledMessages.findIndex((msg) => msg.id === message.id);
    scheduledMessages.splice(index, 1);
    storage.set("scheduledMessages", scheduledMessages, {});
    clearTimeout(listeners[message.id]);
  });
}

function scheduleMessages() {
  storage.has("scheduledMessages", function (error, hasKey) {
    if (error) throw error;
    if (hasKey) {
      scheduledMessages = storage
        .getSync("scheduledMessages")
        .filter((message) => message.schedule > Date.now());
      console.log(scheduledMessages);
      scheduledMessages.forEach((message) => {
        const timeDifference = message.schedule - Date.now();
        setTimeout(() => sendMessage(message), timeDifference);
      });
    }
  });
}

function sendMessage(message) {
  message.targets.forEach((target, i) => {
    setTimeout(() => {
      whatsappClient.sendMessage(target, message.content, MessageType.text);
    }, i * 1000);
  });

  if (message.schedule) {
    const index = scheduledMessages.findIndex((msg) => msg.id === message.id);
    scheduledMessages.splice(index, 1);
    storage.set("scheduledMessages", scheduledMessages, {});
    mainWindow.webContents.send("deleteMessage", scheduledMessages);
  }
}

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
  whatsappClient = new WAConnection();

  // whatsappClient.logger.level = "warn";

  whatsappClient.on("contacts-received", () => {
    let contacts = whatsappClient.contacts;
    delete contacts["status@broadcast"];
    mappedContacts = [];
    for (let key in contacts) {
      if (contacts[key]) {
        mappedContacts.push({
          name: contacts[key].name,
          phone: contacts[key].jid,
        });
      }
    }
    mainWindow.webContents.send("contacts", mappedContacts);
  });

  whatsappClient.on("qr", (qr) => {
    mainWindow.webContents.send("qr", qr);
  });

  whatsappClient.on("open", () => {
    const authInfo = whatsappClient.base64EncodedAuthInfo();
    storage.set("auth", authInfo, () => console.log("Session saved!"));

    setTimeout(() => {
      mainWindow.webContents.send("ready");
      mainWindow.webContents.send("scheduledMessages", scheduledMessages);
    }, 1000);
  });

  storage.has("auth", function (error, hasKey) {
    if (error) throw error;

    if (hasKey) {
      const authInfo = storage.getSync("auth");
      whatsappClient.loadAuthInfo(authInfo);
    }
  });

  await whatsappClient.connect();
}

app.on("ready", () => {
  createWindow();
  connectToWhatsApp();
  setListeners();
  scheduleMessages();
});

app.on("window-all-closed", function () {
  app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
