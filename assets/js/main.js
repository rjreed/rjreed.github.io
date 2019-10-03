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
    // hack since scrollheight is returning an inconsistent value
    let dropdown_height =
      (dropdown_el.scrollHeight > 167 ? dropdown_el.scrollHeight : 175) + "px";

    function clickHandler(e) {
      if (!dropdown_visible && e.target.classList.contains(hooks.toggle)) {
        dropdown_visible = true;
        dropdown_el.style.maxHeight = dropdown_height;
      } else if (
        (dropdown_visible && e.target.classList.contains(hooks.toggle)) ||
        !dropdown_el.contains(e.target)
      ) {
        dropdown_visible = false;
        dropdown_el.style.maxHeight = 0;
      }
    }
    document.addEventListener("click", clickHandler);
  }

  menuSlider();
})();
