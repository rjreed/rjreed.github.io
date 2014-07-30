(function(){
  var consts = {
    username: 'rjreed'
  };

  var classes = {
    a:  'projects-a',
    li: 'projects-li',
    ul: 'projects-ul',
    lang: 'projects-lang',
    desc: 'projects-desc'
  };

  var repoXHR = new XMLHttpRequest();

  function repoXHRHandler() {
    var repos = JSON.parse(this.response);
    var ul = document.getElementsByClassName(classes.ul)[0];

    for(var i = 0, len = repos.length; i < len; i++){
      if (!repos[i].fork){
	var li = document.createElement('li');
	li.className = classes.li;
	li.innerHTML = '<a class="'
	  + classes.a
	  + '" href="'
	  + repos[i].html_url
	  + '" target="_blank">'
	  + repos[i].name
	  + '<p class="'
	  + classes.lang
	  + '"><em>'
	  + (repos[i].language || 'SVG')
	  +  '</em></p><p class="'
	  + classes.desc
	  + '">'
	  + repos[i].description
	  + '</p></a>';
	
	ul.appendChild(li);
      }
    }
  }

  repoXHR.open('GET', 'https://api.github.com/users/' + consts.username + '/repos?sort=created', true);
  repoXHR.addEventListener('load', repoXHRHandler);
  repoXHR.send();
})();
