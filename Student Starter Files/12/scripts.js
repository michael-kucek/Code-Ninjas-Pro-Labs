const togglePlains = () => {
  // find all elements with the "plain" class
  const allOfType = document.querySelectorAll(".plain");
  allOfType.forEach(img => {
    img.classList.toggle("hidden");
  });
  arrange();
};

const arrange = () => {
  // get all of the img elements
  const allImages = "???";
  // Convert the NodeList (from querySelectorAll) or HTMLCollection (from
  // getElementsBy...) into an array using the Array.from method.
  const imageArray = Array.from(allImages);
  const showing = imageArray.filter(img => !img.classList.contains("hidden"));
  const hidden = imageArray.filter(img => img.classList.contains("hidden"));
  // get the value property of the search box
  const columns = "???";
  // get the clientWidth property of the gallery
  const galleryWidth = "???";
  // Make each image the same width based on the width
  // of the gallery element and how many columns there are.
  // Make each image the same height based on the image width.
  const imgWidth = galleryWidth / columns;
  const imgHight = 120 * Math.log10(imgWidth);
  // Loop through each image that is marked to show and calculate
  // what row and column they should be on.
  // Set the width and height based on what we calculated above.
  // Move the image to the correct (x, y) position based on its column and row.
  showing.forEach((img, i) => {
    const row = Math.floor(i / columns);
    const col = i % columns;
    img.style.width = `${imgWidth}px`;
    img.style.height = `${imgHight}px`;
    img.style.transform = `translate(${imgWidth * col}px, ${imgHight * row}px)`;
  });
  // Loop through each hidden image and translate it off the screen.
  hidden.forEach(img => {
    img.style.transform = randomTranslate();
  });
};

const toggler = (el, className) => {
  el.classList.toggle("toggled");
  // find this element's (el) child element with the "toggler" class
  const myToggler = "???";
  myToggler.classList.toggle("toggled");
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
const randomTranslate = () => {
  // Note: Math.random() returns a random number between 0 and 1.
  // Generate and return a random number between the provided min and max.
  const randomBetween = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  // Randomly get either a positive or negative sign.
  const signX = Math.random() > 0.5 ? "-" : "";
  const signY = Math.random() > 0.5 ? "-" : "";
  // Randomly generate values for x and y.
  const x = randomBetween(200, 600);
  const y = randomBetween(200, 600);
  // Return a string to translate the image off of the page.
  return `translate(${signX}${x}px, ${signY}${y}px)`;
};

// This will listen for when the browser is resized and will run
// the arrange function.
window.addEventListener("resize", arrange);

// This will listen for when all of the DOM content is loaded for
// the very first time and then it will run the arrange function.
window.addEventListener("DOMContentLoaded", arrange);
