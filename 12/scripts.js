// there will be five of these
// one for each type of picture
const toggleType = imgType => {
  // select all elements with the class of ___
  const allOfType = document.querySelectorAll(imgType);
  allOfType.forEach(img => {
    img.classList.toggle("hidden");
  });
  arrange();
};
const togglePlains = () => {
  const allOfType = document.querySelectorAll(".plain");
  allOfType.forEach(img => {
    img.classList.toggle("hidden");
  });
  arrange();
};
const toggleRivers = () => {
  const allOfType = document.querySelectorAll(".river");
  allOfType.forEach(img => {
    img.classList.toggle("hidden");
  });
  arrange();
};
const toggleForests = () => {
  const allOfType = document.querySelectorAll(".forest");
  allOfType.forEach(img => {
    img.classList.toggle("hidden");
  });
  arrange();
};
const toggleSwamps = () => {
  const allOfType = document.querySelectorAll(".swamp");
  allOfType.forEach(img => {
    img.classList.toggle("hidden");
  });
  arrange();
};
const toggleMountains = () => {
  const allOfType = document.querySelectorAll(".mountain");
  allOfType.forEach(img => {
    img.classList.toggle("hidden");
  });
  arrange();
};
const arrange = () => {
  // get all of the img elements
  const allImages = document.querySelectorAll("img");
  const imageArray = Array.from(allImages);
  const showing = imageArray.filter(img => !img.classList.contains("hidden"));
  const hidden = imageArray.filter(img => img.classList.contains("hidden"));
  // get the value property of the search box
  const columns = document.querySelector("#cols").value;
  // get the clientWidth property of the gallery
  const galleryW = document.querySelector("#gallery").clientWidth;
  const w = galleryW / columns;
  const h = 120 * Math.log10(w);
  showing.forEach((img, i) => {
    const row = Math.floor(i / columns);
    const col = i % columns;
    img.style.width = `${w}px`;
    img.style.height = `${h}px`;
    img.style.transform = `translate(${w * col}px, ${h * row}px)`;
  });
  hidden.forEach(img => {
    img.style.transform = randomTranslate();
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

const toggler = (el, className) => {
  el.classList.toggle("toggled");
  el.querySelector("div").classList.toggle("toggled");
  toggleType(className);
  // use a switch or a series of if statements
  // to run the appropriate toggleClass function
  // example:
  // if (className === ".plain") togglePlains()
  // OR
  // switch (className) {
  //   case ".plain":
  //     togglePlains()
  //     break;

  //   default:
  //     break;
  // }
};

window.addEventListener("resize", arrange);
window.addEventListener("DOMContentLoaded", arrange);
