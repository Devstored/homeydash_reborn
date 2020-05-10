var version = "1.0.0"

var CLIENT_ID = '5cbb504da1fc782009f52e46';
var CLIENT_SECRET = 'gvhs0gebgir8vz8yo2l0jfb49u9xzzhrkuo1uvs8';




var homey;
var outdoortemperature
var indoortemperature
var homeydashdevicebrightness
var locale = 'en'
var format;
var urltoken;
var uid;
var styleElem;
var $content
var $settingspanel
var iframesettings;
var carousel;
var $backgroundProgress;


//THEME
var $themepanel
var iframetheme;



var appSettings, texts, themedata = loadSettings(function(response, texts, themeprogress) {
  var themeselect = appSettings.theme;
   var lang = appSettings.lang;
   if ( lang ) {
     locale = lang;
   }
   texts = getTexts(locale);
   //loadScript(locale, setLocale)
   var themeprogress = loadTheme(themeselect, function(themedata) {
    
     return themedata;
   })

   return response, texts, themeprogress;

  });






window.addEventListener('load', function() {

  //var homey;
  var me;
  var sunrise = "";
  var sunset = "";
  var tod = "";
  var dn = "";
  var batteryDetails = [];
  var flameDetails =[];
  var batteryAlarm = false;
  var sensorDetails =[];
  var nrMsg = 8;
  var faultyDevice = false;
  var nameChange = false;
  var longtouch = false;
  var showTime;
  var cancelUndim = false;
  var currentBrightness;
  var selectedDevice;
  var slideDebounce = false;
  var sliderUnit = "";

  var $infopanel = document.getElementById('info-panel');
  $settingspanel = document.getElementById('settings-panel');
  $themepanel = document.getElementById('theme-panel');
  var $sliderpanel = document.getElementById('slider-panel');
  var $slider = document.getElementById('slider');
  var $sliderclose = document.getElementById('slider-close');
  var $slidericon = document.getElementById('slider-icon');
  var $slidercapability = document.getElementById('slider-capability');
  var $slidername = document.getElementById('slider-name');
  var $slidervalue = document.getElementById('slider-value');
  var $container = document.getElementById('container');

  var $containerinner = document.getElementById('container-inner');

    var $header = document.getElementById('header');
      var $weather = document.getElementById('weather');
        var $sunrisetime = document.getElementById('sunrise-time');
        var $sunsettime = document.getElementById('sunset-time');
        var $weatherStateIcon = document.getElementById('weather-state-icon');
        var $weatherTemperature = document.getElementById('weather-temperature');
        var $weatherroof = document.getElementById('weather-roof');
        var $weathertemperatureinside = document.getElementById('weather-temperature-inside');
      var $text = document.getElementById('text');
        var $textLarge = document.getElementById('text-large');
        var $textSmall = document.getElementById('text-small');
      var $details = document.getElementById('details');
        var $versionIcon = document.getElementById('version-icon');
        var $batterydetails = document.getElementById('battery-details');
        var $notificationdetails = document.getElementById('notification-details');
        var $sensordetails = document.getElementById('sensor-details');
        var $settingsIcon = document.getElementById('settings-icon');
        var $themeIcon = document.getElementById('theme-icon');
        var $logo = document.getElementById('logo');
    $content = document.getElementById('content');
      var $row1 = document.getElementById('row1'); 
        var $flows = document.getElementById('flows');
          var $favoriteflows = document.getElementById('favorite-flows');  
            var $flowsInner = document.getElementById('flows-inner');
      var $row2 = document.getElementById('row2');
        var $devices = document.getElementById('devices');
          var $favoritedevices = document.getElementById('favorite-devices');
            var $devicesInner = document.getElementById('devices-inner');
      var $row3 = document.getElementById('row3');
        var $alarms = document.getElementById('alarms');
          var $favoritealarms = document.getElementById('favorite-alarms');
            var $alarmsInner = document.getElementById('alarms-inner');
            var $flamedetails = document.getElementById('flame-details');
            var $autor = document.getElementById('theme_autor');




setTimeout(load_all_settings, 1000);


function load_all_settings() {         
//AUDIO
try {
  var audioclic_state = appSettings.activ_audio_clic;
  var audioclic = new Audio('static/themes/' + appSettings.theme + '/audios/' + themedata.audios.clic);      
} catch(err) {}

try {
  var audioopen_state = appSettings.activ_audio_open;
  var audioopen = new Audio('static/themes/' + appSettings.theme + '/audios/' + themedata.audios.open);  
  if (audioopen_state === "true"){
    audioopen.play(); 
  }

} catch(err) {}


//convert houre to milliseconds
var hours = parseInt(appSettings.interval_bg);
var change_bg_time = hours * 60 * 60 *1000;
    

//THEME
//theme
$themeIcon.style.webkitMaskImage = "url(./static/themes/" + appSettings.theme + "/header_icons/" + themedata.header_icons.theme.name + ")";
$themeIcon.style.background = themedata.header_icons.theme.color;

//settings
$settingsIcon.style.webkitMaskImage = "url(./static/themes/" + appSettings.theme + "/header_icons/" + themedata.header_icons.settings.name + ")";
$settingsIcon.style.background = themedata.header_icons.settings.color;

//information
$sensordetails.style.webkitMaskImage = "url(./static/themes/" + appSettings.theme + "/header_icons/" + themedata.header_icons.information.name + ")";
$sensordetails.style.background = themedata.header_icons.information.color;

//notification
$notificationdetails.style.webkitMaskImage = "url(./static/themes/" + appSettings.theme + "/header_icons/" + themedata.header_icons.notification.name + ")";
$notificationdetails.style.background = themedata.header_icons.notification.color;

//battery
$batterydetails.style.webkitMaskImage = "url(./static/themes/" + appSettings.theme + "/header_icons/" + themedata.header_icons.battery.name + ")";
$batterydetails.style.background = themedata.header_icons.battery.color;

//new_version
$versionIcon.style.webkitMaskImage = "url(./static/themes/" + appSettings.theme + "/header_icons/" + themedata.header_icons.new_version.name + ")";
$versionIcon.style.background = themedata.header_icons.new_version.color;


//logo
if ( themedata.header_icons.logo != "" ) {
  $logo.style.background = "no-repeat center center";
  $logo.style.webkitMaskImage = "url(./static/themes/" + appSettings.theme + "/header_icons/" + themedata.header_icons.logo.name + ")";
  $logo.style.background = themedata.header_icons.logo.color;
  $logo.style.backgroundSize = "contain";
}

//autor
$autor.textContent = "Theme by " + themedata.themeInfo.autor;
$autor.href = themedata.themeInfo.homeyForumProfil;
$autor.target = "_blank";


//Text color
document.body.style.color = themedata.all_text_color;



//font
var choice_font = themedata.font;


var family = `${choice_font}`;
//console.log("font " + family);
var url = 'https://fonts.googleapis.com/css?family=' + family + ':100,300,400,500,700'
document.getElementById('link').href = url;
//console.log(fontUrl);

cssVAR(family);


function cssVAR(str) {
var root = document.documentElement
root.style.setProperty('--fam', str);
return false;
}


  var order = appSettings.order
  if ( order != "") {
    row = order.split(",")
  } else {
    row = "1,2,3".split(",")
  }
  
  $row1.style.order = row[0]
  $row2.style.order = row[1]
  $row3.style.order = row[2]

  try {
    $favoriteflows.innerHTML = texts.favoriteflows
    $favoritedevices.innerHTML = texts.favoritedevices
    $favoritealarms.innerHTML = texts.alarms
  } catch(err) {}

  $infopanel.addEventListener('click', function() {
    if (audioclic_state === "true"){
      audioclic.play();
    }
    
    $containerinner.classList.remove('container-dark');
    $infopanel.style.visibility = "hidden";

  });

  $logo.addEventListener('mousedown', function() {
    logoStart();
  });
  
  $logo.addEventListener('touchstart', function() {
    logoStart();
  });

  $logo.addEventListener('mouseup', function() {
    timeout = setTimeout(function() {
      longtouch = false;
    },100)
    $logo.classList.remove('startTouch')
  });

  $logo.addEventListener('touchend', function() {
    timeout = setTimeout(function() {
      longtouch = false;
    },200)
    $logo.classList.remove('startTouch')
  });

  $logo.addEventListener('click', function(){

    if ( longtouch ) {return} // No click when longtouch was performed
    window.location.reload();
  });

  $sliderclose.addEventListener('click', function(){
    $sliderpanel.style.display = "none"
  })

  function logoStart() {
    longtouch = false;
    $logo.classList.add('startTouch')
    timeout = setTimeout(function() {
      if ( $logo.classList.contains('startTouch') ) {
        longtouch = true;
        currentBrightness = $container.style.opacity*100
        var undim = ( currentBrightness + 50)
        if ( undim > 100 ) { undim = 100}
        setBrightness(undim)
        timeout2 = setTimeout(function() {
          if ( !cancelUndim ) {
            setBrightness(currentBrightness)
          }
        }, 7500)
      }
    }, 300)
  }

  $settingsIcon.addEventListener('click', function() {
    if (audioclic_state === "true"){
      audioclic.play();
    }
    renderSettingsPanel();
  })

  $themeIcon.addEventListener('click', function() {
    if (audioclic_state === "true"){
      audioclic.play();
    }
    renderThemePanel();
  })

  $text.addEventListener('click', function() {
    homey.notifications.getNotifications().then(function(notifications) {
      return renderInfoPanel('t',notifications);
    })
  });

  $weather.addEventListener('click', function() {
    homey.weather.getWeather().then(function(weather) {
      return renderInfoPanel("w", weather)
    }).catch(console.error);
  })

  $batterydetails.addEventListener('click', function() {
    if (audioclic_state === "true"){
      audioclic.play();
    }
    return renderInfoPanel("b")
  })

  $sensordetails.addEventListener('click', function() {
    if (audioclic_state === "true"){
      audioclic.play();
    }
    return renderInfoPanel("s")
  })

  $notificationdetails.addEventListener('click', function() {
    if (audioclic_state === "true"){
      audioclic.play();
    }
    homey.notifications.getNotifications().then(function(notifications) {
      return renderInfoPanel('t',notifications);
    })
  });



  outdoortemperature = appSettings.outdoortemperature
  if ( outdoortemperature == undefined || outdoortemperature == "" ) { outdoortemperature = "homey"}

  indoortemperature = appSettings.indoortemperature
  if ( indoortemperature != "" && indoortemperature != "none" ) {
    $weatherroof.style.visibility = "visible"
    $weathertemperatureinside.style.visibility = "visible"
  }

  showTime = appSettings.showtime
  showTime = ( showTime == "true") ? true: false;
  renderText();
  later.setInterval(function(){
    renderText();
  }, later.parse.text('every 1 second'));

  var api = new AthomCloudAPI({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });

  format = getQueryVariable('format');
  if ( format == undefined) {
    format = "web";
  }

  var $css = document.createElement('link');
  $css.rel = 'stylesheet';
  $css.type = 'text/css';
  $css.href = './static/css/formats/' + format + '.css';
  document.head.appendChild($css);

  
  var vadjust = getQueryVariable('vadjust');
  if ( vadjust == undefined ) { vadjust = 0}



  var zoom = appSettings.zoom

  $content.style.zoom = zoom;


  var token = appSettings.token;
  urltoken = appSettings.token;
  if ( token == undefined || token == "undefined" || token == "") {
    window.location.replace(location.protocol + "//" + location.host + location.pathname + "config?msg=empty");
    return
  }
  /*
  uid = token.slice(-5)
  this.console.log(uid) // MzIn0
  */
  try { token = atob(token) }
  catch(err) {
    window.location.replace(location.protocol + "//" + location.host + location.pathname + "config?msg=invalid");
    return
  }
  token = JSON.parse(token);
  api.setToken(token);

  api.isLoggedIn().then(function(loggedIn) {
    if(!loggedIn)
    window.location.replace(location.protocol + "//" + location.host + location.pathname + "config?msg=expired");
      return
  }).then(function(){
    return api.getAuthenticatedUser();
  }).then(function(user) {
    return user.getFirstHomey();
  }).then(function(homey) {
    return homey.authenticate();
  }).then(function(homey_) {
    homey = homey_;

    renderHomey();
    later.setInterval(function(){
      renderHomey();
    }, later.parse.text('every 1 hour'));
  }).catch(console.error);

  function renderHomey() {

    homey.users.getUsers().then(function(users) {
      for ( user in users) {
   
        // console.log("avatar:   " + users[user].avatar)
        // console.log("asleep:   " + users[user].asleep)
        // console.log("present:  " + users[user].present)
        // console.log("enabled:  " + users[user].enabled)
        // console.log("verifeid: " + users[user].verified)
        // console.log("verifeid: " + users[user].email)
   
      }
    }).catch(console.error);

    homey.users.getUserMe().then(function(user) {
      me = user;
      me.properties = me.properties || {};
      me.properties.favoriteFlows = me.properties.favoriteFlows || [];
      me.properties.favoriteDevices = me.properties.favoriteDevices || [];
      //console.log(me.name)
      //console.log(me.avatar)
      

      homey.i18n.getOptionLanguage().then(function(language) {
      }).catch(console.error);

      batteryDetails = [];

      homey.flowToken.getFlowTokens().then(function(tokens) {
        for ( token in tokens) {
          if ( tokens[token].id == "sunrise" && tokens[token].uri == "homey:manager:cron" ) {
            sunrise = tokens[token].value
          }
          if ( tokens[token].id == "sunset" && tokens[token].uri == "homey:manager:cron" ) {
            sunset = tokens[token].value
          }
          if ( tokens[token].id == "measure_battery" ) {
            var batteryLevel = tokens[token].value
            if ( batteryLevel != null ) {
              var element = {}
              element.name = tokens[token].uriObj.name
              element.zone = tokens[token].uriObj.meta.zoneName
              element.level = batteryLevel
              batteryDetails.push(element)
              if ( batteryLevel < 20 ) {
                batteryAlarm = true
              }
            }
          }
        }
        batteryDetails.sort(dynamicSort("level"))
        if (sunrise != "" || sunset != "") {
          calculateTOD();
          renderSunevents();
        }
        if ( batteryAlarm ) {
          $batterydetails.classList.add('alarm')
        } else {
          $batterydetails.classList.remove('alarm')
        }
      }).catch(console.error);

      checkSensorStates();

      checkFlameStates();

      renderVersion();

      renderImages();

      homey.weather.getWeather().then(function(weather) {
        return renderWeather(weather);
      }).catch(console.error);

      homey.flow.getFlows().then(function(flows) {
        var favoriteFlows = me.properties.favoriteFlows.map(function(flowId){
          return flows[flowId];
        }).filter(function(flow){
          return !!flow;
        });
        return renderFlows(favoriteFlows);
      }).catch(console.error);

      homey.alarms.getAlarms().then(function(alarms) {
        return renderAlarms(alarms);
      }).catch(console.error);

      homey.devices.getDevices().then(function(devices) {
        var favoriteDevices = me.properties.favoriteDevices.map(function(deviceId){
          return devices[deviceId];
        }).filter(function(device){
          return !!device;
        }).filter(function(device){
          if(!device.ui) return false;
          //if(!device.ui.quickAction) return false;
          return true;
        });

        favoriteDevices.forEach(function(device){
          // console.log(device.name)
          // console.log(device.capabilitiesObj)
          if (!device.ready) {
            faultyDevice=true;
            $sensordetails.classList.add('fault')
            return
          }
 

          if (!device.ready) {
            faultyDevice=true;
            $flamedetails.classList.add('fault')
            return
          }
          if ( device.capabilitiesObj.locked ) {
            device.makeCapabilityInstance('locked', function(value){
              var $valueElement = document.getElementById('lock:' + device.id);
              if( $valueElement ) {
                //console.log("Locked: " + value)
                $valueElement.classList.toggle('locked', !!value);
                $valueElement.classList.toggle('unlocked', !value);
              }
            });
          }
          if ( device.capabilitiesObj.alarm_smoke ) {
            device.makeCapabilityInstance('alarm_smoke', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                $deviceElement.classList.toggle('alarm', !!value);
                checkFlameStates();
              }
            });
          }
          if ( device.capabilitiesObj.alarm_fire ) {
            device.makeCapabilityInstance('alarm_fire', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                $deviceElement.classList.toggle('alarm', !!value);
                checkFlameStates();
              }
            });
          }
          if ( device.capabilitiesObj.alarm_co ) {
            device.makeCapabilityInstance('alarm_co', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                $deviceElement.classList.toggle('alarm', !!value);
                checkFlameStates();
              }
            });
          }
          if ( device.capabilitiesObj.alarm_heat ) {
            device.makeCapabilityInstance('alarm_heat', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                $deviceElement.classList.toggle('alarm', !!value);
                checkFlameStates();
              }
            });
          }
          if ( device.ui.quickAction ) {
            device.makeCapabilityInstance(device.ui.quickAction, function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                $deviceElement.classList.toggle('on', !!value);
              }
            });
          }

          
          if ( device.capabilitiesObj.alarm_generic ) {
            device.makeCapabilityInstance('alarm_generic', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                $deviceElement.classList.toggle('alarm', !!value);
                checkSensorStates();
              }
            });
          }
          if ( device.capabilitiesObj.alarm_motion ) {
            device.makeCapabilityInstance('alarm_motion', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                $deviceElement.classList.toggle('alarm', !!value);
                checkSensorStates();
              }
            });
          }
          if ( device.capabilitiesObj.alarm_contact ) {
            device.makeCapabilityInstance('alarm_contact', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                $deviceElement.classList.toggle('alarm', !!value);
                checkSensorStates();
              }
            });
          }
          if ( device.capabilitiesObj.alarm_connected ) {
            device.makeCapabilityInstance('alarm_connected', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                $deviceElement.classList.toggle('away', !value);
                checkSensorStates();
              }
            });
          }
          if ( device.capabilitiesObj.alarm_night ) {
            device.makeCapabilityInstance('alarm_night', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                $deviceElement.classList.toggle('day', !value);
              }
            });
          }

          if ( device.capabilitiesObj.alarm_water ) {
            device.makeCapabilityInstance('alarm_water', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                $deviceElement.classList.toggle('alarm', !!value);
                checkSensorStates();
              }
            });
          }
          if ( device.capabilitiesObj.alarm_tamper ) {
            device.makeCapabilityInstance('alarm_tamper', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                $deviceElement.classList.toggle('alarm', !!value);
                checkSensorStates();
              }
            });
        }
          if ( device.capabilitiesObj.alarm_vibration ) {
            device.makeCapabilityInstance('alarm_vibration', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                $deviceElement.classList.toggle('alarm', !!value);
                checkSensorStates();
              }
            });
          }
          if ( device.capabilitiesObj.measure_temperature ) {
            device.makeCapabilityInstance('measure_temperature', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":measure_temperature");
                capability = device.capabilitiesObj['measure_temperature']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.target_temperature ) {
            device.makeCapabilityInstance('target_temperature', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":target_temperature");
                capability = device.capabilitiesObj['target_temperature']
                renderValue($valueElement, capability.id, capability.value, capability.units)
                if (device.name=="Bier") {renderValue($valueElement, capability.id, capability.value, "")}
              }
            });
          }
          if ( device.capabilitiesObj.measure_humidity ) {
            device.makeCapabilityInstance('measure_humidity', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":measure_humidity");
                capability = device.capabilitiesObj['measure_humidity']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.measure_pressure ) {
            device.makeCapabilityInstance('measure_pressure', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":measure_pressure");
                capability = device.capabilitiesObj['measure_pressure']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.measure_luminance ) {
            device.makeCapabilityInstance('measure_luminance', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":measure_luminance");
                capability = device.capabilitiesObj['measure_luminance']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          // new 1.1.1.9
          if ( device.capabilitiesObj.measure_gust_strength ) {
            device.makeCapabilityInstance('measure_gust_strength', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":measure_gust_strength");
                capability = device.capabilitiesObj['measure_gust_strength']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.measure_rain ) {
            device.makeCapabilityInstance('measure_rain', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":measure_rain");
                capability = device.capabilitiesObj['measure_rain']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.measure_rain_day ) {
            device.makeCapabilityInstance('measure_rain_day', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":measure_rain_day");
                capability = device.capabilitiesObj['measure_rain_day']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.measure_solarradiation ) {
            device.makeCapabilityInstance('measure_solarradiation', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":measure_solarradiation");
                capability = device.capabilitiesObj['measure_solarradiation']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.measure_uv ) {
            device.makeCapabilityInstance('measure_uv', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":measure_uv");
                capability = device.capabilitiesObj['measure_uv']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.measure_wind_angle ) {
            device.makeCapabilityInstance('measure_wind_angle', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":measure_wind_angle");
                capability = device.capabilitiesObj['measure_wind_angle']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.measure_wind_strength ) {
            device.makeCapabilityInstance('measure_wind_strength', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":measure_wind_strength");
                capability = device.capabilitiesObj['measure_wind_strength']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          // /new 1.1.1.9
          if ( device.capabilitiesObj.measure_power ) {
            device.makeCapabilityInstance('measure_power', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":measure_power");
                capability = device.capabilitiesObj['measure_power']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.measure_co ) {
            device.makeCapabilityInstance('measure_co', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":measure_co");
                capability = device.capabilitiesObj['measure_co']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }

          if ( device.capabilitiesObj.meter_power ) {
            device.makeCapabilityInstance('meter_power', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":meter_power");
                capability = device.capabilitiesObj['meter_power']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.measure_current ) {
            device.makeCapabilityInstance('measure_current', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":measure_current");
                capability = device.capabilitiesObj['measure_current']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.measure_voltage ) {
            device.makeCapabilityInstance('measure_voltage', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":measure_voltage");
                capability = device.capabilitiesObj['measure_voltage']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.meter_gas ) {
            device.makeCapabilityInstance('meter_gas', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":meter_gas");
                capability = device.capabilitiesObj['meter_gas']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.measure_water ) {
            device.makeCapabilityInstance('measure_water', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":measure_water");
                capability = device.capabilitiesObj['measure_water']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.daily_production ) {
            device.makeCapabilityInstance('daily_production', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":daily_production");
                capability = device.capabilitiesObj['daily_production']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.production ) {
            device.makeCapabilityInstance('production', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":production");
                capability = device.capabilitiesObj['production']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.dim ) {
            device.makeCapabilityInstance('dim', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":dim");
                capability = device.capabilitiesObj['dim']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.volume_set ) {
            device.makeCapabilityInstance('volume_set', function(value){
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement ) {
                var $valueElement = document.getElementById('value:' + device.id + ":volume_set");
                capability = device.capabilitiesObj['volume_set']
                renderValue($valueElement, capability.id, capability.value, capability.units)
              }
            });
          }
          if ( device.capabilitiesObj.flora_measure_moisture ) {
            device.makeCapabilityInstance('flora_measure_moisture', function(value) {
              var $deviceElement = document.getElementById('device:' + device.id);
              var moisture = value;
              if( $deviceElement) {
                var $element = document.getElementById('value:' + device.id +":flora_measure_moisture");
                $element.innerHTML = Math.round(moisture) + "<span id='decimal'>%</span><br />"
                console.log(moisture)
                if ( moisture < 15 || moisture > 65 ) {
                  console.log("moisture out of bounds")
                  $deviceElement.classList.add('alarm')
                  selectValue(device, $element)
                  selectIcon($element, $element.id, device, device.capabilitiesObj['flora_measure_moisture'])
                } else {
                  $deviceElement.classList.remove('alarm')
                }
                checkSensorStates();
              }
            });
          }

          if ( device.capabilitiesObj.measure_co2 ) {
            device.makeCapabilityInstance('measure_co2', function(value) {
              var $deviceElement = document.getElementById('device:' + device.id);
              var co2 = value;
              if( $deviceElement) {
                var $element = document.getElementById('value:' + device.id +":measure_co2");
                $element.innerHTML = Math.round(co2) + "<span id='decimal'><br />ppm</span><br />"
                console.log(co2)
                  if ( co2 > 200 || co2 > 400  ) {
                    console.log("co2 out of bounds")
                    $deviceElement.classList.add("low")
                   } else {
                    $deviceElement.classList.remove("low")
                  }
                  checkSensorStates();
                }
              });
            }
            
            if ( device.capabilitiesObj.measure_co2 ) {
              device.makeCapabilityInstance('measure_co2', function(value) {
                var $deviceElement = document.getElementById('device:' + device.id);
                var co2 = value;
                if( $deviceElement) {
                  var $element = document.getElementById('value:' + device.id +":measure_co2");
                  $element.innerHTML = Math.round(co2) + "<span id='decimal'><br />ppm</span><br />"
                  console.log(co2)
                    if ( co2 > 1500 || co2 > 2000  ) {
                      console.log("co2 out of bounds")
                      $deviceElement.classList.add("high")
                    } else {
                      $deviceElement.classList.remove("high")
                    }
                    checkSensorStates();
                  }
                });
              }
              if ( device.capabilitiesObj.measure_co2 ) {
                device.makeCapabilityInstance('measure_co2', function(value) {
                  var $deviceElement = document.getElementById('device:' + device.id);
                  var co2 = value;
                  if( $deviceElement) {
                    var $element = document.getElementById('value:' + device.id +":measure_co2");
                    $element.innerHTML = Math.round(co2) + "<span id='decimal'><br />ppm</span><br />"
                    console.log(co2)
                    if ( co2 > 900 || co2 > 1400   ) {
                      console.log("co2 out of bounds")
                      $deviceElement.classList.add("mid")
                    } else {
                      $deviceElement.classList.remove("mid")
                    }
                      checkSensorStates();
                    }
                  });
                }
          if ( device.capabilitiesObj.flora_measure_fertility ) {
            device.makeCapabilityInstance('flora_measure_fertility', function(fertility) {
              var $deviceElement = document.getElementById('device:' + device.id);
              if( $deviceElement) {
                var $element = document.getElementById('value:' + device.id +":flora_measure_fertility");
                $element.innerHTML = Math.round(fertility) + "<span id='decimal'>%</span><br />"
              }
            });
          }
        });
        homeydashdevicebrightness = appSettings.homeydashdevicebrightness
        var brightness = 100
        for (item in devices) {
          device = devices[item]
          if ( device.ready ) {
              if ( device.id == indoortemperature ) {
                if ( device.capabilitiesObj.measure_temperature ) {
                  value = device.capabilitiesObj.measure_temperature.value
                  renderValue($weathertemperatureinside, 'measure_temperature', value)
                  device.makeCapabilityInstance('measure_temperature', function(value){
                    renderValue($weathertemperatureinside, 'measure_temperature', value)
                  });
                }
              }
              if ( device.id == outdoortemperature ) {
                if ( device.capabilitiesObj.measure_temperature ) {
                  value = device.capabilitiesObj.measure_temperature.value
                  renderValue($weatherTemperature, 'measure_temperature', value)
                  device.makeCapabilityInstance('measure_temperature', function(value){
                    renderValue($weatherTemperature, 'measure_temperature', value)
                  });
                }
              }
              if ( device.id == homeydashdevicebrightness ) {
                if ( device.capabilitiesObj.dim) {
                  brightness = Math.round(device.capabilitiesObj.dim.value*100)
                  if ( brightness == null ) { brightness = 100 }
                  if ( brightness <0 || brightness > 100 ) {
                    console.log(device.name + " dim value is out of bounds")
                    break
                  }
                  device.makeCapabilityInstance('dim', function(value){
                    value = Math.round(value * 100)
                    if ( value <0 || value > 100 ) {
                      console.log(device.name + " dim value is out of bounds")
                    }
                    cancelUndim = true
                    setBrightness(value)
                    timeout2 = setTimeout(function() {
                      cancelUndim = false
                    }, 7500)
                  });
                } else {
                  console.log(device.name + " device found, device does not have dim capability!")
                }
              }
          }
        }

        setBrightness(brightness)
        return renderDevices(favoriteDevices);        

      }).catch(console.error);
    }).catch(console.error);
  }

  function renderVersion() {
    var newVersion = false;
    var savedVersion = appSettings.version
    if ( savedVersion != version) {
      newVersion = true;
      $versionIcon.style.visibility = 'visible';
      $versionIcon.addEventListener('click', function() {
        setCookie('version', version ,12)
        changeLog = ""
        changeLog = changeLog + "* Added lock status icon<br />"
        changeLog = changeLog + "* Prevent unloadable device icons causing display problems<br />"
        changeLog = changeLog + "* Corrected Italian translations<br />"
        renderInfoPanel("u",changeLog)
      })
    }
  }

  function renderImages() {
    var backgroundOpacity = appSettings.backgroundopacity;
    var i = 0;
    var css = ""


    if (themedata.background.gradientColors.color1 != "" && themedata.background.gradientColors.color2 != "" && themedata.background.gradientColors.color3 != ""){
      //set background color
      clearInterval(carousel);
      document.body.style.background = " -webkit-linear-gradient(55deg, " + themedata.background.gradientColors.color1 + " 0%, " + themedata.background.gradientColors.color2 + " 50%, " + themedata.background.gradientColors.color3 + " 100%)";
  }else{
  get_all_backgrounds(appSettings.theme, function (backgrounds) {
      if (typeof backgrounds !== "undefined") {
        css = "";
          //multitheme = backgrounds.length;
          //document.body.style.backgroundImage = "url(./static/themes/" + appSettings.theme + "/backgrounds/" + backgrounds[0] + ")";

          css = "content: ''; background: url(./static/themes/" + appSettings.theme + "/backgrounds/" + appSettings.background_progress + ");"
          css = css + " top: " + vadjust + "px; left: 0; bottom: 0; right: 0; position: absolute; z-index: -1; background-size:cover;"
          css = css + " opacity: " + backgroundOpacity + ";"
          styleElem = document.head.appendChild(document.createElement("style"));
          styleElem.innerHTML = "#body:after {" + css + "}";

          if (backgrounds.length > 1) {
              carousel = setInterval(function ($) {
                css = "";
                  i = (i > (backgrounds.length - 1))?0:i; 
                  urlbackground = backgrounds[i];
                  progress_background(urlbackground);
              $("#content").fadeOut(300, function() {  
                css = "content: ''; background: url(./static/themes/" + appSettings.theme + "/backgrounds/" + backgrounds[i++] + ");"
                css = css + " top: " + vadjust + "px; left: 0; bottom: 0; right: 0; position: absolute; z-index: -1; background-size:cover;"
                css = css + " opacity: " + backgroundOpacity + ";"

                styleElem = document.head.appendChild(document.createElement("style"));
                styleElem.innerHTML = "#body:after {" + css + "}";
                //document.body.style.backgroundImage = "url(./static/themes/" + appSettings.theme + "/backgrounds/"  + backgrounds[i++] + ")"; 
                $("#content").fadeIn(300);});
              }, change_bg_time, $);
          }
      }
      
  });
}


    // if ( logo == "" && logofromurl != "") {
    //   $logo.style.background = "no-repeat center center";
    //   $logo.style.backgroundImage = "url('" + logofromurl + "')";
    //   $logo.style.backgroundSize = "contain";
    // }
  }


  
