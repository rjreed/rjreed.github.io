(function() {
  // define css selector classes
  const classes = {
    container: 'detail',
    link: 'detail_link',
    item: 'detail_item',
    caption: 'detail_item_caption',
    title: 'detail_caption_title',
    medium: 'detail_caption_medium',
    size: 'detail_caption_size',
    date: 'detail_caption_date'
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
    date: document.getElementsByClassName(classes.date)[0]
  };

  // get the id provided in the window URL
  const id = (new URL(document.location)).searchParams.get('id');

  // set attributes of the detail element based of parsed data
  const detailBuilder = function() {
    const meta = JSON.parse(this.response)[id];

    elements.link.setAttribute('href', meta.img);
    elements.item.setAttribute('src', meta.img);
    elements.title.innerText = meta.title;
    elements.medium.innerText = meta.medium;
    elements.size.innerText = meta.size;
    elements.date.innerText = meta.date.split('-')[0];
  }

  // Create XHR to get works list JSON and run detailBuilder on it
  const xhr = new XMLHttpRequest();

  xhr.open('GET', './content/works/works.json', true);

  xhr.addEventListener('load', detailBuilder);

  xhr.send();

})();