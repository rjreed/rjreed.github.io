// ABOUT
/*
  This library provides a simple method to add lightbox functionality to images on a page.

  To enable an image for use, add the class 'js-lightbox-enabled' to the <img> node's class list.
  The img src will be the lightbox src, unless a "data-lightbox_alt" is specified in the img node.
  To add a caption, add a "data-caption" attribute to the node.
  
*/

// APP
//// namespacing for possible API
function __lightbox() {
  /// CSS Selectors

  const selectors = {};

  //// define css classes for javascript access
  selectors.hooks = {
    enabled: 'js-lightbox-enabled',
    lightbox: 'js-lightbox',
    display_container: 'js-lightbox-display-container',
    display: 'js-lightbox-display',
    close: 'js-lightbox-close',
    caption: 'js-lightbox-caption'
  };

  //// define css classes for styling
  selectors.styles = {
    img: 'lightbox-img',
    lightbox: 'lightbox',
    display_container: 'lightbox-display-container',
    display: 'lightbox-display',
    close: 'lightbox-close',
    caption: 'lightbox-caption'
  };

  /// DOM Nodes

  const nodes = {
    //// get nodelist for lightbox-enabled images
    images: document.getElementsByClassName(selectors.hooks.enabled),

    //// create nodes for the lightbox
    lightbox: document.createElement('div'),
    display_container: document.createElement('div'),
    display: document.createElement('img'),
    close: document.createElement('div'),
    caption: document.createElement('div')
  };

  //// init empty galleries object
  let galleries = {};

  //// function to create the lightbox elements and append them to document.body
  function build_lightbox() {
    /*
      lightbox html structure will be:

      <div class="lightbox js-lightbox">
        <div class="lightbox-display-container">
          <div class="js-lightbox-close lightbox-close">X</div>
          <img class="js-lightbox-display lightbox-display"/>
          <div class="js-lightbox-caption lightbox-caption">
          </div>
        </div>
      </div>
    */

    //// Add css classes to lightbox nodes
    nodes.lightbox.classList.add(
      selectors.hooks.lightbox,
      selectors.styles.lightbox
    );

    nodes.display_container.classList.add(
      selectors.hooks.display_container,
      selectors.styles.display_container
    );
    nodes.display.classList.add(
      selectors.hooks.display,
      selectors.styles.display
    );
    nodes.close.classList.add(selectors.hooks.close, selectors.styles.close);
    nodes.caption.classList.add(
      selectors.hooks.caption,
      selectors.styles.caption
    );

    nodes.lightbox.classList.add('hidden');

    //// add X text to close button node
    nodes.close.innerText = 'X';

    //// append nodes to the display container
    nodes.display_container.appendChild(nodes.close);
    nodes.display_container.appendChild(nodes.display);
    nodes.display_container.appendChild(nodes.caption);

    //// append display container to lightbox
    nodes.lightbox.appendChild(nodes.display_container);

    //// append lightbox to document.body
    document.body.appendChild(nodes.lightbox);
  }

  //// add event listener to enquire button, open lightbox on click
  function generate_display(e) {

    const view_height = document.documentElement.clientHeight;
    const view_width = document.documentElement.clientWidth;

    //// assign lightbox_display's src as either the target's data_lightbox_alt or its src
    nodes.display.src = e.target.dataset.lightbox_alt || e.target.src;

    //// adjust max-height and max-width dynamically since vh/vw is inconsistent
    //// this seems to respond to orientation changes without refresh
    nodes.display.style.maxWidth = ((85 / 100) * view_width) + 'px';
    nodes.display.style.maxHeight = ((85 / 100) * view_height) + 'px';

    //// show the lightbox


    nodes.lightbox.classList.remove('hidden');
    setTimeout(()=>{
      nodes.lightbox.style.opacity = 1;
    }, 10)
    



    //// if the node has a 'data-caption', add the text from it to the lightbox display caption
    if (e.target.dataset['caption']) {
      nodes.caption.innerText = e.target.dataset['caption'];
    }
  }

  //// function to fill galleries object
  function generate_galleries() {
    //// iterate through lightbox enabled images
    for (let i = 0, len = nodes.images.length; i < len; i++) {
      //// if img has data-gallery, add it to galleries object and push node into array 
      if (nodes.images[i].dataset.gallery) {
        if (galleries[nodes.images[i].dataset.gallery]) {
          galleries[nodes.images[i].dataset.gallery].push(nodes.images[i]);
        }
        else {
          galleries[nodes.images[i].dataset.gallery] = [];
          galleries[nodes.images[i].dataset.gallery].push(nodes.images[i]);
        }
      }
    }
  }

  function hide() {
    nodes.lightbox.style.opacity = 0;
    setTimeout(() => {
      nodes.lightbox.classList.add('hidden');
    }, 300);
  }

  /* TODO: add functionality for galleries */

  /// Event Listeners

  //// add event listeners to all lightbox-enabed image nodes
  for (let i = 0, len = nodes.images.length; i < len; i++) {
    nodes.images[i].addEventListener('click', generate_display);
  }

  //// add event listener to lightbox container to close on click
  nodes.lightbox.addEventListener('click', function(e) {
    //// check that the click isn't on a child element (the form)
    if (e.target !== e.currentTarget) return;
    //// hide the lightbox
    hide();
  });

  //// add event listener to close button to hide lightbox
  nodes.close.addEventListener('click', function(e) {
    //// hide the lightbox
    hide();
  });

  //// add event listener to hide lightbox on escape keypress
  document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === 'Escape') {
      //// hide the lightbox
      hide();
    }
  });

  //// call the function to build the lightbox elements
  build_lightbox();

  //// call the function to build the galleries object
  generate_galleries();
}
__lightbox();