function progress_background(progress_background){


  var all_datas = {
    "background_progress": progress_background
}

  $.ajax({
    type: 'POST',
    url: '/save_progress_bg',
    data: all_datas,
    timeout: 3000,
    success: function(data){
      //console.log(data.status);
    },
    error: function(){
    }
  });
}


  function checkSensorStates() {
    homey.flowToken.getFlowTokens().then(function(tokens) {
      var sensorAlarm = false
      sensorDetails = [];
      for ( token in tokens) {
        if (tokens[token].id == "alarm_generic" && tokens[token].value == true ||
        tokens[token].id == "alarm_motion" && tokens[token].value == true ||
        tokens[token].id == "alarm_contact" && tokens[token].value == true ||
        tokens[token].id == "alarm_vibration" && tokens[token].value == true ||
        tokens[token].id == "alarm_water" && tokens[token].value == true ||
        tokens[token].id == "alarm_tamper" && tokens[token].value == true 
          ) {
            var element = {}
            element.name = tokens[token].uriObj.name
            element.zone = tokens[token].uriObj.meta.zoneName
            sensorDetails.push(element)
            sensorAlarm = true
        }
      }
      if ( sensorAlarm ) {
        $sensordetails.classList.add('alarm')
      } else {
        $sensordetails.classList.remove('alarm')
      }
    }).catch(console.error);
  }

  function checkFlameStates() {
    homey.flowToken.getFlowTokens().then(function(tokens) {
      var flameAlarm = false
      flameDetails = [];
      for ( token in tokens) {
        if (
            tokens[token].id == "alarm_smoke" && tokens[token].value == true ||
            tokens[token].id == "alarm_fire" && tokens[token].value == true ||
            tokens[token].id == "alarm_co" && tokens[token].value == true ||
            tokens[token].id == "alarm_heat" && tokens[token].value == true 
             
          ) {
            var element = {}
            element.name = tokens[token].uriObj.name
            element.zone = tokens[token].uriObj.meta.zoneName
            flameDetails.push(element)
            flameAlarm = true
        }
      }
      if ( flameAlarm ) {
        $flamedetails.classList.add('alarm')
      } else {
        if($flamedetails != null){
        $flamedetails.classList.remove('alarm')
      }
      }
    }).catch(console.error);
  }

  function renderInfoPanel(type,info) {
    switch(type) {
      case "t":
        $infopanel.innerHTML = '';
        var $infoPanelNotifications = document.createElement('div');
        $infoPanelNotifications.id = "infopanel-notifications"
        $infopanel.appendChild($infoPanelNotifications);
        $ni = "<center><h1>" + texts.notification.title + "</h1></center><br />"
        var nots =[];
        for ( inf in info) {
            nots.push(info[inf]);
        }
        nots.sort(dynamicSort("-dateCreated"));

        if ( nots.length < nrMsg) {
          nrNot = nots.length
        } else {
          nrNot = nrMsg
        }

        if ( nots.length > 0 ) {
          for (not = 0; not < nrNot; not++) {
              var formatedDate = new Date(nots[not].dateCreated);
              today = new Date
              if ( formatedDate.toLocaleDateString() != new Date().toLocaleDateString() ) {
                formatedDate = formatedDate.toLocaleTimeString() + " (" +formatedDate.toLocaleDateString() + ")"
              } else {
                formatedDate = formatedDate.toLocaleTimeString()
              }
              $ni = $ni + "<div><h2>" + nots[not].excerpt.replace("**","").replace("**","").replace("**","").replace("**","") + "</h2></div> ";
              $ni = $ni + "<div class='info-date'> " + formatedDate+ "</div>"
          }
        } else {
          $ni = $ni + texts.notification.nonotification
        }

        $infoPanelNotifications.innerHTML = $ni
        break;
      case "w":
        $infopanel.innerHTML = '';
        var $infoPanelWeather = document.createElement('div');
        $infoPanelWeather.id = "infopanel-weather"
        $infopanel.appendChild($infoPanelWeather);
        $wi = "<center><h1>" + texts.weather.title + info.city + "</h1><br />"
        $wi = $wi + "<h2>" + texts.weather.temperature + Math.round(info.temperature*10)/10 + texts.weather.degrees
        $wi = $wi + texts.weather.humidity + Math.round(info.humidity*100) + texts.weather.pressure
        $wi = $wi + Math.round(info.pressure*1000) + texts.weather.mbar + "</h2></center>";

        $infoPanelWeather.innerHTML = $wi

        var $infopanelState = document.createElement('div');
        $infopanelState.id = "weather-state"
        $infopanel.appendChild($infopanelState);
        $infopanelState.innerHTML = "";
        $infopanelState.classList.add('weather-state');
        var $icon = document.createElement('div');
        $icon.id = 'weather-state-icon';
        $icon.classList.add(info.state.toLowerCase());
        $icon.style.backgroundImage = 'url(./static/img/weather/' + info.state.toLowerCase() + dn + '.svg)';
        $icon.style.webkitMaskImage = 'url(./static/img/weather/' + info.state.toLowerCase() + dn + '.svg)';

        $infopanelState.appendChild($icon)

        var $infoPanelSunevents = document.createElement('div');
        $infoPanelSunevents.id = "infopanel-sunevents"
        $infopanel.appendChild($infoPanelSunevents);

        switch(tod) {
          case 1:
            $se = "<center><h2>" + texts.sunevent.presunrise + sunrise + texts.sunevent.presunset + sunset + "</h2></center>"
            break;
          case 2:
            $se = "<center><h2>" + texts.sunevent.postsunrise  + sunrise + texts.sunevent.presunset + sunset + "</h2></center>"
            break;
          case 3:
            $se = "<center><h2>" + texts.sunevent.postsunrise  + sunrise + texts.sunevent.postsunset + sunset + "</h2></center>"
            break;
          default:
            $se = "<center><h2>" + texts.sunevent.postsunrise  + sunrise + texts.sunevent.postsunset + sunset + "</h2></center>"
            break;
        }
        $infoPanelSunevents.innerHTML = $se

        break;
      case "b":
        $infopanel.innerHTML = '';
        var $infoPanelBattery = document.createElement('div');
        $infoPanelBattery.id = "infopanel-battery"
        $infopanel.appendChild($infoPanelBattery);
        $bi = "<center><h1>" + texts.battery.title + "</h1></center><br /><br />"
        for ( device in batteryDetails) {
          $bi = $bi + "<h2>" + batteryDetails[device].name + texts.battery.in
          $bi = $bi + batteryDetails[device].zone + texts.battery.has
          $bi = $bi + batteryDetails[device].level + texts.battery.left + "</h2>"
        }
        $infopanel.innerHTML = $bi

        break;
      case "s":
        $infopanel.innerHTML = '';
        var $infoPanelSensors = document.createElement('div');
        $infoPanelSensors.id = "infopanel-sensor"
        $infopanel.appendChild($infoPanelSensors);
        $si = "<center><h1>" + texts.sensor.title + "</h1></center><br /><br />"
        if ( Object.keys(sensorDetails).length ) {
          for ( device in sensorDetails) {
            $si = $si + "<h2>" + sensorDetails[device].name + texts.sensor.in
            $si = $si + sensorDetails[device].zone + texts.sensor.alarm + "</h2>"
          }
        } else {
          $si = $si + "<h2>" + texts.sensor.noalarm + "</h2>"
        }
        if ( faultyDevice ) {
          $si = $si +"<br /><h2>" + texts.sensor.fault + "</h2>"
        }
        $infopanel.innerHTML = $si
        break;

        case "f":
          $infopanel.innerHTML = '';
          var $infoPanelFlame = document.createElement('div');
          $infoPanelFlame.id = "infopanel-flame"
          $infopanel.appendChild($infoPanelFlame);
          $fi = "<center><h1>" + texts.flame.title + "</h1></center><br /><br />"
          if ( Object.keys(flameDetails).length ) {
            for ( device in flameDetails) {
              $fi = $fi + "<h2>" + flameDetails[device].name + texts.flame.in
              $fi = $fi + flameDetails[device].zone + texts.flame.alarm + "</h2>"

            }
          } else {
            $fi = $fi + "<h2>" + texts.flame.noalarm + "</h2>"
            $fi = $fi + "<h2>" + texts.flame.testalarm + "</h2>"
          }
          if ( faultyDevice ) {
            $fi = $fi +"<br /><h2>" + texts.flame.fault + "</h2>"
          }
          $infopanel.innerHTML = $fi
          break;
      case "u":

        $infopanel.innerHTML = '';
        var $infoPanelUpdate = document.createElement('div');
        $infoPanelUpdate.id = "infopanel-update"
        $infopanel.appendChild($infoPanelUpdate);
        $ui = "<center><h1>New Version</h1></center><br /><br />"
        $ui = $ui + "<h2>Changes</h2><br /><h3>"
        $ui = $ui + info +"</h3>"
        $infopanel.innerHTML = $ui
        break;
    }
    $sliderpanel.style.display = "none"
    $infopanel.style.visibility = "visible";
    $containerinner.classList.add('container-dark');
  }

  function renderSunevents() {
    $sunrisetime.innerHTML = sunrise;
    $sunsettime.innerHTML = sunset;
  }

  function renderWeather(weather) {
    if ( outdoortemperature == "homey" ) {
      $weatherTemperature.innerHTML = Math.round(weather.temperature);
    }
    $weatherStateIcon.classList.add(weather.state.toLowerCase());
    $weatherStateIcon.style.backgroundImage = 'url(./static/img/weather/' + weather.state.toLowerCase() + dn + '.svg)';
    $weatherStateIcon.style.webkitMaskImage = 'url(./static/img/weather/' + weather.state.toLowerCase() + dn + '.svg)';
  }

  function renderAlarms(alarms) {
    if ( Object.keys(alarms).length != 0 ) {
      $alarmsInner.innerHTML = '';

      for (var key in alarms) {
        var alarm = alarms[key];
        var week = ""
        var weekend = ""
        var schedule = ""

        if ( alarm.repetition["monday"] ) { week = week + moment.weekdaysMin(1) + ","}
        if ( alarm.repetition["tuesday"] ) { week = week + moment.weekdaysMin(2) + ","}
        if ( alarm.repetition["wednesday"] ) { week = week + moment.weekdaysMin(3) + ","}
        if ( alarm.repetition["thursday"] ) { week = week + moment.weekdaysMin(4) + ","}
        if ( alarm.repetition["friday"] ) { week = week + moment.weekdaysMin(5) + ","}

        if ( week == moment.weekdaysMin(1) + "," +
              moment.weekdaysMin(2) + "," +
              moment.weekdaysMin(3) + "," +
              moment.weekdaysMin(4) + "," +
              moment.weekdaysMin(5) + ","
            ) { week = texts.schedules.weekdays + "," }

        if ( alarm.repetition["saturday"] ) { weekend = weekend + moment.weekdaysMin(6) + ","}
        if ( alarm.repetition["sunday"] ) { weekend = weekend + moment.weekdaysMin(7) + ","}
        if ( weekend == moment.weekdaysMin(6) + "," +
              moment.weekdaysMin(7) + "," 
            ) { weekend = texts.schedules.weekend + "," }
        schedule = week + weekend
        schedule = schedule.substr(schedule,schedule.length-1)
        if ( schedule == texts.schedules.weekdays + "," + texts.schedules.weekend ) {
          schedule = texts.schedules.alldays
        }

        var $alarmElement = document.createElement('div');
        $alarmElement.id = 'alarm:' + alarm.id;
        $alarmElement.classList.add('alarm');
        $alarmElement.style.backgroundColor = themedata.objects.alarm.inactive_backgroundColor;
        if(alarm.enabled)
        {
          $alarmElement.classList.add('on');
        }
        $alarmsInner.appendChild($alarmElement);

        // Time
        var $time = document.createElement('div');
        $time.classList.add('value');
        $time.innerHTML = alarm.time;
        $time.style.color = themedata.objects.alarm.inactive_textColor;
        $alarmElement.appendChild($time);

        // Name
        var $name = document.createElement('div');
        $name.classList.add('name');
        $name.innerHTML = alarm.name
        $name.style.color = themedata.objects.alarm.inactive_textColor;
        $alarmElement.appendChild($name);

        // Schedule
        var $schedule = document.createElement('div');
        $schedule.classList.add('schedule');
        $schedule.innerHTML = schedule
        $schedule.style.color = themedata.objects.alarm.inactive_textColor;
        $alarmElement.appendChild($schedule);

        if ($alarmElement.classList.contains("on")){
          $alarmElement.style.backgroundColor = themedata.objects.alarm.backgroundColor;
          $time.style.color = themedata.objects.alarm.textColor;
          $name.style.color = themedata.objects.alarm.textColor;
          $schedule.style.color = themedata.objects.alarm.textColor;
        }

        attachEvent($alarmElement,alarm)

      }
    } else {
      $alarms.style.visibility = 'hidden';
      $alarms.style.height = '0';
      $alarms.style.marginBottom = '0';
    }
  }

  function attachEvent($alarmElement,alarm) {
    $alarmElement.addEventListener('click', function(){
      if (audioclic_state === "true"){
        audioclic.play();
      }
      var value = !$alarmElement.classList.contains('on');
      $alarmElement.classList.toggle('on', value);


      
      var newValue = {enabled:value}
      homey.alarms.updateAlarm({
        id: alarm.id,
        alarm: newValue,
      }).catch(console.error);
    });
  }


  
  function renderFlows(flows) {
    if ( flows != "" ) {
    $flowsInner.innerHTML = '';
      flows.forEach(function(flow) {
        var $flow = document.createElement('div');

        $flow.id = 'flow-' + flow.id;
        $flow.classList.add('flow');
        $flow.addEventListener('click', function(){
          if (audioclic_state === "true"){
            audioclic.play();
          }
          if( $flow.classList.contains('running') ) return;
          homey.flow.triggerFlow({
            id: flow.id,
          }).then(function(){

            $flow.classList.add('running');
            setTimeout(function(){
              $flow.classList.remove('running');
            }, 3000);
          }).catch(console.error);
        });
        $flowsInner.appendChild($flow);

        var $play = document.createElement('div');
        $play.classList.add('play');
        $flow.appendChild($play);

        var $name = document.createElement('div');
        $name.classList.add('name');
        $name.innerHTML = flow.name;

        $flow.appendChild($name);
        $flow.style.backgroundColor = themedata.objects.flow.backgroundColor;
        $flow.style.color = themedata.objects.flow.textColor;
      });
    } else {
      $flows.style.visibility = 'hidden';
      $flows.style.height = '0';
      $flows.style.marginBottom = '0';
    }
  }

  function renderDevices(devices) {
    $devicesInner.innerHTML = '';
    devices.forEach(function(device) {
      if (!device.ready) {return}
      var $deviceElement = document.createElement('div');
      
      $deviceElement.id = 'device:' + device.id;
      $deviceElement.style.backgroundColor = themedata.objects.action.inactive_backgroundColor;
      $deviceElement.style.color = themedata.objects.action.inactive_textColor;
      

      
      $deviceElement.classList.add('device');
      $deviceElement.classList.toggle('on', device.capabilitiesObj && device.capabilitiesObj[device.ui.quickAction] && device.capabilitiesObj[device.ui.quickAction].value === true);
      
      if ( device.capabilitiesObj && device.capabilitiesObj.button ) {
        $deviceElement.classList.toggle('on', true)
      }
      if ($deviceElement.classList.contains("on")){
        $deviceElement.style.backgroundColor = themedata.objects.action.backgroundColor;
        $deviceElement.style.color = themedata.objects.action.textColor;
      }
      $devicesInner.appendChild($deviceElement);

      if (device.capabilitiesObj && device.capabilitiesObj.alarm_generic && device.capabilitiesObj.alarm_generic.value ||
        device.capabilitiesObj && device.capabilitiesObj.alarm_motion && device.capabilitiesObj.alarm_motion.value ||
        device.capabilitiesObj && device.capabilitiesObj.alarm_contact && device.capabilitiesObj.alarm_contact.value ||
        device.capabilitiesObj && device.capabilitiesObj.alarm_vibration && device.capabilitiesObj.alarm_vibration.value ||
        device.capabilitiesObj && device.capabilitiesObj.alarm_water && device.capabilitiesObj.alarm_water.value ||
        device.capabilitiesObj && device.capabilitiesObj.alarm_co && device.capabilitiesObj.alarm_co.value ||
        device.capabilitiesObj && device.capabilitiesObj.alarm_heat && device.capabilitiesObj.alarm_heat.value ||
        device.capabilitiesObj && device.capabilitiesObj.alarm_smoke && device.capabilitiesObj.alarm_smoke.value  
        ) {
          $deviceElement.classList.add('alarm')
        }

  
    if ( device.capabilitiesObj && device.capabilitiesObj.homealarm_state ){
      if ( device.capabilitiesObj.homealarm_state.value == "disarmed" ){
        $deviceElement.classList.toggle('disarmed',  true);
        
      } else {
        $deviceElement.classList.toggle('disarmed', false);
      }
    }
    if ( device.capabilitiesObj && device.capabilitiesObj.homealarm_state ){
      if ( device.capabilitiesObj.homealarm_state.value == "armed" ){
        $deviceElement.classList.toggle('armed', true);	
        
        } else {
        $deviceElement.classList.toggle('armed', false);
      }
    }
    if ( device.capabilitiesObj && device.capabilitiesObj.homealarm_state ){
      if ( device.capabilitiesObj.homealarm_state.value == "partially_armed" ){
        $deviceElement.classList.toggle('partially', true);	
        
        
        } else {
        $deviceElement.classList.toggle('partially', false);
        
      }
      //Click-Event for Icon for changing mode on touch/click
      $deviceElement.addEventListener('click', function() {
        if (audioclic_state === "true"){
          audioclic.play();
        }
        if ( nameChange ) { return } // No click when shown capability just changed
        if ( longtouch ) {return} // No click when longtouch was performed
        if ( device.capabilitiesObj.homealarm_state.value == "partially_armed" ){
          $deviceElement.classList.toggle('armed', true);
          homey.devices.setCapabilityValue({
            deviceId: device.id,
            capabilityId: 'homealarm_state',
            value: 'armed',
          }).catch(console.error);
      
        }
        if ( device.capabilitiesObj.homealarm_state.value == "armed" ){
          $deviceElement.classList.toggle('disarmed', true);
          homey.devices.setCapabilityValue({
            deviceId: device.id,
            capabilityId: 'homealarm_state',
            value: 'disarmed',
          }).catch(console.error);
        }
        if ( device.capabilitiesObj.homealarm_state.value == "disarmed" ){
          $deviceElement.classList.toggle('partially', false);
          homey.devices.setCapabilityValue({
            deviceId: device.id,
            capabilityId: 'homealarm_state',
            value: 'partially_armed',
          }).catch(console.error);
        }
      });
      //register eventhandler for mode change
      device.makeCapabilityInstance('homealarm_state', function(value){
        var $deviceElement = document.getElementById('device:' + device.id);
        if( $deviceElement ) {
          if ( device.capabilitiesObj.homealarm_state.value == "disarmed" ){
            $deviceElement.classList.toggle('disarmed', true);
          } else {
            $deviceElement.classList.toggle('disarmed', false);
          }
        }
          if( $deviceElement ) {
            if ( device.capabilitiesObj.homealarm_state.value == "armed" ){
              $deviceElement.classList.toggle('armed', true);
            } else {
              $deviceElement.classList.toggle('armed', false);
            }
          }
          if( $deviceElement ) {
            if ( device.capabilitiesObj.homealarm_state.value == "partially_armed" ){
              $deviceElement.classList.toggle('partially', true);
            } else {
              $deviceElement.classList.toggle('partially', false);
            }
          }
        });
      }

      if ( device.capabilitiesObj && device.capabilitiesObj.flora_measure_moisture ) {
        var moisture = device.capabilitiesObj.flora_measure_moisture.value
        //console.log(moisture)
        if ( moisture < 15 || moisture > 65 ) {
          //console.log("moisture out of bounds")
          $deviceElement.classList.add('alarm')
          //selectValue(device, $element)
          //selectIcon($element, $element.id, device, device.capabilitiesObj['flora_measure_moisture'])
        }
      }

      if ( device.capabilitiesObj && device.capabilitiesObj.measure_co2) {
        var co2 = device.capabilitiesObj.measure_co2.value
        //console.log(co2)
        if ( co2 > 1500 || co2 > 2000 ) {
          //console.log("co2 out of bounds")
          $deviceElement.classList.add('high')
        }else{
          $deviceElement.classList.remove('high')
           //selectValue(device, $element)
          //selectIcon($element, $element.id, device, device.capabilitiesObj['flora_measure_moisture'])
        }
      }
        if ( device.capabilitiesObj && device.capabilitiesObj.measure_co2) {
          var co2 = device.capabilitiesObj.measure_co2.value
          //console.log(co2)
        if ( co2 > 900 || co2 > 1400 ) {
          //console.log("co2 out of bounds")
          $deviceElement.classList.add('mid')
        }else{
          $deviceElement.classList.remove('mid')
           //selectValue(device, $element)
          //selectIcon($element, $element.id, device, device.capabilitiesObj['flora_measure_moisture'])
        }
     }
      
        if ( device.capabilitiesObj && device.capabilitiesObj.measure_co2) {
          var co2 = device.capabilitiesObj.measure_co2.value
          //console.log(co2)
        if ( co2 > 200 || co2 > 400 ) {
          //console.log("co2 out of bounds")
          $deviceElement.classList.add('low')
        }else{
          $deviceElement.classList.remove('low')
           //selectValue(device, $element)
          //selectIcon($element, $element.id, device, device.capabilitiesObj['flora_measure_moisture'])
         } 
        }
   

      if ( device.capabilitiesObj && device.capabilitiesObj.alarm_connected ) {
        if ( device.capabilitiesObj.alarm_connected.value ) {
          $deviceElement.classList.remove('away')
        } else {
          $deviceElement.classList.add('away')
        }
      }

      if ( device.capabilitiesObj && device.capabilitiesObj.alarm_night ) {
        if ( device.capabilitiesObj.alarm_night.value ) {
          $deviceElement.classList.remove('day')
        } else {
          $deviceElement.classList.add('day')
        }
      }

      var $icon = document.createElement('div');
      $icon.id = 'icon:' + device.id
      $icon.classList.add('icon');
      if ( device.iconObj ) {
        $icon.style.webkitMaskImage = 'url(https://icons-cdn.athom.com/' + device.iconObj.id + '-128.png)';
      } else if ( device.icon ) {
        $icon.style.webkitMaskImage ='url(./static/img/capabilities/blank.png)';
      }
      if ( device.name == "Bier" || device.name == "Bier temperatuur" ) {
        $icon.style.webkitMaskImage = 'url(./static/img/capabilities/beer.png)';
        $icon.style.backgroundImage = 'url(./static/img/capabilities/beer.png)';
        $icon.style.backgroundSize = 'contain'
      }

      $deviceElement.appendChild($icon);

      var $iconCapability = document.createElement('div');
      $iconCapability.id = 'icon-capability:' + device.id
      $iconCapability.classList.add('icon-capability');
      $iconCapability.style.webkitMaskImage ='url(./static/img/capabilities/blank.png)';
      $deviceElement.appendChild($iconCapability);

      if ( device.capabilitiesObj ) {
        itemNr = 0
        for ( item in device.capabilitiesObj ) {
          capability = device.capabilitiesObj[item]
          if ( capability.type == "number"  ) {
            var $value = document.createElement('div');
            $value.id = 'value:' + device.id + ':' + capability.id;
            $value.title = capability.title
            $value.style.color = themedata.objects.action.inactive_textColor;
            if ($deviceElement.classList.contains("on")){
              $value.style.color = themedata.objects.action.textColor;
            }
            $value.classList.add('value');
            selectIcon($value, getCookie(device.id), device, capability)
            renderValue($value, capability.id, capability.value, capability.units)
            if (device.name=="Bier") {renderValue($value, capability.id, capability.value, "")}
            $deviceElement.appendChild($value)
            itemNr =itemNr + 1

          } else 
          if ( capability.id == "locked" ) {
            var $lock = document.createElement('div');
            $lock.id = 'lock:' + device.id
            $lock.title = capability.title
            $lock.classList.add('icon-capability-lock');
            if ( device.capabilitiesObj.locked.value ) {
              $lock.classList.add('locked');
            } else {
              $lock.classList.add('unlocked');
            }
            $deviceElement.appendChild($lock)
            itemNr =itemNr + 1
          }
        }
        if ( itemNr > 0 ) {
          // start touch/click functions
          $deviceElement.addEventListener('touchstart', function(event) {
            deviceStart($deviceElement, device, event)
          });
          $deviceElement.addEventListener('mousedown', function(event) {
            deviceStart($deviceElement, device, event)
          });

          // stop touch/click functions
          $deviceElement.addEventListener('touchend', function() {
            deviceStop($deviceElement)
          });
          $deviceElement.addEventListener('mouseup', function() {
            deviceStop($deviceElement)
          });
        }

        if ( device.capabilitiesObj[device.ui.quickAction] ) {
          if( itemNr == 0 ) {
            // Touch functions
            $deviceElement.addEventListener('touchstart', function() {
              $deviceElement.classList.add('push')
            });
            $deviceElement.addEventListener('touchend', function() {
              $deviceElement.classList.remove('push')
            });
            // Mouse functions
            $deviceElement.addEventListener('mousedown', function() {
              $deviceElement.classList.add('push')
            });
            $deviceElement.addEventListener('mouseup', function() {
              $deviceElement.classList.remove('push')
            });
          }

          $deviceElement.addEventListener('click', function() {
            if (audioclic_state === "true"){
              audioclic.play();
            }
            if ( nameChange ) { return } // No click when shown capability just changed
            if ( longtouch ) {return} // No click when longtouch was performed
            var value = !$deviceElement.classList.contains('on');
            if ( device.capabilitiesObj && device.capabilitiesObj.onoff ) {
              $deviceElement.classList.toggle('on', value);
            }
            homey.devices.setCapabilityValue({
              deviceId: device.id,
              capabilityId: device.ui.quickAction,
              value: value,
            }).catch(console.error);
          });
        }
      }

      var $nameElement = document.createElement('div');
      $nameElement.id = 'name:' + device.id
      $nameElement.classList.add('name');
      $nameElement.innerHTML = device.name;
      $nameElement.style.color = themedata.objects.action.inactive_textColor;
      if ($deviceElement.classList.contains("on")){
        $nameElement.style.color = themedata.objects.action.textColor;
      }
      
      $deviceElement.appendChild($nameElement);
    });
  }

