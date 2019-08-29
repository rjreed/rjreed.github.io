(function() {
  function menuSlider() {
    // define css selector classes
    const classes = {
      toggle: 'navbar_menu_toggle',
      header: 'header'
    };

    // get nodes based off above css selector classes
    const elements = {
      toggle: document.getElementsByClassName(classes.toggle)[0],
      header: document.getElementsByClassName(classes.header)[0]
    };
    
    // add event listener to uncheck toggle element if the dropdown menu is open and the click is outside the header element, which hides the dropdown menu
    document.onclick = function(e) {
      if (!elements.header.contains(event.target) && elements.toggle.checked) {
        elements.toggle.checked = false;
      }
    }
  }

  menuSlider();

})();