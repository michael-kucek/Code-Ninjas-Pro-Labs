<style>
button {
  border-radius: 8px;
  background-color: dodgerblue;
  color: white;
  border: none;
  padding: 10px;
  margin-bottom: 12px;
}
div > pre {
  margin: 2em !important;
}
.spoiler {
  padding: 10px;
  border: 2px solid dodgerblue;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: #F4F7FB;
}
</style>

<button
  id="toggler1"
  onclick="
    document.querySelector('#spoiler1').style.display = 'block';
    document.querySelector('#toggler1').style.display = 'none';
  ">
  Reveal
</button>
<div class="spoiler" id="spoiler1" style="display:none;">
  <p>paragraph</p>
<pre><code class="language-js">function getAlbumInfo(album) {
  /* your code here */
}
</code></pre>
</div>

- addArtistResult
- addGenre
- addTrack
- setAlbum
- setArtist
- setFollowers
- setImage
