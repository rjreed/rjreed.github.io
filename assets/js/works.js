(function() {
  // define css selector class names
  const classes = {
    container: "gallery",
    item: "gallery_item",
    figure: "gallery_item_figure",
    caption: "gallery_item_caption"
  };

  // URI for the JSON document containing the list of works and details in JSON format
  const list_uri = "./content/works/works.json";

  // function to build the html for a gallery item and append it to the gallery
  const appendNewItem = function(meta) {
    // create elements for the item
    const gallery = document.getElementsByClassName(classes.container)[0];
    const newItem = document.createElement("a");
    const newFigure = document.createElement("img");
    const newCaption = document.createElement("div");

    // set the attributes for the new nodes based off the metadata provided in the 'meta' arg and the classes defined above
    newItem.setAttribute("class", classes.item);
    newFigure.setAttribute("class", classes.figure);
    newCaption.setAttribute("class", classes.caption);
    newItem.setAttribute("href", "detail.html?id=" + meta.id);
    newFigure.setAttribute("src", meta.img);
    newCaption.innerText = meta.title;

    // append the figure and caption nodes to the newItem node, then append that to the gallery node
    newItem.appendChild(newFigure);
    newItem.appendChild(newCaption);
    gallery.appendChild(newItem);
  };

  // function to iterate through the list of works and run the appendNewItem for each one
  const galleryBuilder = function() {
    const obj = JSON.parse(this.response);
    const keys = Object.keys(obj).reverse();

    for (let i = 0, len = keys.length; i < len; i++) {
      appendNewItem(obj[keys[i]]);
    }
  };

  // XHR to get the list_uri object and then run the galleryBuilder function on it
  const xhr = new XMLHttpRequest();

  xhr.open("GET", list_uri, true);

  xhr.addEventListener("load", galleryBuilder);

  xhr.send();
})();