// New code start    
  function deviceStart($deviceElement, device, event) {
    if ( nameChange ) { return }
    longtouch = false;
    $deviceElement.classList.add('startTouch')
         
    timeout = setTimeout(function() {
      if ( $deviceElement.classList.contains('startTouch') ) {
        ////console.log("first timeout");
        longtouch = true;
        showSecondary(device, event);
      }
    }, 300)
    timeout2 = setTimeout(function() {
      if ( $deviceElement.classList.contains('startTouch') ) {
        ////console.log("second timeout");
        longtouch = true;
        $deviceElement.classList.add('push-long');
        hideSecondary(device);
        valueCycle(device);
      }
    }, 900)
  }

  function deviceStop($deviceElement) {
    timeout = setTimeout(function() {
      longtouch = false;
    },100)
    $deviceElement.classList.remove('startTouch')
  }
// New code end

  function renderText() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    var currentTime = hours + ":" + minutes + ":" + seconds;

    var tod;
    if( hours >= 18 ) {
      tod = texts.text.evening;
    } else if( hours >= 12 ) {
      tod = texts.text.afternoon;
    } else if( hours >= 6 ) {
      tod = texts.text.morning;
    } else {
      tod = texts.text.night;
    }

    if ( showTime ) {
      $textLarge.innerHTML = currentTime
    } else {
      if (appSettings.showusername != "false"){
      $textLarge.innerHTML = texts.text.good + tod + ' ' + appSettings.username + ' !' ;
    }else{
      $textLarge.innerHTML = texts.text.good + tod + ' !' ;
    }
    }
    $textSmall.innerHTML = texts.text.today + moment(now).format(' D MMMM YYYY ');
  }

  function renderValue ($value, capabilityId, capabilityValue, capabilityUnits) {
    if ( capabilityUnits == null ) { capabilityUnits = "" }
    if ( capabilityUnits == "W/m^2" ) { capabilityUnits = "W/m²" }
    if ( capabilityValue == null ) { capabilityValue = "-" }
    if (capabilityId == "measure_temperature" ||
        capabilityId == "target_temperature" ||
        capabilityId == "measure_humidity"
        ) {
      capabilityValue = Math.round(capabilityValue*10)/10
      //var integer = Math.floor(capabilityValue)
      var integer = parseInt(capabilityValue)
      n = Math.abs(capabilityValue)
      var decimal = Math.round((n - Math.floor(n))*10)/10 + "-"
      var decimal = decimal.substring(2,3)

      $value.innerHTML = integer + "<span id='decimal'>" + decimal + capabilityUnits.substring(0,1) + "</span>"
    } else if ( capabilityId == "measure_pressure" ) {
      $value.innerHTML = Math.round(capabilityValue) + "<br /><sup>" + capabilityUnits + "</sup>"
    } else if ( capabilityId == "dim" || capabilityId == "volume_set") {
      $value.innerHTML = Math.round(capabilityValue*100) + "<br /><sup>" + capabilityUnits + "</sup>"
    } else {
      $value.innerHTML = capabilityValue + "<br /><sup>" + capabilityUnits + "</sup>"
    }
  }

  function renderName(device, elementToShow) {
    nameElement = document.getElementById('name:' + device.id)
    deviceElement = document.getElementById('device:' + device.id)
    if ( !nameChange ) {
      currentName = nameElement.innerHTML;
    }
    nameChange=true;
    nameElement.classList.add('highlight')
    nameElement.innerHTML = elementToShow.title
    setTimeout( function(){
      nameChange = false;
      nameElement.innerHTML = currentName
      nameElement.classList.remove('highlight')
      deviceElement.classList.remove('push-long')
    }, 1000);
  }

  function setBrightness(brightness) {
    // brightness = brightness/100
    // //if ( brightness < 0.01) { brightness = 0.01}
    // $container.style.opacity = brightness
    //   var style = styleElem.innerHTML
    //   oldStyle = style.split(";")
    //   newStyle = ""
    //   for (i=0; i < 9 ;i++) {
    //       newStyle = newStyle + oldStyle[i] +";"
    //   }
    //   var backgroundOpacity = appSettings.backgroundopacity
    //   var newOpacity = backgroundOpacity * brightness
    //   //if ( newOpacity < 0.01 ) { newOpacity = 0.01 }
    //   newStyle = newStyle + " opacity: " + newOpacity + ";}"
    //   styleElem.innerHTML = newStyle
  }

  function selectValue(device, elementToShow) {
    for ( item in device.capabilitiesObj ) {
      capability = device.capabilitiesObj[item]
      if ( capability.type == "number"  ) {
        searchElement = document.getElementById('value:' + device.id + ':' + capability.id)
        if ( searchElement.classList.contains('visible') ) {
          searchElement.classList.remove('visible')
          searchElement.classList.add('hidden')
        }
      }
    }
    elementToShow.classList.remove('hidden')
    elementToShow.classList.add('visible')
    renderName(device,elementToShow)
  }

  function selectIcon($value, searchFor, device, capability) {
    // measure_uv and measure_solarradiation icons are broken at icons-cdn.athom.com
    if ( capability.iconObj && capability.id != "measure_uv" && capability.id != "measure_solarradiation" ) {
      iconToShow = 'https://icons-cdn.athom.com/' + capability.iconObj.id + '-128.png'
    } else {
      iconToShow = './static/img/capabilities/' + capability.id + '.png'
    }
    if (device.name == "Bier") {iconToShow = './static/img/capabilities/tap.png'}
    $icon = document.getElementById('icon:'+device.id);
    $iconcapability = document.getElementById('icon-capability:'+device.id);
    if ( $value.id == searchFor ) {
      $value.classList.add('visible')
      $icon.style.opacity = 0.1
      if (device.name == "Bier" || device.name == "Bier temperatuur") { $icon.style.opacity = 0.5}
      $iconcapability.style.webkitMaskImage = 'url(' + iconToShow + ')';
      $iconcapability.style.visibility = 'visible';
    } else {
      $value.classList.add('hidden')
    }
  }

  function renderSettingsPanel() {
    $sliderpanel.style.display = "none"
    if ( !$settingsiframe ) {
      var $settingsiframe = document.createElement('iframe')
      $settingsiframe.id = "settings-iframe"
      $settingsiframe.src = "settings"
      $settingspanel.appendChild($settingsiframe)
    }

    var $buttonssettings = document.createElement('div')
    $buttonssettings.id = "buttons-settings"
    $settingspanel.appendChild($buttonssettings)

    var $savesettings = document.createElement('a')
    $savesettings.id = "save-settings"
    $savesettings.classList.add("btn")
    $buttonssettings.appendChild($savesettings)
    $savesettings.innerHTML = "save"

    var $cancelsettings = document.createElement('a')
    $cancelsettings.id = "save-settings"
    $cancelsettings.classList.add("btn")
    $buttonssettings.appendChild($cancelsettings)
    $cancelsettings.innerHTML = "cancel"



    $savesettings.addEventListener('click', function() {
      if (audioclic_state === "true"){
        audioclic.play();
      }
    saveSettings();
    })

    $cancelsettings.addEventListener('click', function() {
      if (audioclic_state === "true"){
        audioclic.play();
      }
      cancelsettings();
    })

    $settingspanel.style.visibility = "visible"

    $containerinner.classList.add('container-dark');
  }


  function renderThemePanel() {
    $sliderpanel.style.display = "none"
    if ( !$themeiframe ) {
      var $themeiframe = document.createElement('iframe')
      $themeiframe.id = "theme-iframe"
      $themeiframe.src = "theme"
      $themepanel.appendChild($themeiframe)
    }

    var $buttonstheme = document.createElement('div')
    $buttonstheme.id = "buttons-theme"
    $themepanel.appendChild($buttonstheme)

    var $savestheme = document.createElement('a')
    $savestheme.id = "save-theme"
    $savestheme.classList.add("btn")
    $buttonstheme.appendChild($savestheme)
    $savestheme.innerHTML = "save"

    var $canceltheme = document.createElement('a')
    $canceltheme.id = "save-theme"
    $canceltheme.classList.add("btn")
    $buttonstheme.appendChild($canceltheme)
    $canceltheme.innerHTML = "cancel"



    $savestheme.addEventListener('click', function() {
      if (audioclic_state === "true"){
        audioclic.play();
      }
    savetheme();
    })

    $canceltheme.addEventListener('click', function() {
      if (audioclic_state === "true"){
        audioclic.play();
      }
      canceltheme();
    })

    $themepanel.style.visibility = "visible"

    $containerinner.classList.add('container-dark');
  }


  function saveSettings() {
    var all_datas = {
      "lang": iframesettings.newlanguage,
      "outdoortemperature": iframesettings.newoutdoortemperature,
      "indoortemperature": iframesettings.newindoortemperature,
      "order": iframesettings.neworder,
      "homeydashdevicebrightness": iframesettings.newhomeydashdevicebrightness,
      "version": "1.0.0"
  }

    $.ajax({
      type: 'POST',
      url: '/save_settings',
      data: all_datas,
      timeout: 3000,
      success: function(data){
  
      },
      error: function(){
      }
    });

    location.assign(location.protocol + "//" + location.host + location.pathname  + "?format="+iframesettings.newformat)
        //location.assign(location.protocol + "//" + location.host + location.pathname + "?theme="+iframesettings.newtheme+"&lang="+iframesettings.newlanguage+"&token="+iframesettings.token+"&background="+encodeURIComponent(iframesettings.urlbackground)+"&logo="+encodeURIComponent(iframesettings.urllogo))
  }


  function savetheme() {
    var multitheme = 0;
    var bg_type = "";

    if (iframetheme.bg_type !="colors"){
      bg_type = iframetheme.background_progress;
    }


    var all_datas = {
      "theme": iframetheme.newtheme_select,
      "interval_bg": iframetheme.intervalbg,
      "backgroundopacity": iframetheme.opacitybackground,
      "showtime": iframetheme.newshowTime,
      "showusername": iframetheme.newshowUsername,
      "activ_audio_open": iframetheme.activ_audio_open,
      "activ_audio_clic": iframetheme.activ_audio_clic,
      "zoom": iframetheme.newZoom,
      "background_progress" : bg_type
  }

    $.ajax({
      type: 'POST',
      url: '/save_theme',
      data: all_datas,
      timeout: 3000,
      success: function(data){
        location.reload()
      },
      error: function(){
      }
    });

    
        //location.assign(location.protocol + "//" + location.host + location.pathname + "?theme="+iframesettings.newtheme+"&lang="+iframesettings.newlanguage+"&token="+iframesettings.token+"&background="+encodeURIComponent(iframesettings.urlbackground)+"&logo="+encodeURIComponent(iframesettings.urllogo))
  }

  function cancelsettings() {
    $settingspanel.style.visibility = "hidden"
    $containerinner.classList.remove('container-dark');

    //$settingspanel.removeChild($settingsiframe)
    //$settingsiframe = null
    //location.reload(true)
  }

  function canceltheme() {
    $themepanel.style.visibility = "hidden"
    $containerinner.classList.remove('container-dark');

    //$settingspanel.removeChild($settingsiframe)
    //$settingsiframe = null
    //location.reload(true)
  }

  function showSecondary(device, event) {
    var showSlider = false
    var xpos
    try {
      //xpos = event.touches[0].clientX
      xpos = Math.round( 25 + ( parseInt((event.touches[0].clientX - 25)/(163*zoom) ) * (163*zoom) ) )
    }
    catch(err) {
      if ( format == "web" ) { 
        xpos = event.clientX - event.offsetX
      } else {
        xpos = Math.round( 25 + ( parseInt((event.clientX - 25)/(163*zoom) ) * (163*zoom) ) )
      }
      /*
      console.log( event.clientX - event.offsetX )
      console.log( event.clientX )
      console.log( zoom )
      console.log( (event.clientX-25)/163/zoom )
      console.log( parseInt((event.clientX-25)/(163*zoom)) )
      console.log( Math.round( 25 + ( parseInt((event.clientX-25)/(163*zoom) ) * (163*zoom) ) ) )
      */
    }

    var newX = xpos + (150*zoom) + 5
    if ( newX + window.innerWidth* 0.35 > window.innerWidth ) {
      var newX = (xpos - (0.35 * window.innerWidth)) - 13
    }

    $sliderpanel.style.left = newX  + "px"
    $slidericon.style.webkitMaskImage = 'url(https://icons-cdn.athom.com/' + device.iconObj.id + '-128.png)';
    $slidername.innerHTML = device.name

    if ( device.capabilitiesObj && device.capabilitiesObj.dim || device.capabilitiesObj && device.capabilitiesObj.volume_set ) {
      $slider.min = 0
      $slider.max = 100
      $slider.step = 1
      sliderUnit = " %"
      if ( device.capabilitiesObj.dim ) {
        $slidercapability.style.webkitMaskImage = 'url(./static/img/capabilities/dim.png)';
        $slider.value = device.capabilitiesObj.dim.value*100
      } else if ( device.capabilitiesObj.volume_set ) {
        $slidercapability.style.webkitMaskImage = 'url(./static/img/capabilities/volume_set.png)';
        $slider.value = device.capabilitiesObj.volume_set.value*100
      }
      $slidervalue.innerHTML = $slider.value + sliderUnit
      showSlider = true
    } else if ( device.capabilitiesObj && device.capabilitiesObj.target_temperature ) {
      $slider.min = device.capabilitiesObj.target_temperature.min
      $slider.max = device.capabilitiesObj.target_temperature.max
      $slider.step = device.capabilitiesObj.target_temperature.step
      $slidercapability.style.webkitMaskImage = 'url(./static/img/capabilities/target_temperature.png)';
      sliderUnit = "°"
      $slider.value = device.capabilitiesObj.target_temperature.value
      $slidervalue.innerHTML = $slider.value + sliderUnit
      showSlider = true
    }
    if ( showSlider ) {
      $sliderpanel.style.display = "block"
      selectedDevice = device
    }
  }

  function hideSecondary() {
    $sliderpanel.style.display = "none"

  }

  $slider.oninput = function() {
    $slidervalue.innerHTML = $slider.value + sliderUnit
    if ( slideDebounce ) {return}
    slideDebounce = true
    var newCapabilityValue
    var newCapabilityId
    setTimeout( function () {
      if ( selectedDevice.capabilitiesObj && selectedDevice.capabilitiesObj.dim ) {
        newCapabilityId = 'dim'
        newCapabilityValue = ($slider.value/100)
      } else if ( selectedDevice.capabilitiesObj && selectedDevice.capabilitiesObj.volume_set ) {
        newCapabilityId = 'volume_set'
        newCapabilityValue = ($slider.value/100)
      } else if ( selectedDevice.capabilitiesObj && selectedDevice.capabilitiesObj.target_temperature ) {
        newCapabilityId = 'target_temperature'
        newCapabilityValue = ($slider.value/1)
      }
      //console.log(newCapabilityId)
      homey.devices.setCapabilityValue({
        deviceId: selectedDevice.id,
        capabilityId: newCapabilityId,
        value: newCapabilityValue,
      }).catch(console.error);
      slideDebounce = false
    },200)
    
  }

  function valueCycle(device) {
    var itemMax = 0
    var itemNr = 0
    var showElement = 0
    for ( item in device.capabilitiesObj ) {
      capability = device.capabilitiesObj[item]
      if ( capability.type == "number") {
        itemMax = itemMax + 1
      }
    }
    for ( item in device.capabilitiesObj ) {
      capability = device.capabilitiesObj[item]
      if ( capability.type == "number" ) {
        if (
            capability.id == "light_temperature" ||
            capability.id == "light_saturation" ||
            capability.id == "light_hue"
            ) {
          continue;
        }
        searchElement = document.getElementById('value:' + device.id + ':' + capability.id)
        if ( itemNr == showElement ) {
          elementToShow = searchElement
          capabilityToShow = capability.id
          // measure_uv and measure_solarradiation icons are broken at icons-cdn.athom.com
          if ( capability.iconObj && capability.id != "measure_uv" && capability.id != "measure_solarradiation" ) {
          //if ( capability.iconObj ) {
            iconToShow = 'https://icons-cdn.athom.com/' + capability.iconObj.id + '-128.png'
            //console.log(iconToShow)
          } else {
            iconToShow = './static/img/capabilities/' + capability.id + '.png'
          }
          if (device.name == "Bier") {iconToShow = './static/img/capabilities/tap.png'}
          itemNrVisible = itemNr
        }
        if ( searchElement.classList.contains('visible') ) {
          searchElement.classList.remove('visible')
          searchElement.classList.add('hidden')
          currentElement = itemNr
          showElement = itemNr + 1
        }
        itemNr = itemNr + 1
      }
    }
    $icon = document.getElementById('icon:'+device.id);
    $iconcapability = document.getElementById('icon-capability:'+device.id);
    if ( showElement != itemNr ) {
      elementToShow.classList.remove('hidden')
      elementToShow.classList.add('visible')
      renderName(device,elementToShow)
      setCookie(device.id,elementToShow.id,12)
      $icon.style.opacity = 0.1
      if (device.name == "Bier" || device.name == "Bier temperatuur") {$icon.style.opacity = .5}
      $iconcapability.style.webkitMaskImage = 'url(' + iconToShow + ')';
      $iconcapability.style.visibility = 'visible';
    } else {
      setCookie(device.id,"-",12)
      $icon.style.opacity = 1
      $iconcapability.style.visibility = 'hidden';
      deviceElement = document.getElementById('device:' + device.id)
      nameChange=true;
      setTimeout( function(){
        nameChange = false;
        deviceElement.classList.remove('push-long')
      }, 1000);
    }
  }

  function calculateTOD() {
    var d = new Date();
    var m = d.getMinutes();
    var h = d.getHours();
    if(h == '0') {h = 24}

    var currentTime = h+"."+m;
    var time = sunrise.split(":");
    var hour = time[0];
    if(hour == '00') {hour = 24}
    var min = time[1];
    var sunriseTime = hour+"."+min;

    var time = sunset.split(":");
    var hour = time[0];
    if(hour == '00') {hour = 24}
    var min = time[1];
    var sunsetTime = hour+"."+min;

    if ( parseFloat(currentTime,10) < parseFloat(sunriseTime,10)  ) {
      tod = 1;
      dn = "n";
    }
    else if ( parseFloat(currentTime,10) < parseFloat(sunsetTime,10) ) {
      tod = 2;
      dn = "";
    } else {
      tod = 3;
      dn = "n";
    }
  }}
  
}
  );
