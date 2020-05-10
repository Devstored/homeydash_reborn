var newoutdoortemperature
var newindoortemperature
var newhomeydashdevicebrightness
var nohomeybrightnessdevice
var newlanguage
var newtheme
var neworder
var token
var urlbackground
var opacitybackground
var blurbackground
var ulrbackgrounderror
var urllogo
var urllogoerror
var newshowTime
var newshowUsername
var newZoom
var $styleElem
var $content
var $settingspanel
var homey
var carousel
var intervalbg;
var updateBackground;
var activ_audio_clic;
var activ_audio_open;
var bg_type;
var background_progress;


//THEME
var newtheme_select = parent.appSettings;
var $themepanel
var multitheme
var appSettings = parent.appSettings;
var themedata_index = parent.themedata;

window.addEventListener('load', function () {
    var $version = document.getElementById('version');
    $version.innerHTML = "HomeyDash Reborn :" + parent.version



    $styleElem = parent.styleElem
    $content = parent.$content
    $settingspanel = parent.$settingspanel
    homey = parent.homey

    //THEME 
    $themepanel = parent.$themepanel
    //newtheme_select = parent.theme

    var prevLogo;



    var $opacitybackground = document.getElementById("opacity-background");
    var $switchshowtime = document.getElementById('switch-show-time');
    var $switchshowusername = document.getElementById('switch-show-username');
    var $zoomcontent = document.getElementById('zoom-content');

    var $switchaudioclic = document.getElementById('switch-audio-clic');
    var $switchaudioopen = document.getElementById('switch-audio-open');



    //var $preview = document.getElementById('preview');

    //THEME
    var $bodysettings = document.getElementById('body-theme');
    var $select_theme = document.getElementById('theme-theme-select');
    //header_icons
    var $icon_prev_logo = document.getElementById('icon_prev_logo');
    var $icon_prev_settings = document.getElementById('icon_prev_settings');
    var $icon_prev_theme = document.getElementById('icon_prev_theme');
    var $icon_prev_information = document.getElementById('icon_prev_information');
    var $icon_prev_notification = document.getElementById('icon_prev_notification');
    var $icon_prev_battery = document.getElementById('icon_prev_battery');
    var $icon_prev_new_version = document.getElementById('icon_prev_new_version');
    //background
    var $backgroundColor = document.getElementById('content');
    //button
    var $action_device = document.getElementById('action_device');
    var $action_device_inactive = document.getElementById('action_device_inactive');
    var $action_device_inactive_name = document.getElementById('flow_device_inactive_name');
    var $action_device_name = document.getElementById('action_device_name');
    //alarm
    var $alarm_device = document.getElementById('alarm_device');
    var $alarm_device_value = document.getElementById('alarm_device_value');
    var $alarm_device_name = document.getElementById('alarm_device_name');
    var $alarm_device_schedule = document.getElementById('alarm_device_schedule');
    //alarm inactive
    var $alarm_device_inactive = document.getElementById('alarm_device_inactive');
    var $alarm_device_inactive_value = document.getElementById('alarm_device_inactive_value');
    var $alarm_device_inactive_name = document.getElementById('alarm_device_inactive_name');
    var $alarm_device_inactive_schedule = document.getElementById('alarm_device_inactive_schedule');
    //flow
    var $flow_device = document.getElementById('flow_device');
    var $flow_device_name = document.getElementById('flow_device_name');
    //information
    var $theme_autor = document.getElementById('theme_autor');
    var $homey_profil = document.getElementById('homey_profil');
    var $theme_created = document.getElementById('theme_created');
    var $theme_version = document.getElementById('theme_version');
    var $theme_compatibility = document.getElementById('theme_compatibility');

    //button delete
    var $btndeletetheme = document.getElementById('btn-delete-theme');

    //button play audio
    var $btnplaythemeopen = document.getElementById('btn-play-theme-open');
    var $btnplaythemeclic = document.getElementById('btn-play-theme-clic');

    //button validate
    var $btnvalidatetheme = document.getElementById('btn-validate-theme');
    var $themefile = document.getElementById('themefile');

    //interval_bg
    var $interval_bg = document.getElementById('theme_interval_time');

    //Text
    var $prev_text = document.getElementById('prev_text');



    //DETECT OBJECT
    //document.getElementById('settings-language-title').innerHTML = parent.texts.settings.title.language;
    //document.getElementById('settings-theme-title').innerHTML = parent.texts.settings.title.theme;

    //$devicebrightnessdescription.innerHTML = parent.texts.settings.title.brightnessdevice;

    document.getElementById('appearance-opacity').innerHTML = parent.texts.theme.appearance.opacity;
    //document.getElementById('appearance-blur').innerHTML = parent.texts.settings.appearance.blur;
    document.getElementById('appearance-clock').innerHTML = parent.texts.theme.appearance.clock;
    document.getElementById('appearance-zoom').innerHTML = parent.texts.theme.appearance.zoom;

    //THEME LANG
    document.getElementById('theme-theme-title').innerHTML = parent.texts.theme.title.theme;
    document.getElementById('theme_autor_translate').innerHTML = parent.texts.theme.information.autor;
    document.getElementById('theme_homeyprofil_translate').innerHTML = parent.texts.theme.information.homeyForumProfil;
    document.getElementById('theme_created_translate').innerHTML = parent.texts.theme.information.createDate;
    document.getElementById('theme_version_translate').innerHTML = parent.texts.theme.information.version;
    document.getElementById('theme_compatible_translate').innerHTML = parent.texts.theme.information.dashVersionMin;
    document.getElementById('theme_interval_translate').innerHTML = parent.texts.theme.title.interval_bg;
    document.getElementById('theme_title_import_translate').innerHTML = parent.texts.theme.title.import;

    document.getElementById('audio_theme_clic_translate').innerHTML = parent.texts.theme.audios.audioclic;
    document.getElementById('audio_theme_open_translate').innerHTML = parent.texts.theme.audios.audioopen;

    document.getElementById('appearance-show-username').innerHTML = parent.texts.theme.appearance.username;

    document.getElementById('appearance-activ_audio_clic').innerHTML = parent.texts.theme.appearance.activ_audio_clic;
    document.getElementById('appearance-activ_audio_open').innerHTML = parent.texts.theme.appearance.activ_audio_open;

    document.getElementById('prev_text').innerHTML = "Hello " + appSettings.username + " !";



    neworder = appSettings.order
    if (neworder == "") {
        neworder = "1,2,3"
    }

    //renderOrdering()



    // $languages.value = newlanguage

    // $languages.addEventListener('change', function() {
    //     newlanguage = $languages.value
    // })




    //THEME
    if (appSettings.theme != "") {
        $select_theme.value = appSettings.theme
        set_preview_theme();

    }

    intervalbg = appSettings.interval_bg;
    $interval_bg.value = intervalbg;

    $select_theme.addEventListener('change', function () {
        set_preview_theme();
    })

    $interval_bg.addEventListener('change', function () {
        intervalbg = $interval_bg.value;
    })

    function set_preview_theme() {
        var i = 0;
        var css = "";

        newtheme_select = $select_theme.value
        previous_theme(newtheme_select, function (themedata) {

            //FONT
            var choice_font = themedata.font
            var family = `${choice_font}`;
            //console.log("font " + family);
            var url = 'https://fonts.googleapis.com/css?family=' + family + ':100,300,400,500,700'
            document.getElementById('link').href = url;
            //console.log(fontUrl);

            cssVAR(family);

            //AUDIO previous
            if (themedata.audios.clic != "") {
                audioclic = themedata.audios.clic
                $btnplaythemeclic.classList.remove('hidden');
                $btnplaythemeclic.style.visibility = 'visible';
            } else {
                audioopen = "";
                $btnplaythemeclic.classList.remove('visible');
                $btnplaythemeclic.style.visibility = 'hidden';
            }
            if (themedata.audios.open != "") {
                audioopen = themedata.audios.open;
                $btnplaythemeopen.classList.remove('hidden');
                $btnplaythemeopen.style.visibility = 'visible';
            } else {
                audioopen = "";
                $btnplaythemeopen.classList.remove('visible');
                $btnplaythemeopen.style.visibility = "hidden";
            }

            //text

            $prev_text.style.color = themedata.all_text_color;

            //header icons
            $icon_prev_logo.style.webkitMaskImage = "url(./static/themes/" + newtheme_select + "/header_icons/" + themedata.header_icons.settings.name + ")";
            $icon_prev_logo.style.background = themedata.header_icons.logo.color;

            $icon_prev_settings.style.webkitMaskImage = "url(./static/themes/" + newtheme_select + "/header_icons/" + themedata.header_icons.settings.name + ")";
            $icon_prev_settings.style.background = themedata.header_icons.settings.color;

            $icon_prev_theme.style.webkitMaskImage = "url(./static/themes/" + newtheme_select + "/header_icons/" + themedata.header_icons.theme.name + ")";
            $icon_prev_theme.style.background = themedata.header_icons.theme.color;

            $icon_prev_information.style.webkitMaskImage = "url(./static/themes/" + newtheme_select + "/header_icons/" + themedata.header_icons.information.name + ")";
            $icon_prev_information.style.background = themedata.header_icons.information.color;

            $icon_prev_notification.style.webkitMaskImage = "url(./static/themes/" + newtheme_select + "/header_icons/" + themedata.header_icons.notification.name + ")";
            $icon_prev_notification.style.background = themedata.header_icons.notification.color;

            $icon_prev_battery.style.webkitMaskImage = "url(./static/themes/" + newtheme_select + "/header_icons/" + themedata.header_icons.battery.name + ")";
            $icon_prev_battery.style.background = themedata.header_icons.battery.color;

            $icon_prev_new_version.style.webkitMaskImage = "url(./static/themes/" + newtheme_select + "/header_icons/" + themedata.header_icons.new_version.name + ")";
            $icon_prev_new_version.style.background = themedata.header_icons.new_version.color;

            $icon_prev_logo.style.webkitMaskImage = "url(./static/themes/" + newtheme_select + "/header_icons/" + themedata.header_icons.logo.name + ")";
            $icon_prev_logo.style.background = themedata.header_icons.logo.color;

            //buttons
            $action_device.style.backgroundColor = themedata.objects.action.backgroundColor;
            $action_device_name.style.color = themedata.objects.action.textColor;

            $action_device_inactive.style.backgroundColor = themedata.objects.action.inactive_backgroundColor;
            $action_device_inactive_name.style.color = themedata.objects.action.inactive_textColor;

            //ALARM
            $alarm_device.style.backgroundColor = themedata.objects.alarm.backgroundColor;
            $alarm_device_value.style.color = themedata.objects.alarm.textColor;
            $alarm_device_name.style.color = themedata.objects.alarm.textColor;
            $alarm_device_schedule.style.color = themedata.objects.alarm.textColor;

            //ALARM INACTIVE
            $alarm_device_inactive.style.backgroundColor = themedata.objects.alarm.inactive_backgroundColor;
            $alarm_device_inactive_value.style.color = themedata.objects.alarm.inactive_textColor;
            $alarm_device_inactive_name.style.color = themedata.objects.alarm.inactive_textColor;
            $alarm_device_inactive_schedule.style.color = themedata.objects.alarm.inactive_textColor;

            $flow_device.style.backgroundColor = themedata.objects.flow.backgroundColor;
            $flow_device_name.style.color = themedata.objects.flow.textColor;

            //information
            //console.log(themedata.themeInfo.autor);
            $theme_autor.textContent = themedata.themeInfo.autor;

            if (themedata.themeInfo.homeyForumProfil != "") {
                $homey_profil.textContent = "Click Me!";
                $homey_profil.href = themedata.themeInfo.homeyForumProfil;
                $homey_profil.target = "_blank";
            } else {
                $homey_profil.textContent = "No Profil";
            }
            $theme_created.textContent = themedata.themeInfo.createDate;
            $theme_version.textContent = themedata.themeInfo.version;
            $theme_compatibility.textContent = themedata.themeInfo.dashVersionMin;


            if (themedata.background.gradientColors.color1 != "" && themedata.background.gradientColors.color2 != "" && themedata.background.gradientColors.color3 != "") {
                //set background color
                bg_type = "colors";
                $interval_bg.value = 0;
                background_progress = "";
                clearInterval(carousel);
                $backgroundColor.style.background = " -webkit-linear-gradient(55deg, " + themedata.background.gradientColors.color1 + " 0%, " + themedata.background.gradientColors.color2 + " 50%, " + themedata.background.gradientColors.color3 + " 100%)";
            } else {
                bg_type = "bg";
                get_all_backgrounds(newtheme_select, function (backgrounds) {
                    if (typeof backgrounds !== "undefined") {
                        background_progress = backgrounds[0];
                        multitheme = backgrounds.length;
                        //console.log("multitheme : " + multitheme);
                        $backgroundColor.style.backgroundImage = "url(./static/themes/" + newtheme_select + "/backgrounds/" + backgrounds[0] + ")";
                        //console.log("./static/themes/" + newtheme_select + "/backgrounds/" + backgrounds[0]);
                        if (backgrounds.length > 1) {
                            $interval_bg.value = 1;
                            intervalbg = $interval_bg.value;
                            carousel = setInterval(function ($) {
                                i = (i > (backgrounds.length - 1)) ? 0 : i;
                                urlbackground = backgrounds[i];
                                $("#content").fadeOut(300, function () { $backgroundColor.style.backgroundImage = "url(./static/themes/" + newtheme_select + "/backgrounds/" + backgrounds[i++] + ")"; $("#content").fadeIn(300); });
                            }, 5000, $);
                        }
                    }

                });
            }
        });
    };

    function cssVAR(str) {
        var root = document.documentElement
        root.style.setProperty('--fam', str);
        return false;
    }




    //Prev audio play
    $btnplaythemeopen.addEventListener('click', function () {
        if (audioopen != "") {
            new Audio('static/themes/' + newtheme_select + '/audios/' + audioopen).play()
        }

    })



    $btnplaythemeclic.addEventListener('click', function () {
        if (audioclic != "") {
            new Audio('static/themes/' + newtheme_select + '/audios/' + audioclic).play()
        }

    })

    //IMPORT THEME FILE
    $themefile.addEventListener('change', function () {
        if ($themefile.files.length != 0) {
            $btnvalidatetheme.style.visibility = 'visible';

        }
    })

    //BUTTON VALIDATE FOR IMPORT THEME FILE
    $btnvalidatetheme.addEventListener('click', function () {

        var form = $('#form_theme_file')[0]
        var fd = new FormData(form)
        //console.log(fd);
        if ($themefile.files.length != 0) {
            $.ajax({
                data: fd,
                contentType: false,
                cache: false,
                processData: false,
                async: false,
                type: 'POST',
                url: '/theme/_import'
            })
                .done(function (data) {
                    if (data.status == true) {
                        //console.log(data.status);
                        //console.log(data.filename);


                        $('#theme-theme-select').append($('<option>', {
                            value: data.filename,
                            text: data.filename
                        }));



                        $('#themefile').val('');
                        $btnvalidatetheme.style.visibility = 'hidden';


                    }
                });
        }

    })

    updateBackground = appSettings.background_progress;
    if (updateBackground != "") {
        showPreview(updateBackground, true)
    }

    //delete theme
    $btndeletetheme.addEventListener('click', function () {
        if (newtheme_select != "undefined") {
            $.ajax({
                data: {
                    theme: newtheme_select,
                },
                type: 'POST',
                url: '/theme/remove'
            })
                .done(function (data) {
                    ////console.log(data.background_list);
                    if (data.status == true) {
                        $("#theme-theme-select option[value='" + newtheme_select + "']").remove();
                        $select_theme.value = "default";
                        set_preview_theme();
                        //console.log(data.status);
                    }
                });
            //console.log(newtheme_select)
        }

    })





    // $btndeletebackground.addEventListener('click', function () {
    //     urlbackground = ""
    //     urlbackgrounderror = false
    //     $urlbackground.value = ""
    //     $urlbackground.style.color = "#000000"
    //     $opacitybackground.value = 50
    //     $opacitybackground.disabled = true
    //     showPreview("", true)
    // })

    opacitybackground = appSettings.backgroundopacity
    if (updateBackground != "") {
        $opacitybackground.value = opacitybackground * 100
    } else {
        $opacitybackground.value = 50
        opacitybackground = 50
    }

    //switch show time
    newshowTime = appSettings.showtime
    newshowTime = (newshowTime == "true") ? true : false;
    $switchshowtime.checked = newshowTime

    $switchshowtime.addEventListener('click', function () {
        newshowTime = $switchshowtime.checked

    })


    //switch show username
    newshowUsername = appSettings.showusername
    newshowUsername = (newshowUsername == "true") ? true : false;
    $switchshowusername.checked = newshowUsername

    $switchshowusername.addEventListener('click', function () {
        newshowUsername = $switchshowusername.checked

    })

    //switch audio open
    activ_audio_open = appSettings.activ_audio_open
    activ_audio_open = (activ_audio_open == "true") ? true : false;
    $switchaudioopen.checked = activ_audio_open

    $switchaudioopen.addEventListener('click', function () {
        activ_audio_open = $switchaudioopen.checked

    })


    //switch audio clic
    activ_audio_clic = appSettings.activ_audio_clic
    activ_audio_clic = (activ_audio_clic == "true") ? true : false;
    $switchaudioclic.checked = activ_audio_clic

    $switchaudioclic.addEventListener('click', function () {
        activ_audio_clic = $switchaudioclic.checked

    })


    newZoom = appSettings.zoom
    $zoomcontent.value = newZoom * 100


    function showPreview(image, background) {
        if (image) {
            if (background) {
                var css = "content: ''; background: url(./static/themes/" + appSettings.theme + "/backgrounds/" + updateBackground + ");"
                css = css + " top: 0; left: 0; bottom: 0; right: 0; position: absolute; z-index: -1; background-size:cover;"
                css = css + " opacity: " + $opacitybackground.value / 100 + ";"
                $styleElem.innerHTML = "#body:after {" + css + "}";
                parent.document.body.style.background = "black"
            } else {
                //var $logo = parent.document.getElementById('logo');
                //prevLogo = $logo.style.backgroundImage
                //$logo.style.backgroundImage = "url('" + image + "')"
            }
        } else {
            if (background) {
                $styleElem.innerHTML = ""
                parent.document.body.style.background = ""
            } else {
                //var $logo = parent.document.getElementById('logo');
                //$logo.style.backgroundImage = prevLogo
            }
        }
    }

    $opacitybackground.oninput = function () {
        if (updateBackground != "") {
            setOpacity(this.value / 100)
        }
    }

    function setOpacity(opacity) {
        var style = $styleElem.innerHTML
        oldStyle = style.split(";")
        newStyle = ""
        for (i = 0; i < 9; i++) {
            newStyle = newStyle + oldStyle[i] + ";"
        }
        newStyle = newStyle + " opacity: " + opacity + ";}"
        $styleElem.innerHTML = newStyle
        opacitybackground = opacity
    }

    $zoomcontent.oninput = function () {
        setZoom(this.value / 100)
    }

    function setZoom(zoom) {
        $content.style.zoom = zoom;
        //console.log("test" + zoom);
        newZoom = zoom
        //document.getElementById('settings-title-theme').innerHTML = zoom
    }

    $zoomcontent.addEventListener('touchstart', function () {
        $bodysettings.style.opacity = 0.5
        $settingspanel.style.opacity = 0.5
    })
    $zoomcontent.addEventListener('touchend', function () {
        setTimeout(function () {
            $bodysettings.style.opacity = 1
            $settingspanel.style.opacity = 1
        }, 200);
    })
    $zoomcontent.addEventListener('mousedown', function () {
        $bodysettings.style.opacity = 0.5
        $settingspanel.style.opacity = 0.5
    })
    $zoomcontent.addEventListener('mouseup', function () {
        setTimeout(function () {
            $bodysettings.style.opacity = 1
            $settingspanel.style.opacity = 1
        }, 200);
    })

    parent.iframetheme = window;
})