/**
 * Converts a JSON object to a formatted string
 * @param {object} json the JSON object to convert
 */
const formatted = json => JSON.stringify(json, null, 2);

/**
 * Formats and returns the API results for a TV Show
 * @param {string} title the search query
 */
const query = async title => {
  const apiUrl = `http://api.tvmaze.com/singlesearch/shows?q=${title}&embed=episodes`;
  const res = await fetch(apiUrl);
  const json = await res.json();
  const {
    id,
    name,
    type,
    language,
    genres,
    status,
    runtime,
    premiered,
    schedule,
    network,
    webChannel,
    _embedded
  } = json;
  const results = {
    id,
    name,
    type,
    language,
    genres,
    status,
    runtime,
    premiered,
    schedule,
    network,
    webChannel,
    episodes: _embedded.episodes.length || null
  };
  return results;
};

/**
 * Generates a random time from 0.18 to 0.25 seconds
 * for the shake animation
 */
function generateTime() {
  return Math.max(0.18, Math.floor(Math.random() * 25) / 100);
}

/**
 * Sets a new animation time for the element
 * @param {element} el The element you want to animate
 */
const animate = el => {
  el.style.setProperty("--animation-time", generateTime() + "s");
};

/**
 * Searches the API for a show
 * @param {string} inputId the DOM ID of the input
 * @param {string} resultsId the DOM ID of the element to place results
 */
const search = async (inputId, resultsId) => {
  const title = document.querySelector(inputId).value;
  const el = document.querySelector(resultsId);
  el.innerHTML = "Searching...";
  el.innerHTML = formatted(await query(title));
};

/**
 * Calls the "check" function for each
 * of the 16 clues
 */
const check = () => {
  checkDays();
  checkGenre();
  checkThirty();
  checkSixty();
  checkEnded();
  checkLastYear();
  checkEpisodes();
  checkNetflix();
  checkScripted();
  checkReality();
  check90s();
  checkComedy();
  checkUS();
  checkNotUS();
  checkLanguage();
  checkTen();
};
/**
 * A helper function that grabs three elements.
 * [
 *  the input's value,
 *  the element to palce the results,
 *  the entire card
 * ]
 * @param {string} id the DOM ID associated with the clue
 */
const getElements = id => {
  const resultsId = `${id}-results`;
  const sectionId = `${id}-container`;
  return [
    document.querySelector(id).value,
    document.querySelector(resultsId),
    document.querySelector(sectionId)
  ];
};

