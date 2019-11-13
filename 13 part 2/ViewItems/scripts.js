const loadItems = e => {
  const db = loadDatabase();
  const shelf = document.querySelector("#shelf");
  // if the loadDB event contains a dbid, remove it
  if (e && e.detail && e.detail.dbid) {
    document.getElementById(e.detail.dbid).remove();
  }
  // create the items
  db.forEach(item => {
    // add to the shelf only if the item isn't already there
    if (!document.getElementById(item.dbid)) {
      shelf.appendChild(generateItem(item));
    }
  });
};
const sortBy = prop => {
  let db = loadDatabase();
  db.sort((a, b) => {
    if (prop === "rating") return b[prop] - a[prop];
    const diff = b[prop].toLowerCase() < a[prop].toLowerCase();
    return diff ? 1 : -1;
  });
  // all of your sort buttons should have the .sorter class
  // the .active class is applied to the sort that is active
  // to ensure this works, give your buttons IDs that are the same
  // as the property they sort by.
  // for example:
  // <button id="author" class="sorter" onclick="sortBy('author')">Author</button>
  Array.from(document.getElementsByClassName("sorter")).forEach(button => {
    button.classList.remove("active");
  });
  document.getElementById(prop).classList.add("active");
  saveDatabase(db);
  emitChangeEvent();
};
// build your own dom element for your item
// return one dom element
// that dom element must have an ID equal to the DBID of the item
// example: domItem.id = item.dbid
// add child elements and css classes
// use the data from the item
const generateItem = item => {
  const domItem = document.createElement("div");
  domItem.id = item.dbid;
  domItem.innerHTML = JSON.stringify(item, null, 2);
  return domItem;
};

// this will load the items after the page has been loaded
document.addEventListener("DOMContentLoaded", loadItems);

// this will load the items each time the database has changed
document.addEventListener("databaseChange", e => loadItems(e));
