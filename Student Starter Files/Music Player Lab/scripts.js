const spotify = new Spotify("", "", "");

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
};
