const createDbid = () => {
  var dt = new Date().getTime();
  var uuid = "xxxxyy-xxyyxx".replace(/[xy]/g, c => {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};
const loadDatabase = () => {
  const lsDb = localStorage.getItem("db");
  return lsDb ? JSON.parse(lsDb) : [];
};
const saveDatabase = db => {
  localStorage.setItem("db", JSON.stringify(db));
};
const addItem = item => {
  const db = loadDatabase();
  db.push(item);
  saveDatabase(db);
};
const removeItem = item => {
  console.log(item);
  const db = loadDatabase();
  let itemId;
  if (typeof item === "string") {
    itemId = item;
  } else {
    itemId = item.dbid;
  }
  const newDb = db.filter(i => i.dbid !== itemId);
  saveDatabase(newDb);
  emitChangeEvent(itemId);
};

const emitChangeEvent = itemId => {
  const databaseChangeEvent = new CustomEvent("databaseChange", {
    bubbles: true,
    detail: { dbid: itemId }
  });
  document.dispatchEvent(databaseChangeEvent);
  console.log("change!!");
};
