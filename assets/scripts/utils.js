//// init global utils object
const utils = {}


//// get value of uri query string, ie compatible
//// example: const id = query_string["id"];
//// square brackets

utils.query_string = (function(a) {
  if (a == "") return {};
  let b = {};
  for (let i = 0; i < a.length; ++i) {
    let p = a[i].split("=", 2);
    if (p.length == 1) b[p[0]] = "";
    else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
  }
  return b;
})(window.location.search.substr(1).split("&"));



// function to split an array into chunks

utils.chunk = function(arr, chunk_size) {
  var _array = [];
  for (let i = 0, length = arr.length; i < length; i += chunk_size)
    _array.push(arr.slice(i, i + chunk_size));
  return _array;
};

export { utils };