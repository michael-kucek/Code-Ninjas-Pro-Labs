const addTrackResult = (name, artist, albumId, albumImage, info) => {
  const container = document.createElement("div");
  container.className = "search-result album";
  const album = document.createElement("div");
  album.innerHTML = name;
  album.className = "album-name";
  const artistName = document.createElement("div");
  artistName.innerHTML = artist;
  artistName.className = "artist-name";
  const img = document.createElement("img");
  img.src = albumImage;
  img.className = "album-art";
  const albumInfo = document.createElement("div");
  albumInfo.innerHTML = info;
  albumInfo.className = "album-info";
  const albumData = document.createElement("div");
  albumData.className = "album-data";
  albumData.appendChild(album);
  albumData.appendChild(artistName);
  albumData.appendChild(albumInfo);
  container.appendChild(img);
  container.appendChild(albumData);
  container.onclick = () => {
    // const loc = window.location + `&id=${id}`;
    const paths = window.location.pathname.split("/");
    const url = window.location.href.split("#");
    paths[paths.length - 1] = "Album.html";
    url[1] = url[1].split("&id")[0] + "&id=" + albumId;
    url[0] = paths.join("/");
    window.location.href = url.join("#");
    // console.log(loc);
    // window.location = loc;
  };
  const searchResults = document.querySelector("#track-results");
  searchResults.appendChild(container);
};
const addArtistResult = (id, name, image, info) => {
  const container = document.createElement("div");
  container.className = "search-result artist";
  const artistName = document.createElement("div");
  artistName.innerHTML = name;
  artistName.className = "artist-name";
  const artistInfo = document.createElement("div");
  artistInfo.innerHTML = info;
  artistInfo.className = "artist-info";
  const artistData = document.createElement("div");
  artistData.className = "album-data";
  artistData.appendChild(artistName);
  artistData.appendChild(artistInfo);
  const img = image
    ? document.createElement("img")
    : document.createElement("div");
  img.src = image;
  img.className = "artist-image";
  container.appendChild(img);

  container.appendChild(artistData);
  container.onclick = () => {
    console.log("clicked", name);
    // const loc = window.location + `&id=${id}`;
    const paths = window.location.pathname.split("/");
    const url = window.location.href.split("#");
    const currentPath = paths[paths.length - 1];
    const newPath = "Artist.html";
    paths[paths.length - 1] = newPath;
    url[1] = url[1].split("&id")[0] + "&id=" + id;
    url[0] = paths.join("/");
    window.location.href = url.join("#");
    // console.log(loc);
    // window.location = loc;
    if (currentPath === newPath) window.location.reload();
  };
  const searchResults = document.querySelector("#artist-results");
  searchResults.appendChild(container);
};
const addAlbumResult = (id, artist, name, image, info) => {
  const container = document.createElement("div");
  container.className = "search-result album";
  const albumName = document.createElement("div");
  albumName.innerHTML = name;
  albumName.className = "album-name";
  const artistName = document.createElement("div");
  artistName.innerHTML = artist;
  artistName.className = "artist-name";
  const img = document.createElement("img");
  img.src = image;
  img.className = "album-art";
  const albumInfo = document.createElement("div");
  albumInfo.innerHTML = info;
  albumInfo.className = "album-info";
  const albumData = document.createElement("div");
  albumData.className = "album-data";
  albumData.appendChild(albumName);
  albumData.appendChild(artistName);
  albumData.appendChild(albumInfo);
  container.appendChild(img);
  container.appendChild(albumData);
  container.onclick = () => {
    // const loc = window.location + `&id=${id}`;
    const paths = window.location.pathname.split("/");
    const url = window.location.href.split("#");
    paths[paths.length - 1] = "Album.html";
    url[1] = url[1].split("&id")[0] + "&id=" + id;
    url[0] = paths.join("/");
    window.location.href = url.join("#");
    // console.log(loc);
    // window.location = loc;
  };
  const searchResults = document.querySelector("#album-results");
  searchResults.appendChild(container);
};

const goToSearch = () => {
  console.log("goToSearch");
  // const loc = window.location + `&id=${id}`;
  const paths = window.location.pathname.split("/");
  const url = window.location.href.split("#");
  paths[paths.length - 1] = "Search.html";
  url[0] = paths.join("/");
  window.location.href = url.join("#");
  // console.log(loc);
  // window.location = loc;
};
function msToMS(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
const setImage = url => {
  document.querySelector("#cover-art").src = url;
};
const setFollowers = followers => {
  document.querySelector("#artist-followers").innerHTML = `${formatNumber(
    followers
  )} Followers`;
};
const addGenre = genre => {
  const genreTag = document.createElement("span");
  genreTag.innerHTML = genre;
  genreTag.className = "genre-tag";
  document.querySelector("#artist-genres").appendChild(genreTag);
};
const setArtist = artist =>
  (document.querySelector("#artist-name").innerHTML = artist);
const setAlbum = album =>
  (document.querySelector("#album-name").innerHTML = album);
const clearTrackList = () => {
  const trackList = document.querySelector("#track-list");
  while (trackList.firstChild) {
    trackList.removeChild(trackList.firstChild);
  }
};
const clearSearchResults = () => {
  const albumResults = document.querySelector("#album-results");
  while (albumResults.firstChild) {
    albumResults.removeChild(albumResults.firstChild);
  }
  const artistResults = document.querySelector("#artist-results");
  while (artistResults.firstChild) {
    artistResults.removeChild(artistResults.firstChild);
  }
  const trackResults = document.querySelector("#track-results");
  while (trackResults.firstChild) {
    trackResults.removeChild(trackResults.firstChild);
  }
};
const addTrack = (name, duration, previewUrl, imageUrl = "") => {
  const li = document.createElement("li");
  li.className = "track";
  const trackName = document.createElement("div");
  trackName.innerHTML = `${msToMS(duration)} - ${name}`;
  trackName.class = "track-name";
  if (imageUrl) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.className = "track-image";
    li.appendChild(img);
  }
  li.appendChild(trackName);
  li.onclick = () => playTrack(name, previewUrl);
  const trackList = document.querySelector("#track-list");
  trackList.appendChild(li);
};

const playTrack = (name, url) => {
  const audio = document.querySelector("audio");
  const track = document.querySelector("#now-playing");
  track.innerHTML = name;
  if (!audio.paused) audio.pause();
  audio.src = url;
  audio.play();
};
submit = event => {
  if (event.keyCode == 13 || event.which == 13) {
    event.preventDefault();
    search();
  }
};
