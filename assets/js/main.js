(function() {
  function menuSlider() {
    const hooks = {
      toggle: "js-dropdown-toggle",
      dropdown: "js-dropdown",
      header: "header"
    };

    let dropdown_visible = false;

    const header_el = document.getElementsByClassName(hooks.header)[0];
    const dropdown_el = document.getElementsByClassName(hooks.dropdown)[0];

    let dropdown_height = 0;

    function clickHandler(e) {
      if (!dropdown_visible && e.target.classList.contains(hooks.toggle)) {
        dropdown_visible = true;
        dropdown_el.style.maxHeight = dropdown_height;
      } else if (
        dropdown_visible &&
        (e.target.classList.contains(hooks.toggle) ||
          !header_el.contains(e.target))
      ) {
        dropdown_visible = false;
        dropdown_el.style.maxHeight = 0;
      } else if (dropdown_visible && !dropdown_el.contains(e.target)) {
        dropdown_visible = false;
        dropdown_el.style.maxHeight = 0;
      }
    }

    function setupDropdown() {
      dropdown_height = dropdown_el.scrollHeight + "px";
      dropdown_el.style.maxHeight = "0px";
    }

    window.setTimeout(setupDropdown, 50);

    document.addEventListener("click", clickHandler);
  }

  menuSlider();
})();
