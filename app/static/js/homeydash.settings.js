var newoutdoortemperature
var newindoortemperature
var newhomeydashdevicebrightness
var nohomeybrightnessdevice
var newlanguage
var newformat
var neworder
var token
var urlbackground
var opacitybackground
var ulrbackgrounderror
var urllogo
var urllogoerror
var newshowTime
var newZoom
var $styleElem
var $content
var $settingspanel
var homey

var appSettings = parent.appSettings;
var themedata_index = parent.themedata;

window.addEventListener('load', function () {
    var $version = document.getElementById('version');
    $version.innerHTML = "HomeyDash Reborn :" + parent.version

    newoutdoortemperature = parent.outdoortemperature
    newindoortemperature = parent.indoortemperature
    newhomeydashdevicebrightness = parent.homeydashdevicebrightness
    newlanguage = parent.locale
    newformat = parent.format
    token = parent.urltoken
    $styleElem = parent.styleElem
    $content = parent.$content
    $settingspanel = parent.$settingspanel
    homey = parent.homey

    var prevLogo;
    var prevBackground;

    var $bodysettings = document.getElementById('body-settings');
    var $outdoortemperature = document.getElementById('settings-temperature-outdoor-select');
    var $indoortemperature = document.getElementById('settings-temperature-indoor-select');
    var $devicebrightnessdescription = document.getElementById('appearance-device-brightness');
    var $devicebrightnessselect = document.getElementById('settings-device-brightness-select');
    var $languages = document.getElementById('settings-language-select');
    var $formats = document.getElementById('settings-format-select');
    var $row1 = document.getElementById('row1');
    var $row1up = document.getElementById('row1-up');
    var $row1down = document.getElementById('row1-down');
    var $row2 = document.getElementById('row2');
    var $row2up = document.getElementById('row2-up');
    var $row2down = document.getElementById('row2-down');
    var $row3 = document.getElementById('row3');
    var $row3up = document.getElementById('row3-up');
    var $row3down = document.getElementById('row3-down');
    //var $preview = document.getElementById('preview');

    document.getElementById('settings-language-title').innerHTML = parent.texts.settings.title.language;
    document.getElementById('settings-format-title').innerHTML = parent.texts.settings.title.format;
    document.getElementById('appearance-temperature-outdoor').innerHTML = parent.texts.settings.title.temperature.outdoor;
    document.getElementById('appearance-temperature-indoor').innerHTML = parent.texts.settings.title.temperature.indoor;
    $devicebrightnessdescription.innerHTML = parent.texts.settings.title.brightnessdevice;

    //FONT
    var choice_font = themedata_index.font
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

    neworder = appSettings.order
    if (neworder == "") {
        neworder = "1,2,3"
    }

    renderOrdering()

    var $css = document.createElement('link');
    $css.rel = 'stylesheet';
    $css.type = 'text/css';
    $css.href = './static/css/formats/' + newformat + '.settings.css';
    document.head.appendChild($css);

    homey.devices.getDevices().then(function (devices) {
        var temperaturesensors = ""
        var homeydashdevicesbrightness = ""
        nohomeybrightnessdevice = true
        for (item in devices) {
            device = devices[item]
            if (device.ready) {
                if (device.capabilitiesObj.measure_temperature) {
                    temperaturesensors = temperaturesensors + "<option value='" + device.id + "'>" + device.name + "</option>"
                }
                if (device.capabilitiesObj.dim && device.name.substring(0, 10) == "Homeydash-") {
                    homeydashdevicesbrightness = homeydashdevicesbrightness + "<option value='" + device.id + "'>" + device.name + "</option>"
                    // temp code
                    if (device.id == newhomeydashdevicebrightness) {
                        nohomeybrightnessdevice = false
                    }
                    // temp code
                }
            }
        }
        $indoortemperature.innerHTML = "<option value='none'>None</option>" + temperaturesensors
        $outdoortemperature.innerHTML = "<option value='homey'>Homey built-in</option>" + temperaturesensors

        if (homeydashdevicesbrightness != "") {
            $devicebrightnessselect.innerHTML = "<option value='none'>None</option>" + homeydashdevicesbrightness
            $devicebrightnessdescription.classList.remove("hidden")
            $devicebrightnessselect.classList.remove("hidden")
        }
    }).then(function () {
        $indoortemperature.value = newindoortemperature
        $outdoortemperature.value = newoutdoortemperature
        if (nohomeybrightnessdevice) {
            $devicebrightnessselect.value = "none"
        } else {
            $devicebrightnessselect.value = newhomeydashdevicebrightness
        }
    })

    $outdoortemperature.addEventListener('change', function () {
        newoutdoortemperature = $outdoortemperature.value
        //console.log(newoutdoortemperature)
    })

    $indoortemperature.addEventListener('change', function () {
        newindoortemperature = $indoortemperature.value
    })

    $devicebrightnessselect.addEventListener('change', function () {
        newhomeydashdevicebrightness = $devicebrightnessselect.value
    })

    $languages.value = newlanguage

    $languages.addEventListener('change', function () {
        newlanguage = $languages.value
    })

    $formats.value = newformat

    $formats.addEventListener('change', function () {
        newformat = $formats.value
    })



    function renderOrdering() {

        var row = neworder.split(",")

        $row1.style.order = row[0]
        $row2.style.order = row[1]
        $row3.style.order = row[2]

        setArrows()

        $row1up.addEventListener('click', function () {
            if ($row1up.style.opacity == 0.5) { return }
            moveItem(1, "up")
        })
        $row1down.addEventListener('click', function () {
            if ($row1down.style.opacity == 0.5) { return }
            moveItem(1, "down")
        })
        $row2up.addEventListener('click', function () {
            if ($row2up.style.opacity == 0.5) { return }
            moveItem(2, "up")
        })
        $row2down.addEventListener('click', function () {
            if ($row2down.style.opacity == 0.5) { return }
            moveItem(2), "down"
        })
        $row3up.addEventListener('click', function () {
            if ($row3up.style.opacity == 0.5) { return }
            moveItem(3, "up")
        })
        $row3down.addEventListener('click', function () {
            if ($row3down.style.opacity == 0.5) { return }
            moveItem(3, "down")
        })
    }

    function setArrows() {
        //console.log("order: " + neworder)
        var row = neworder.split(",")

        document.getElementById('row' + $row1.style.order + '-up').style.opacity = 1
        document.getElementById('row' + $row2.style.order + '-up').style.opacity = 1
        document.getElementById('row' + $row3.style.order + '-up').style.opacity = 1
        document.getElementById('row' + $row1.style.order + '-down').style.opacity = 1
        document.getElementById('row' + $row2.style.order + '-down').style.opacity = 1
        document.getElementById('row' + $row3.style.order + '-down').style.opacity = 1

        for (i = 1; i < 4; i++) {
            //console.log("i: " + i)
            //console.log("row[" + (i - 1) + "]: " + row[i - 1])
            if (row[i - 1] == 1) {
                //console.log("bovenste regel: " + i)
                document.getElementById('row' + i + '-up').style.opacity = 0.5
            }
            if (row[i - 1] == 3) {
                //console.log("onderste regel: " + i)
                document.getElementById('row' + i + '-down').style.opacity = 0.5
            }
        }
    }

    function moveItem(item, direction) {
        var row = neworder.split(",")
        currentPos = row[item - 1]
        if (direction == "up") {
            newPos = parseInt(row[item - 1]) - 1
        } else {
            newPos = parseInt(row[item - 1]) + 1
        }
        if (row[0] == newPos) { row[0] = currentPos }
        if (row[1] == newPos) { row[1] = currentPos }
        if (row[2] == newPos) { row[2] = currentPos }
        row[item - 1] = newPos
        neworder = row[0] + "," + row[1] + "," + row[2]
        $row1.style.order = row[0]
        $row2.style.order = row[1]
        $row3.style.order = row[2]
        setArrows()
    }

    parent.iframesettings = window;
})