const checkDays = async () => {
  const [title, resEl, contEl] = getElements("#days");
  if (!title) return;
  const res = await query(title);
  const days = res.schedule.days.length;
  animate(contEl);
  const correct = days == 2;
  contEl.className = correct ? "valid" : "invalid shake";
  setTimeout(() => {
    contEl.classList.remove("shake");
  }, 500);
  const str = `${res.name} airs ${days} days a week.`;
  resEl.innerHTML = str;
};
const checkGenre = async () => {
  const [title, resEl, contEl] = getElements("#genre");
  if (!title) return;
  const res = await query(title);
  const genre = res.genres[0];
  const str = `${res.name}'s first genre is ${genre}.`;
  animate(contEl);
  const correct = genre == "Drama";
  contEl.className = correct ? "valid" : "invalid shake";
  setTimeout(() => {
    contEl.classList.remove("shake");
  }, 500);
  resEl.innerHTML = str;
};
const checkThirty = async () => {
  const [title, resEl, contEl] = getElements("#thirty");
  if (!title) return;
  const res = await query(title);
  const runtime = res.runtime;
  const str = `${res.name}'s runtime is ${runtime} minutes.`;
  animate(contEl);
  const correct = runtime == 30;
  contEl.className = correct ? "valid" : "invalid shake";
  setTimeout(() => {
    contEl.classList.remove("shake");
  }, 1000);
  resEl.innerHTML = str;
};
const checkSixty = async () => {
  const [title, resEl, contEl] = getElements("#sixty");
  if (!title) return;
  const res = await query(title);
  const runtime = res.runtime;
  const str = `${res.name}'s runtime is ${runtime} minutes.`;
  animate(contEl);
  const correct = runtime > 60;
  contEl.className = correct ? "valid" : "invalid shake";
  setTimeout(() => {
    contEl.classList.remove("shake");
  }, 1000);
  resEl.innerHTML = str;
};
const checkEnded = async () => {
  const [title, resEl, contEl] = getElements("#ended");
  if (!title) return;
  const res = await query(title);
  const status = res.status;
  const str = `${res.name} is ${status}.`;
  animate(contEl);
  const correct = status == "Ended";
  contEl.className = correct ? "valid" : "invalid shake";
  setTimeout(() => {
    contEl.classList.remove("shake");
  }, 1000);
  resEl.innerHTML = str;
};
const checkLastYear = async () => {
  const [title, resEl, contEl] = getElements("#lastyear");
  if (!title) return;
  const res = await query(title);
  const premiered = new Date(res.premiered);
  const thisyear = new Date();
  const diff = thisyear.getFullYear() - premiered.getFullYear();
  let str = `${res.name} premiered `;
  if (diff == 0) str += "this year.";
  if (diff == 1) str += "last year.";
  if (diff > 1) str += `${diff} years ago.`;
  animate(contEl);
  const correct = diff == 1;
  contEl.className = correct ? "valid" : "invalid shake";
  setTimeout(() => {
    contEl.classList.remove("shake");
  }, 1000);
  resEl.innerHTML = str;
};
const checkEpisodes = async () => {
  const [title, resEl, contEl] = getElements("#episodes");
  if (!title) return;
  const res = await query(title);
  const episodes = res.episodes;
  const str = `There are ${episodes} episodes of ${res.name}.`;
  animate(contEl);
  const correct = episodes >= 100;
  contEl.className = correct ? "valid" : "invalid shake";
  setTimeout(() => {
    contEl.classList.remove("shake");
  }, 1000);
  resEl.innerHTML = str;
};
const checkNetflix = async () => {
  const [title, resEl, contEl] = getElements("#netflix");
  if (!title) return;
  const res = await query(title);
  const correct = res.webChannel && res.webChannel.name == "Netflix";
  const str = `${res.name} is ${correct ? "on" : "not on"} Netflix.`;
  animate(contEl);
  contEl.className = correct ? "valid" : "invalid shake";
  setTimeout(() => {
    contEl.classList.remove("shake");
  }, 1000);
  resEl.innerHTML = str;
};
const checkScripted = async () => {
  const [title, resEl, contEl] = getElements("#scripted");
  if (!title) return;
  const res = await query(title);
  let type = res.type;
  if (type == "Game Show") type = "a Game Show";
  const str = `${res.name} is ${type}.`;
  animate(contEl);
  const correct = type == "Scripted";
  contEl.className = correct ? "valid" : "invalid shake";
  setTimeout(() => {
    contEl.classList.remove("shake");
  }, 1000);
  resEl.innerHTML = str;
};
const checkReality = async () => {
  const [title, resEl, contEl] = getElements("#reality");
  if (!title) return;
  const res = await query(title);
  let type = res.type;
  if (type == "Game Show") type = "a Game Show";
  const str = `${res.name} is ${type}.`;
  animate(contEl);
  const correct = type == "Reality";
  contEl.className = correct ? "valid" : "invalid shake";
  setTimeout(() => {
    contEl.classList.remove("shake");
  }, 1000);
  resEl.innerHTML = str;
};
const check90s = async () => {
  const [title, resEl, contEl] = getElements("#nineties");
  if (!title) return;
  const res = await query(title);
  const premiered = new Date(res.premiered);
  const year = premiered.getFullYear();
  const str = `${res.name} premiered in ${year}.`;
  animate(contEl);
  const correct = year < 2000 && year >= 1990;
  contEl.className = correct ? "valid" : "invalid shake";
  setTimeout(() => {
    contEl.classList.remove("shake");
  }, 1000);
  resEl.innerHTML = str;
};
const checkComedy = async () => {
  const [title, resEl, contEl] = getElements("#comedy");
  if (!title) return;
  const res = await query(title);
  const genres = res.genres;
  const str = `${res.name} has the ${genres.join(", ")} genres.`;
  animate(contEl);
  const correct = genres.includes("Comedy");
  contEl.className = correct ? "valid" : "invalid shake";
  setTimeout(() => {
    contEl.classList.remove("shake");
  }, 500);
  resEl.innerHTML = str;
};
const checkUS = async () => {
  const [title, resEl, contEl] = getElements("#us");
  if (!title) return;
  const res = await query(title);
  const network = res.network;
  let str = res.name;
  if (!network) {
    str += " is not on television.";
  }
  if (network) {
    if (network.name) {
      str += " is on " + network.name;
    }
    if (network.country.name) {
      str += " in " + network.country.name + ".";
    }
  }
  animate(contEl);
  const correct = network && network.country.code == "US";
  contEl.className = correct ? "valid" : "invalid shake";
  setTimeout(() => {
    contEl.classList.remove("shake");
  }, 500);
  resEl.innerHTML = str;
};
const checkNotUS = async () => {
  const [title, resEl, contEl] = getElements("#international");
  if (!title) return;
  const res = await query(title);
  const network = res.network;
  let str = res.name;
  if (!network) {
    str += " is not on television.";
  }
  if (network) {
    if (network.name) {
      str += " is on " + network.name;
    }
    if (network.country.name) {
      str += " in " + network.country.name + ".";
    }
  }
  animate(contEl);
  const correct = network && network.country.code != "US";
  contEl.className = correct ? "valid" : "invalid shake";
  setTimeout(() => {
    contEl.classList.remove("shake");
  }, 500);
  resEl.innerHTML = str;
};
const checkLanguage = async () => {
  const [title, resEl, contEl] = getElements("#language");
  if (!title) return;
  const res = await query(title);
  const language = res.language;
  const str = `${res.name} is in ${language}.`;
  animate(contEl);
  const correct = language != "English";
  contEl.className = correct ? "valid" : "invalid shake";
  setTimeout(() => {
    contEl.classList.remove("shake");
  }, 500);
  resEl.innerHTML = str;
};
const checkTen = async () => {
  const [title, resEl, contEl] = getElements("#ten");
  if (!title) return;
  const res = await query(title);
  const status = res.status;
  const premiered = new Date(res.premiered);
  const year = premiered.getFullYear();
  const thisyear = new Date();
  const diff = thisyear.getFullYear() - premiered.getFullYear();
  const str = `${res.name} is ${status} and premiered in ${year}.`;
  animate(contEl);
  const correct = diff >= 10 && status == "Running";
  contEl.className = correct ? "valid" : "invalid shake";
  setTimeout(() => {
    contEl.classList.remove("shake");
  }, 1000);
  resEl.innerHTML = str;
};
