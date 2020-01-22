(function() {
  // define css selector classes
  const classes = {
    container: "detail",
    link: "detail_link",
    item: "detail_item",
    caption: "detail_item_caption",
    title: "detail_caption_title",
    medium: "detail_caption_medium",
    size: "detail_caption_size",
    date: "detail_caption_date",
    additional: "detail_additional",
    additional_figure: "detail_additional_figure",
    button: "detail_button",
    button_active: "button",
    button_disabled: "button-disabled"
  };

  // get nodes based off above css selector classes
  const elements = {
    container: document.getElementsByClassName(classes.container)[0],
    item: document.getElementsByClassName(classes.item)[0],
    link: document.getElementsByClassName(classes.link)[0],
    figure: document.getElementsByClassName(classes.figure)[0],
    title: document.getElementsByClassName(classes.title)[0],
    medium: document.getElementsByClassName(classes.medium)[0],
    size: document.getElementsByClassName(classes.size)[0],
    date: document.getElementsByClassName(classes.date)[0],
    additional: document.getElementsByClassName(classes.additional)[0],
    button: document.getElementsByClassName(classes.button)[0]
  };

  // get the id provided in the window URL
  //const id = new URL(document.location).searchParams.get("id");

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

  const id = query_string["id"];

  // set attributes of the detail element based of parsed data
  const detailBuilder = function() {
    const meta = JSON.parse(this.response)[id];

    elements.link.setAttribute("href", meta.img);
    elements.item.setAttribute("src", meta.img);
    elements.title.innerText = meta.title;
    elements.medium.innerText = meta.medium;
    elements.size.innerText = meta.size;
    elements.date.innerText = meta.date.split("-")[0];
    
    // check if the work is available
    if (meta.available == 'true') {
      console.log('available');
     
      
      elements.button.value = "Available - show price";
    } else {
      elements.button.classList.remove(classes.button_active);
      elements.button.classList.add(classes.button_disabled);
      elements.button.value = "Private Collection";
    }

    // check if the work has additional images
    if (meta.additional_imgs && meta.additional_imgs.length) {
      // if so iterate through the array of them and create an img element for them, appending them to the dom
      for (let i = 0, len = meta.additional_imgs.length; i < len; i++) {
        const newFigure = document.createElement("img");

        newFigure.setAttribute("src", meta.additional_imgs[i]);
        newFigure.setAttribute("class", classes.additional_figure);

        elements.additional.appendChild(newFigure);

        // add event listener to the img to swap it with main img on click
        newFigure.addEventListener("click", swapImagesHandler);
      }
    }
  };

  function swapImagesHandler(e) {
    // store the src attributes for both elements for later reference
    const src1 = e.target.getAttribute("src");
    const src2 = elements.item.getAttribute("src");

    // change the link href to match the additional img's src
    elements.link.setAttribute("href", src1);

    //hide both imgs
    e.target.style.opacity = 0;
    elements.item.style.opacity = 0;

    //swap the src attributes and show the images after 350 ms, which matches the css transition property time
    setTimeout(function() {
      elements.item.setAttribute("src", src1);
      e.target.setAttribute("src", src2);
      e.target.style.opacity = 1;
      elements.item.style.opacity = 1;
    }, 350);
  }

  // Create XHR to get works list JSON and run detailBuilder on it
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "./content/works/works.json", true);

  xhr.addEventListener("load", detailBuilder);

  xhr.send();
})();
