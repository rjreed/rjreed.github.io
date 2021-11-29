// ABOUT

/*
This is a function to request the index.json file containing artwork info from the S3 bucket,
match an entry against the uid in the query string, and populate the nodes with artwork info/ links to
the S3 files for the artwork images
*/


// APP
(function() {
  // define css selector classes

  const selectors = {};

  selectors.hooks = {
    container: "detail",
    link: "js-detail-link",
    item: "js-detail-item",
    caption: "js-detail-item-caption",
    title: "js-detail-caption-title",
    description: "js-detail-caption-description",
    medium: "js-detail-caption-medium",
    size: "js-detail-caption-size",
    date: "js-detail-caption-date",
    collection: "js-detail-caption-collection",
    additional: "js-detail-additional",
    additional_figure: "js-detail-additional-figure",
    button: "js-detail-button"
  };

  selectors.styles = {
    tile: 'tile',
    hidden: 'hidden',
    button_active: "button",
    button_disabled: "button-disabled"
  };

  // get nodes based off above css selector selectors.hooks
  const nodes = {
    container: document.getElementsByClassName(selectors.hooks.container)[0],
    item: document.getElementsByClassName(selectors.hooks.item)[0],
    link: document.getElementsByClassName(selectors.hooks.link)[0],
    figure: document.getElementsByClassName(selectors.hooks.figure)[0],
    title: document.getElementsByClassName(selectors.hooks.title)[0],
    description: document.getElementsByClassName(selectors.hooks.description)[0],
    medium: document.getElementsByClassName(selectors.hooks.medium)[0],
    size: document.getElementsByClassName(selectors.hooks.size)[0],
    date: document.getElementsByClassName(selectors.hooks.date)[0],
    collection: document.getElementsByClassName(selectors.hooks.collection)[0],
    additional: document.getElementsByClassName(selectors.hooks.additional)[0],
    button: document.getElementsByClassName(selectors.hooks.button)[0]
  };

  //// hack to limit caching to 15 minute intervals for the index.json file
  const time = new Date();
  const timestamp = (Math.round(time / 9e5) * 9e5);

  const artwork_bucket_uri = 'https://s3.us-west-2.amazonaws.com/rockyjreed.com/artwork/';
  const json_uri = artwork_bucket_uri + 'index.json?limitcache=' + timestamp;

  const store_uri = 'https://store.rockyjreed.com';

  //// polyfill-ish function for searchParams for ie11
  const query_string = (function(a) {
    if (a == "") return {};
    let b = {};
    for (let i = 0; i < a.length; ++i) {
      let p = a[i].split("=", 2);
      if (p.length == 1) b[p[0]] = "";
      else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split("&"));

  //// get the id provided in the window URL query string 
  const uid = query_string["uid"];

  //// check if the item exists and populate the caption node, otherwise delete the node so it doesn't affect layout
  function check_and_set(node, item) {
    if (item && item.length) {
      node.innerText = item;
    } else {
      node.parentNode.removeChild(node);
    }
  }

  //// set attributes of the detail node based of parsed data
  const detail_builder = function(data) {

    nodes.link.setAttribute("href", artwork_bucket_uri + data.uid + '/' + data.primary_image);
    nodes.item.setAttribute("src", artwork_bucket_uri + data.uid + '/' + data.primary_image);
    nodes.title.innerText = data.title || 'untitled';

    check_and_set(nodes.description, data.description);
    check_and_set(nodes.medium, data.medium);
    check_and_set(nodes.size, data.size);
    check_and_set(nodes.date, data.date.split("-")[0]);
    check_and_set(nodes.collection, data.collection);

    //// check if the work is available and add a link to the store to the button if so
    if (data.available == 'true') {
      nodes.button.dataset.href = 'data.uid';
      nodes.button.innerText = "Available in Store";
      if (data.url) {
        nodes.button.href = data.url;
      } else {
        nodes.button.href = store_uri;
      }
    } else {
      nodes.button.parentNode.removeChild(nodes.button);
    }

    // check if the work has additional images
    if (data.additional_images && data.additional_images.length) {
      // if so iterate through the array of them and create an img element for them, appending them to the dom
      for (let i = 0, len = data.additional_images.length; i < len; i++) {
        const tile = document.createElement('div');
        const newFigure = document.createElement("img");

        newFigure.setAttribute("src", artwork_bucket_uri + data.uid + '/' + data.additional_images[i]);
        newFigure.setAttribute("class", selectors.hooks.additional_figure);

        tile.classList.add(selectors.styles.tile);
        tile.appendChild(newFigure);
        nodes.additional.appendChild(tile);

        // add event listener to the img to swap it with main img on click
        newFigure.addEventListener("click", swap_images_handler);
      }
    }
  };

  function swap_images_handler(e) {
    // store the src attributes for both nodes for later reference
    const src1 = e.target.getAttribute("src");
    const src2 = nodes.item.getAttribute("src");

    // change the link href to match the additional img's src
    nodes.link.setAttribute("href", src1);

    //hide both imgs
    e.target.style.opacity = 0;
    nodes.item.style.opacity = 0;

    //swap the src attributes and show the images after 350 ms, which matches the css transition property time
    setTimeout(function() {
      nodes.item.setAttribute("src", src1);
      e.target.setAttribute("src", src2);
      e.target.style.opacity = 1;
      nodes.item.style.opacity = 1;
    }, 350);
  }

  // Create XHR to get works list JSON and run detail_builder on it
  const xhr = new XMLHttpRequest();

  xhr.open("GET", json_uri, true);

  xhr.addEventListener("load", function(response) {
    const artworks = JSON.parse(this.response);

    for (let i = 0, len = artworks.length; i < len; i++) {
      if (artworks[i].uid === uid) {
        return detail_builder(artworks[i]);
      }
    }

  });

  xhr.send();
})();
