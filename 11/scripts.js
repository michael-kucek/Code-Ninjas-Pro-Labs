const spotify = new Spotify(
  "21a234a0a3454e338098b4fbd063aed3",
  "dfd4574aa9bf4930819006c62f6f0044",
  "http://127.0.0.1:5501/11/Search.html"
);
// This function performs a search with the Spotify API
const search = async () => {
  // get the search query from the box
  const query = document.querySelector("#search").value;
  // if there is nothing, don't search
  if (!query) return;
  // clear the current results
  clearSearchResults();
  // perform the search
  const data = await spotify.search(query);
  console.log(data);
  /**
   * Complete the Search Function
   * using the data from Spotify, you must get information from
   * each of the three types returned: albums, artists, and tracks
   * Create three functions:
   *  getAlbumInfo(album), getArtistInfo(artist), and getTrackInfo(track)
   * iterate through each individual result and call the appropriate
   * function to add the deata to the page.
   * addAlbumResult, addAlbumResult, and addTrackResult
   * These three functions take specific arguments and place the data
   * onto the page.
   */
  data.albums.items.forEach(album => {
    getAlbumInfo(album);
  });
  data.artists.items.forEach(artist => getArtistInfo(artist));
  data.tracks.items.forEach(track => getTrackInfo(track));
};
/**
 * getTrackInfo
 * This function should take a single track from the API.
 * You must parse the data and pass it to the addTrackResult function
 * The arguments of addTrackResult are the following:
 *  1st: the track name
 *  2nd: a string of additional track information
 *  3rd: the Spotify ID of the album
 *  4th: the url to the album's image
 *  5th: the artist's name
 * Note that not all tracks will have an album image.
 * Be sure to account for that by setting a default url (it can be blank)
 */
const getTrackInfo = track => {
  const { album, name, track_number } = track;
  const albumName = album.name;
  const albumImage = album.images[0].url;
  const albumId = album.id;
  const artist = track.artists[0].name;
  const info = `${albumName} - Track ${track_number}`;
  addTrackResult(name, artist, albumId, albumImage, info);
};
/**
 * getAlbumInfo
 * This function should take a single album from the API.
 * You must parse the data and pass it to the addAlbumResult function
 * The arguments of addAlbumResult are the following:
 *  1st: the album's Spotify ID
 *  2nd: the artist's name
 *  3rd: the album's name
 *  4th: the url to the album's image
 *  5th: a string of additional album information
 * Note that not all albums will have an album image.
 * Be sure to account for that by setting a default url (it can be blank)
 */
const getAlbumInfo = album => {
  const artist = album.artists[0].name;
  const id = album.id;
  const image = album.images[0].url;
  const name = album.name;
  const info = `${album.release_date || album.year} - ${
    album.total_tracks
  } Tracks`;
  addAlbumResult(id, artist, name, image, info);
};
/**
 * getArtistInfo
 * This function should take a single album from the API.
 * You must parse the data and pass it to the addArtistResult function
 * The arguments of addAlbumResult are the following:
 *  1st: the artist's Spotify ID
 *  2nd: the artist's name
 *  3rd: the url to the artist's image
 *  4th: a string of additional album information
 * Note that not all albums will have an album image.
 * Be sure to account for that by setting a default url (it can be blank)
 */
const getArtistInfo = artist => {
  const { id, followers, genres, name, popularity } = artist;
  let image = "";
  if (artist.images[0]) {
    image = artist.images[0].url;
  }
  const info = `${formatNumber(followers.total)} Followers`;
  addArtistResult(id, name, image, info);
};

const loadAlbum = async id => {
  // get the album data from Spotify
  const data = await spotify.getAlbum(id);
  /**
   * use some helper functions to build the album page
   * setImage(url) -- the URL of the album
   * setAlbum(string) -- the name of the album
   * setArtist(string) -- the artist name
   * addTrack(name, duration, preview) - loop through tracks
   */
  console.log(data.images);
  if (data.images.length > 0) {
    setImage(data.images[0].url);
  }
  setAlbum(data.name);
  setArtist(data.artists[0].name);
  data.tracks.items.forEach(t =>
    addTrack(t.name, t.duration_ms, t.preview_url)
  );
};

const loadArtist = async id => {
  // get the artist data from Spotify
  const data = await spotify.getArtist(id);
  /**
   * use some helper functions to build the artist page
   * setImage(url) -- account for no url
   * setFollowers(number)
   * addGenre(string) -- loop through the array
   * setArtist(string) -- the artist name
   * addArtistResult(id, name, image, info) - loop through related artists
   * addTrack(name, duration, preview) - loop through tracks
   * addAlbumResult(id, artist, albumName, image, info) - loop through albums
   */
  if (data.images[0]) {
    setImage(data.images[0].url);
  }
  setArtist(data.name);
  setFollowers(data.followers.total);
  data.genres.forEach(genre => {
    addGenre(genre);
  });
  data.relatedArtists.forEach(artist => {
    let imageUrl = "";
    if (artist.images[0]) imageUrl = artist.images[0].url;
    addArtistResult(
      artist.id,
      artist.name,
      imageUrl,
      `${formatNumber(artist.followers.total)} Followers`
    );
  });
  data.tracks.forEach(track => {
    let imageUrl = "";
    if (track.album.images[0])
      (imageUrl = track.album.images[0].url),
        addTrack(track.name, track.duration_ms, track.preview_url, imageUrl);
  });
  data.albums.items.forEach(album =>
    addAlbumResult(
      album.id,
      data.name,
      album.name,
      album.images[0].url,
      `${album.total_tracks} Songs`
    )
  );
};
