(function() {

  // map of css selector classes
  const class_map = {
    container: 'content',
    snippet_container: 'js-blog-snippet-container',
    snippet_title: 'js-blog-snippet-title',
    snippet_author: 'js-blog-snippet-author',
    snippet_date: 'js-blog-snippet-date',
    snippet_description: 'js-blog-snippet-description',
    snippet_tags: 'js-blog-snippet-tags'

  };

  // node elements using the css class map
  const nodes = {
    container: document.getElementsByClassName(class_map.container)[0],
    snippet_container: document.getElementsByClassName(class_map.snippet_container)[0]
  };

  //uri where the metadata for the blog posts is located
  const uri = './posts.json';

  //function to build a node an children for a blog post snippet
  function build_elements(data) {
    // clone the template node and children
    const new_post_container = nodes.snippet_container.cloneNode(true);

    // select the child nodes of the newly cloned nodes based off the css map selectors
    const new_post_title = new_post_container.getElementsByClassName(class_map.snippet_title)[0];
    //const new_post_author = new_post_container.getElementsByClassName(class_map.snippet_author)[0];
    const new_post_date = new_post_container.getElementsByClassName(class_map.snippet_date)[0];
    const new_post_description = new_post_container.getElementsByClassName(class_map.snippet_description)[0];
    const new_post_tags = new_post_container.getElementsByClassName(class_map.snippet_tags)[0];

    const tags = data.metadata.tags;

    // apply data to innertexts of the new children nodes
    new_post_title.innerText = data.metadata.title;
    //new_post_author.innerText = data.metadata.author;
    new_post_date.innerText = data.metadata.date;
    new_post_description.innerText = data.metadata.description;
    new_post_tags.innerText = 'Tags: ' + tags.join(', ')

    // set the href attribute of the container to link to the post's html file
    new_post_container.setAttribute('href', 'posts/' + data.id + '/index.html');

    //append the new node to the post list container
    nodes.container.appendChild(new_post_container);

    //remove the template node
    nodes.snippet_container.remove();

  }

  // XHR function to fetch the json for the posts metadata

  const xhr = new XMLHttpRequest();

  xhr.open('GET', uri, true);

  xhr.addEventListener('load', function() {
    const data = JSON.parse(this.response);
    const keys = Object.keys(data);

    // function to iterate through the returned json object and run the build_elements function for each post
    for (let i = 0, len = keys.length; i < len; i++) {
      build_elements(data[keys[i]]);
    }

  });

  xhr.send();

})();
