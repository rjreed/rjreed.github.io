(function() {
  function menuSlider() {
    const classes = {
      dropdown: 'navbar_menu_dropdown',
      toggle: 'navbar_menu_toggle',
      header: 'header'
    };

    const elements = {
      dropdown: document.getElementsByClassName(classes.dropdown)[0],
      toggle: document.getElementsByClassName(classes.toggle)[0],
      header: document.getElementsByClassName(classes.header)[0]
    };

    document.onclick = function(e) {
      if (!elements.header.contains(event.target) && elements.toggle.checked) {
        elements.toggle.checked = false;
      }
    }
  }

  menuSlider();

})();