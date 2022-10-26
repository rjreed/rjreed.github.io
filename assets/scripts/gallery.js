//// ABOUT

/*
  This is a function to request the index.json file containing artwork info from the S3 bucket,
 and populate the gallery nodes with artwork titles/ links to the S3 files for the artwork images/ links to
 the detail.html page with a query string containing the artwork's uid
*/

//// IMPORTS 
import { urls } from './urls.js';

//// APP
(async function() {

  // size to split up the galleries into chunks for possible pagination/ dynamic loading
  const display_limit = 40;

  /// CSS Selectors

  const selectors = {};

  // define css selectors for javascript access
  selectors.hooks = {
    container: '.js-gallery-container',
    tile: '.js-panel-tile'
  };

  // define css classes for styling
  selectors.styles = {
    tile: 'tile',
    panel_tile: 'gallery-tile',
    panel_tile_overlay: 'panel-tile-overlay',
    caption: 'gallery-tile-caption',
    column: 'column',
    hidden: 'hidden'
  };

  /// DOM Nodes
  const nodes = {
    containers: document.querySelectorAll(selectors.hooks.container)
  };

  /// URI Paths

  // add timestamp to query string to prevent caching in 15 minute intervals
  const time = new Date();
  const _timestamp = (Math.round(time / 9e5) * 9e5);

  // path to send XHR request to get artworks index json array back
  const artwork_index_url = `${urls.artwork}index_sorted.json?limitcache=${_timestamp}`;

  // send the request for the index and parse the results
  let dataset = await fetch(artwork_index_url).then(res => res.json());

  // object to hold references to the different galleries
  let galleries = {};

  // iterate through the nodes for the gallery containers and add a gallery property to galleries for each
  for (let i = 0, len = nodes.containers.length; i < len; i++) {
    const gallery_name = nodes.containers[i].dataset.gallery;
    galleries[gallery_name] = nodes.containers[i];
    galleries[gallery_name].limit = 0;
  }

  // utility function to split an array into chunks
  // todo move this to utils maybe
  function chunk(arr, chunk_size) {
    var _array = [];
    for (let i = 0, length = arr.length; i < length; i += chunk_size)
      _array.push(arr.slice(i, i + chunk_size));
    return _array;
  }

  // function to create the artworks display gallery in the admin panel
  function build_gallery(data) {

    const chunked = chunk(data, display_limit);

    // function to build a sub gallery for the "chunk" array
    function build_sub_gallery(arr, gallery) {

      // iterate through each artwork entry and create a gallery tile for it
      arr.forEach(function(item, index) {

        // create dom nodes for the tile
        const tile = document.createElement('a');
        const overlay = document.createElement('div');
        const img = document.createElement('img');
        const caption = document.createElement('div');
        const caption_2 = document.createElement('div');

        // attach the uid to the datalist for the tile
        tile.dataset.uid = item.uid;

        // set the image source for the tile
        img.src = urls.artwork + item.uid + '/' + item.cropped_image;

        // set the href link to the detail page along with the uid in the query string
        tile.href = './detail.html?uid=' + item.uid;

        // add the css styles to the tile nodes
        tile.classList.add(selectors.styles.tile);
        tile.classList.add(selectors.styles.panel_tile);
        caption.classList.add(selectors.styles.caption);
        caption_2.classList.add(selectors.styles.caption);
        overlay.classList.add(selectors.styles.panel_tile_overlay);

        if (galleries[item.gallery].limit > display_limit) {
          tile.classList.add(selectors.styles.hidden);
        }

        // add text to the nodes
        caption.innerText = item.title;
        caption_2.innerText = item.medium;

        // append the child nodes to the tile node
        // tile.appendChild(overlay);
        tile.appendChild(img);

        tile.appendChild(caption);
        //tile.appendChild(caption_2);

        // append it to the container node
        gallery.appendChild(tile);

      });
    }

    chunked.forEach(function(item, index) {
      let gallery;

      if (index > 0) {
        gallery = galleries[item[0].gallery].cloneNode();
        galleries[item[0].gallery].parentNode.appendChild(gallery);
        build_sub_gallery(chunked[index], gallery);

      }
      else {
        gallery = galleries[item[0].gallery];
        build_sub_gallery(chunked[index], gallery);
      }
    });

  }

  Object.keys(dataset).forEach(function(item, index) {
    if (galleries[item]) {
      build_gallery(dataset[item]);

    }
  });

})();

/*global fetch */
