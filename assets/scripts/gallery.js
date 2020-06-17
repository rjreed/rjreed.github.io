// ABOUT

/*
  This is a function to request the index.json file containing artwork info from the S3 bucket,
 and populate the gallery nodes with artwork titles/ links to the S3 files for the artwork images/ links to
 the detail.html page with a query string containing the artwork's uid
*/

// APP
(async function() {
  /// CSS Selectors

  const selectors = {};

  //// define css selectors for javascript access
  selectors.hooks = {
    container: 'js-gallery-container',
    tile: 'js-panel-tile'
  };

  //// define css classes for styling
  selectors.styles = {
    tile: 'tile',
    panel_tile: 'gallery-tile',
    panel_tile_overlay: 'panel-tile-overlay',
    caption: 'gallery-tile-caption',
    column: 'column'
  };

  /// DOM Nodes
  const nodes = {
     containers: document.getElementsByClassName(selectors.hooks.container)
  };

  /// URI Paths

  //// add timestamp to query string to prevent caching in 15 minute intervals
  const time = new Date();
  const _timestamp = (Math.round(time / 9e5) * 9e5);

  //// path to send XHR request to get artworks json array back
  const artwork_bucket_uri = 'https://s3-us-west-2.amazonaws.com/rockyjreed.com/artwork/';
  const artworks_uri = artwork_bucket_uri + 'index.json?limitcache=' + _timestamp;

  //// object to hold references to the different galleries
  let galleries = {};

  //// iterate through the nodes for the gallery containers and add a gallery property to galleries for each
  for (let i = 0, len = nodes.containers.length; i < len; i++) {
    const gallery_name = nodes.containers[i].dataset.gallery;

    galleries[gallery_name] = nodes.containers[i];
  }

  /// function to create the artworks display gallery in the admin panel
  function build_gallery(data) {

    //// iterate through each artwork entry and create a gallery tile for it
    data.forEach(function(item, index) {

      if (galleries[item.gallery]) {

        //// create dom nodes for the tile
        const tile = document.createElement('a');
        const overlay = document.createElement('div');
        const img = document.createElement('img');
        const caption = document.createElement('div');
        const caption_2 = document.createElement('div');

        //// attach the uid to the datalist for the tile
        tile.dataset.uid = item.uid;

        //// set the image source for the tile
        //// TODO move the reference to the path up
        img.src = artwork_bucket_uri + item.uid + '/' + item.cropped_image;

        //// set the href link to the detail page along with the uid in the query string
        tile.href = './detail.html?uid=' + item.uid;

        //// add the css styles to the tile nodes
        tile.classList.add(selectors.styles.tile);
        tile.classList.add(selectors.styles.panel_tile);
        caption.classList.add(selectors.styles.caption);
        caption_2.classList.add(selectors.styles.caption);
        overlay.classList.add(selectors.styles.panel_tile_overlay);

        //// add text to the nodes
        caption.innerText = item.title;
        caption_2.innerText = item.medium;

        //// append the chil nodes to the tile node
        //tile.appendChild(overlay);
        tile.appendChild(img);

        tile.appendChild(caption);
        //tile.appendChild(caption_2);

        //// append it to the container node
        galleries[item.gallery].appendChild(tile);
      };

    });

  }

  ///  HTTP REQUEST
  //// TODO separate this from the building function

  const xhr = new XMLHttpRequest();

  xhr.open("GET", artworks_uri, true);

  xhr.addEventListener("load", function(response) {
    let data = (this.response);

    //// parse the data
    data = JSON.parse(data);

    //// call the build_gallery function on the parsed data
    build_gallery(data);
  });

  xhr.send();

})();
