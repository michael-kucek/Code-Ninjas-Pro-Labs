const loadItems = e => {
  const db = loadDatabase();
  const shelf = document.querySelector("#shelf");
  if (e && e.detail && e.detail.dbid) {
    document.getElementById(e.detail.dbid).remove();
  }
  db.forEach(item => {
    if (!document.getElementById(item.dbid)) {
      shelf.appendChild(generateItem(item));
    }
  });
  arrange();
};
// student function 1
// create elements
// add custom classes
// create custom classes
// give parent element the id of g.dbid
const generateItem = item => {
  // needs
  // p.title
  // p.developer
  // img.cover
  // p.info
  // button.delete-button
  // div.text
  const title = document.createElement("p");
  title.innerHTML = item.name;
  title.classList.add("title");
  const creator = document.createElement("p");
  creator.innerHTML = item.creator;
  creator.classList.add("creator");
  const cover = document.createElement("img");
  cover.src = item.cover;
  cover.classList.add("cover");
  const info = document.createElement("p");
  info.innerHTML = `Genre: ${item.genre} <br/> Purchased on ${item.purchased}`;
  info.classList.add("info");
  const rating = document.createElement("p");
  rating.innerHTML = "⭐".repeat(item.rating);
  const domItem = document.createElement("div");
  domItem.classList.add("item");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = "Remove";
  deleteButton.onclick = () => removeItem(domItem.dbid);
  const itemText = document.createElement("div");
  itemText.classList.add("item-text");
  domItem.id = item.dbid;
  itemText.appendChild(title);
  itemText.appendChild(developer);
  itemText.appendChild(info);
  itemText.appendChild(rating);
  domItem.appendChild(cover);
  domItem.appendChild(itemText);
  domItem.appendChild(deleteButton);
  return domItem;
};
const sortBy = prop => {
  let db = loadDatabase();
  db.sort((a, b) => {
    if (prop === "rating") return b[prop] - a[prop];
    const diff = b[prop].toLowerCase() < a[prop].toLowerCase();
    return diff ? 1 : -1;
  });
  Array.from(document.getElementsByClassName("sorter")).forEach(button => {
    button.classList.remove("active");
  });
  document.getElementById(prop).classList.add("active");
  saveDatabase(db);
  emitChangeEvent();
};
const arrange = () => {
  // load the database
  const db = loadDatabase();
  const allItems = [];
  // arrange the existing elements to match the
  // order of the database items
  db.forEach(i => {
    const item = document.getElementById(i.dbid);
    allItems.push(item);
  });
  const itemArray = Array.from(allItems);
  const galleryW = document.querySelector("#shelf").clientWidth;
  const columns = Math.floor(galleryW / 200);
  // get the clientWidth property of the gallery
  const w = galleryW / columns;
  const h = 130 * Math.log10(w);
  itemArray.forEach((img, i) => {
    const row = Math.floor(i / columns);
    const col = i % columns;
    img.style.width = `${w}px`;
    img.style.height = `${h}px`;
    img.style.transform = `translate(${w * col}px, ${h * row}px)`;
  });
};
const randomTranslate = () => {
  const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const signX = Math.random() > 0.5 ? "-" : "";
  const x = randomBetween(200, 600);
  const signY = Math.random() > 0.5 ? "-" : "";
  const y = randomBetween(200, 600);
  return `translate(${signX}${x}px, ${signY}${y}px)`;
};

document.addEventListener("DOMContentLoaded", loadItems);
document.addEventListener("databaseChange", e => loadItems(e));
window.addEventListener("resize", arrange);
