
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
  }
}


function get_all_backgrounds(themename, _callback) {
  $.ajax({
      data: {
          theme: themename,
      },
      type: 'POST',
      url: '/theme/previous'
  })
      .done(function (data) {
          //console.log(data.background_list);
          _callback(data.background_list);

      });
}



function loadSettings(callback) {
  
  var xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.onreadystatechange = function() {
      if ( this.status == 404) {
        window.location.replace(location.protocol + "//" + location.host + location.pathname + "config?msg=empty");

      }
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        appSettings =  JSON.parse(xhttp.responseText)
        callback(appSettings);
      } 
  };
  xhttp.open("GET", "./static/settings/settings.json", true);
  xhttp.send();
}


function previous_theme(themename, _callback) {
  
  var xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.onreadystatechange = function() {
      if ( this.status == 404) {
        return "error"
      }
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        themedatas =  JSON.parse(xhttp.responseText)
        _callback(themedatas);
      } 
  };
  xhttp.open("GET", "./static/themes/" + themename + "/settings.json", true);
  xhttp.send();
}


function loadTheme(themename, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if ( this.status == 404) {
        loadTheme('default')
      }
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        themedata = JSON.parse(xhttp.responseText)
        callback(themedata);
      } 
  };
  xhttp.open("GET", "./static/themes/" + themename + "/settings.json", true);
  xhttp.send();
}

function getTexts(locale) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if ( this.status == 404) {
        getTexts('en')
      }
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        texts = JSON.parse(xhttp.responseText)
        return texts
      } 
  };
  xhttp.open("GET", "./static/locales/" + locale + ".json", true);
  xhttp.send();
}

function loadScript(locale, callback)
{
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/" + locale + ".js";
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}

var setLocale = function () {
  moment.locale(locale)
}

function setCookie(cname, cvalue, exweeks) {
  //console.log(uid + cname)
  var d = new Date();
  d.setTime(d.getTime() + (exweeks*5*7*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

function setScale(scale) {
  window.body.style.zoom = scale/10;
}

function checkImage (src, good, bad) {
  var img = new Image();
  img.onload = good; 
  img.onerror = bad;
  img.src = src;
}