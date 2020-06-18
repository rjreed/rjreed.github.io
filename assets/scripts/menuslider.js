// ABOUT

/*
  This is a function to handle the menu/navbar display / dropdown display.
*/

// APP
(function() {

  // SELECTORS

  window.addEventListener('load', function(event) {

    const selectors = {};

    /// CSS Class Map
    selectors.hooks = {
      toggle: "js-dropdown-toggle",
      dropdown: "js-dropdown",
      header: "js-header"
    };

    /// DOM Nodes
    const nodes = {
      header: document.getElementsByClassName(selectors.hooks.header)[0],
      dropdown: document.getElementsByClassName(selectors.hooks.dropdown)[0]
    };

    //// toggle for dropdown visibility
    let dropdown_visible = false;

    //// hack since scrollheight is returning an inconsistent value
    // let dropdown_height = (nodes.dropdown.scrollHeight > 167 ? nodes.dropdown.scrollHeight : 200) + "px";

    let dropdown_height = nodes.dropdown.scrollHeight + 'px';

    //// function to handle clicks on the dropdown toggle node
    function click_handler(e) {

      if (!dropdown_visible && e.target.classList.contains(selectors.hooks.toggle)) {
        //// show dropdown
        dropdown_visible = true;
        nodes.dropdown.style.maxHeight = dropdown_height;
      } else if (
        (dropdown_visible && e.target.classList.contains(selectors.hooks.toggle)) ||
        !nodes.dropdown.contains(e.target)
      ) {
        //// hide dropdown
        dropdown_visible = false;
        nodes.dropdown.style.maxHeight = 0;
      }
    }

    //// add click_handler event listener to document
    document.addEventListener("click", click_handler);
  });
})();
