
var homey;

var uid;
var theme_selected;
var language_selected;
var token;
var username;

var appSettings = loadSettings(function(response) {
   return response;

  });






window.addEventListener('load', function() {
  
  var $container = document.getElementById('container');

  var $containerinner = document.getElementById('container-inner');

    $content = document.getElementById('content');

    $validate_btn = document.getElementById('validate_btn');
    $token = document.getElementById('token');
    $language_selected = document.getElementById('language_selected');
    $theme_selected = document.getElementById('theme_selected');
    $username = document.getElementById('username');
    $msg = document.getElementById('msg');
    $msgform = document.getElementById('msgform');

    if (appSettings.theme != ""){
      $theme_selected.value = appSettings.theme;
    }

    if (appSettings.lang != ""){
      $language_selected.value = appSettings.lang;
    }
  
    if (appSettings.username != ""){
      $username.value = appSettings.username;
    }

    if (appSettings.token != ""){
      $token.value = appSettings.token;
    }

    var msg = getQueryVariable('msg');

    switch(msg) {
      case "empty":
        $msg.innerHTML ="Your token is empty. Please generate a new token : <a href='https://homey.ink' target='_blank'>homey.ink</a>"
        $msgform.classList.remove('hidden');
        $msgform.style.visibility = 'visible';
        break;
      case "expired":
        $msgform.classList.remove('hidden');
        $msgform.style.visibility = 'visible';
        $msg.innerHTML ="Your token is expired. Please generate a new token : <a href='https://homey.ink' target='_blank'>homey.ink</a>"
        break;
      case "invalid":
        $msg.innerHTML ="Your token is invalid. Please generate a new token : <a href='https://homey.ink' target='_blank'>homey.ink</a>"
        $msgform.classList.remove('hidden');
        $msgform.style.visibility = 'visible';
        break;
      default:
        $msg.innerHTML =""
        $msgform.classList.remove('hidden');
        //$msgform.style.visibility = 'visible';
        break;
    }


    $validate_btn.addEventListener('click', function(){
      token = $token.value.replace("%3D", "=")

      theme_selected = $theme_selected.value
      language_selected = $language_selected.value
      username = $username.value

      if (theme_selected === ""){

        $msg.innerHTML ="The theme is missing. Choose a theme from the list. If the list does not contain any theme, please refresh the page."
        $msgform.classList.remove('hidden');
        $msgform.style.visibility = 'visible';
        return  
      }

      if (language_selected === ""){

        $msg.innerHTML ="The language is missing. Choose a language from the list. If the list does not contain any language, please refresh the page."
        $msgform.classList.remove('hidden');
        $msgform.style.visibility = 'visible';
        return  
      }

      if (username === ""){

        $msg.innerHTML ="The username is missing. Choose a username. You can deactivate it later."
        $msgform.classList.remove('hidden');
        $msgform.style.visibility = 'visible';
        return  
      }


      var api = new AthomCloudAPI({
        clientId: appSettings.CLIENT_ID,
        clientSecret: appSettings.CLIENT_SECRET,
      });

      if (token === ""){
        $msg.innerHTML ="Your token is empty. Please generate a new token : <a href='https://homey.ink' target='_blank'>homey.ink</a>"
        $msgform.classList.remove('hidden');
        $msgform.style.visibility = 'visible';
        return  
      }

      try { token = atob(token) }
      catch(err) {
        $msg.innerHTML ="Your token is invalid. Please generate a new token : <a href='https://homey.ink' target='_blank'>homey.ink</a>"
        $msgform.classList.remove('hidden');
        $msgform.style.visibility = 'visible';
        return
      }

      try { token = JSON.parse(token) }
      catch(err) {
        $msgform.classList.remove('hidden');
        $msgform.style.visibility = 'visible';
        $msg.innerHTML ="Your token is invalid format. Please generate a new token : <a href='https://homey.ink' target='_blank'>homey.ink</a>"
        return
      }
      
      api.setToken(token);
    
      api.isLoggedIn().then(function(loggedIn) {
        if(!loggedIn)
        $msgform.classList.remove('hidden');
        $msgform.style.visibility = 'visible';
        $msg.innerHTML ="Your token is expired. Please generate a new token : <a href='https://homey.ink' target='_blank'>homey.ink</a>"
          return
      }).then(function(){
        return api.getAuthenticatedUser();
      }).then(function(user) {
        return user.getFirstHomey();
      }).then(function(homey) {
        return homey.authenticate();
      }).then(function(homey_) {
        token = $token.value.replace("%3D", "=")
        validate(token, username, language_selected, theme_selected);
      }).catch(console.error);
    })


function validate(token, username, language_selected, theme_selected){

  var all_datas = {
    "theme": theme_selected,
    "lang": language_selected,
    "token": token,
    "username": username,
}

  $.ajax({
    type: 'POST',
    url: '/save_config',
    data: all_datas,
    timeout: 3000,
    success: function(data){
      console.log(data.status);
    if (data.status == false){
      $msgform.classList.remove('hidden');
      $msgform.style.visibility = 'visible';
      $msg.innerHTML ="An error occurred during the configuration process. Please contact the developer."
    }

    if (data.status == true){
      window.location.replace(location.protocol + "//" + location.host)
    }
    },
    error: function(){

    }
  });

  
}



    });



  

  