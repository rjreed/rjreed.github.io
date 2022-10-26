//// ABOUT

/*
  This is a function to handle the menu/navbar display / dropdown display.
*/

//// APP
(function() {

  /// SELECTORS
  const selectors = {};

  /// CSS Class Map
  selectors.hooks = {
    toggle: ".js-dropdown-toggle",
    dropdown: ".js-dropdown",
    header: ".js-header"
  };

  // covenience function to shorten document.querySelector
  const $qs = (hook) => document.querySelector(hook);

  /// DOM Nodes
  const nodes = {
    header: $qs(selectors.hooks.header),
    dropdown: $qs(selectors.hooks.dropdown)
  };

  // toggle for dropdown visibility
  let dropdown_visible = false;

  // function to handle clicks on the dropdown toggle node
  function click_handler(e) {

    if (!dropdown_visible && e.target.classList.contains(selectors.hooks.toggle.substring(1))) {
      // show dropdown
      dropdown_visible = true;
      // set max-height to the scrollHeight of the element
      /* note: had this variable scoped up but had to wait for window load, this is more consistent with
       resizing pages, dynamic heights, etc. */
      nodes.dropdown.style.maxHeight = nodes.dropdown.scrollHeight + 'px';
    }
    else if (
      (dropdown_visible && e.target.classList.contains(selectors.hooks.toggle.substring(1))) ||
      !nodes.dropdown.contains(e.target)
    ) {
      // hide dropdown
      dropdown_visible = false;
      nodes.dropdown.style.maxHeight = 0;
    }
  }

  // add click_handler event listener to document
  document.addEventListener("click", click_handler);

})();
