if (window.location.pathname.includes("Album")) {
  console.log("Album Page!");
  const { id } = getQueryParams(window.location.hash.substr(1));
  if (id) {
    console.log(id);
    loadAlbum(id);
  }
}
if (window.location.pathname.includes("Artist")) {
  console.log("Artist Page!");
  const { id } = getQueryParams(window.location.hash.substr(1));
  if (id) {
    console.log(id);
    loadArtist(id);
  }
}
if (window.location.pathname.includes("Search")) {
  setTimeout(() => {
    search();
  }, 500);
}
