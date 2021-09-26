const os = window.require("os");
const storage = window.require("electron-json-storage");
storage.setDataPath(os.tmpdir());

export default function get(key) {
  return storage.getSync(key);
}
