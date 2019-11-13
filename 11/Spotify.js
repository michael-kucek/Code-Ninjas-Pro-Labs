const newFetch = async (url, token) => {
  const res = await fetch(url, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return await res.json();
};

class Spotify {
  constructor(clientId, clientSecret, redirectURI) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.Authorization = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
    this.redirect = redirectURI;
    if (window.location.hash) {
      const authData = getQueryParams(window.location.hash.substr(1));
      this.accessToken = authData.access_token;
      console.log("Autheniticated!");
    } else {
      this.accessToken = null;
      console.log("Not Authenticated :(");
    }
  }
  getMe = () => {
    const url = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&redirect_uri=${this.redirect}`;
    console.log("getting me");

    document.location.assign(url);
  };
  findAlbum = async query => {
    const url = `https://api.spotify.com/v1/search?q=${query}&type=album&limit=1`;
    fetch(url, {
      headers: {
        Authorization: "Bearer " + this.accessToken
      }
    }).then(res =>
      res.json().then(data => this.getAlbumInfo(data.albums.items[0].id))
    );
  };
  getAlbum = async id => {
    const url = `https://api.spotify.com/v1/albums/${id}`;
    const res = await fetch(url, {
      headers: {
        Authorization: "Bearer " + this.accessToken
      }
    });
    return await res.json();
  };
  getArtist = async id => {
    const url1 = `https://api.spotify.com/v1/artists/${id}`;
    const res1 = await fetch(url1, {
      headers: {
        Authorization: "Bearer " + this.accessToken
      }
    });
    const url2 = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`;
    const res2 = await fetch(url2, {
      headers: {
        Authorization: "Bearer " + this.accessToken
      }
    });
    const url3 = `https://api.spotify.com/v1/artists/${id}/related-artists`;
    const res3 = await fetch(url3, {
      headers: {
        Authorization: "Bearer " + this.accessToken
      }
    });
    const url4 = `https://api.spotify.com/v1/artists/${id}/albums?limit=5`;
    const res4 = await fetch(url4, {
      headers: {
        Authorization: "Bearer " + this.accessToken
      }
    });
    const [artist, tracks, { artists }, albums] = await Promise.all([
      res1.json(),
      res2.json(),
      res3.json(),
      res4.json()
    ]);
    return { ...artist, ...tracks, albums, relatedArtists: artists };
  };

  search = async query => {
    const url = `https://api.spotify.com/v1/search?q=${query}&type=album,artist,track&limit=5`;
    const res = await fetch(url, {
      headers: {
        Authorization: "Bearer " + this.accessToken
      }
    });
    return await res.json();
  };
  getFirstAlbum = async query => {
    const url1 = `https://api.spotify.com/v1/search?q=${query}&type=album&limit=1`;
    const res1 = await fetch(url1, {
      headers: {
        Authorization: "Bearer " + this.accessToken
      }
    });
    console.log(res1);
    const data1 = await res1.json();
    const id = data1.albums.items[0].id;
    const url2 = `https://api.spotify.com/v1/albums/${id}`;
    const res2 = await fetch(url2, {
      headers: {
        Authorization: "Bearer " + this.accessToken
      }
    });
    return await res2.json();
  };
}
function getQueryParams(qs) {
  qs = qs.split("#").join("?");

  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while ((tokens = re.exec(qs))) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}
