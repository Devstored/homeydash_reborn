#!/usr/bin/python3
import json
import os
import time
from random import randint
import os.path
from os import path
import base64
import shutil
import zipfile
from distutils.dir_util import copy_tree
#from lastversion import lastversion
#from packaging import version

from werkzeug.utils import secure_filename

import requests
from flask import (Flask, Response, flash, jsonify, logging, redirect,
                   render_template, request, send_file, session, url_for)

                   


app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

app.secret_key = os.urandom(24)


# HOME
@app.route('/', methods=['GET', 'POST'])
def index():

  # repo_infos = lastversion.latest("Devstored/homeydash_reborn", output_format='version', pre_ok=True)
  #parsed_info = json.loads(repo_infos)

  #print("toto " + parsed_info)
  #print(repo_infos['version'])
  # if latest_mautic_version >= version.parse('0.9.0'):
  #     print('It is newer')

  return render_template('index.html')


# CONFIG
@app.route('/save_progress_bg', methods=['GET', 'POST'])
def save_bg():

  if request.method == 'POST':
    try:
        with open('static/settings/settings.json', 'r+') as f:
          data = json.load(f)

          data['background_progress'] = request.form.get("background_progress")

          f.seek(0)
          json.dump(data, f, indent=4)
          f.truncate()
          return jsonify(status=True)
    except Exception as e:
      return jsonify(status=False)
  return jsonify(status=False)


# CONFIG
@app.route('/save_config', methods=['GET', 'POST'])
def save_config():

  if request.method == 'POST':
    try:
        with open('static/settings/settings.json', 'r+') as f:
          data = json.load(f)

          data['token'] = request.form.get("token")
          data['username'] = request.form.get("username")
          data['lang'] = request.form.get("lang")
          data['theme'] = request.form.get("theme")

          f.seek(0)
          json.dump(data, f, indent=4)
          f.truncate()
          return jsonify(status=True)
    except Exception as e:
      return jsonify(status=False)
  return jsonify(status=False)

# CONFIG
@app.route('/config', methods=['GET', 'POST'])
def config():

  list_themes = []
  list_languages = []
  relative_path = str(os.path.dirname(os.path.abspath(__file__)))
  theme_path = relative_path + '/static/themes'
  language_path = relative_path + '/static/locales'
  settings_path = relative_path + '/static/settings'
  for directory in os.listdir(theme_path):
    if os.path.isdir(theme_path + "/" + directory):
      list_themes.append(directory)

  for directory in os.listdir(language_path):
    if not directory.startswith('.') and os.path.isfile(language_path + "/" + directory):
      list_languages.append(directory.replace(".json", ""))

  if not os.path.isdir(settings_path):
    os.mkdir(settings_path)
    copy_tree(relative_path + "/static/template/settings", settings_path)

  if not list_themes:
    os.mkdir(theme_path + "/default")
    copy_tree(relative_path + "/static/template/default", theme_path + "/default")



  return render_template('config.html', list_themes=list_themes, list_languages=list_languages)


# previous theme
@app.route('/theme/previous', methods=['POST'])
def theme_previous():
  if request.method == 'POST':
    theme = request.form['theme']
    background_list = []
    if theme:
      relative_path = str(os.path.dirname(os.path.abspath(__file__)))
      path = relative_path + '/static/themes/' + theme + '/backgrounds'
      for directory in os.listdir(path):
        if not directory.startswith('.') and os.path.isfile(path + "/" + directory):
          background_list.append(directory) 
      return jsonify(background_list=background_list)
    else:
      return jsonify({'theme_list' : 'Missing data!'})

  return jsonify({'theme_list' : 'Missing data!'})


# previous theme
@app.route('/theme/remove', methods=['POST'])
def theme_remove():
  if request.method == 'POST':
    theme = request.form['theme']
    if theme:
      relative_path = str(os.path.dirname(os.path.abspath(__file__)))
      path = relative_path + '/static/themes/' + theme
      try:
        shutil.rmtree(path, ignore_errors=True)
        return jsonify(status=True)
      except Exception as e:
        return jsonify(status=False)
    else:
      return jsonify(status=False)

  return jsonify(status=False)


# import theme
@app.route('/theme/_import', methods=['GET', 'POST'])
def theme_import():
  if request.method == 'POST':
    theme_package = request.files['themefile']
    filename = secure_filename(theme_package.filename)
    relative_path = str(os.path.dirname(os.path.abspath(__file__)))
    path = relative_path + '/static/themes'
    all_path = path + "/" + filename
    print(str(filename))
    if not os.path.exists(all_path):
      try:
        theme_package.save(all_path)
        realname = theme_package.filename.split('.')[0]
        with zipfile.ZipFile(theme_package,"r") as zip_ref:
          zip_ref.extractall(path)
        if os.path.exists(all_path):
          os.remove(all_path)
        return jsonify(status=True, filename=realname)
      except Exception as e:
        return jsonify(status=False)
    else:
      return jsonify(status=False)

  return jsonify(status=False)       



    
    



# Theme
@app.route('/theme', methods=['GET', 'POST'])
def theme():
  list_themes = []
  relative_path = str(os.path.dirname(os.path.abspath(__file__)))
  path = relative_path + '/static/themes'
  for directory in os.listdir(path):
    if os.path.isdir(path + "/" + directory):
      list_themes.append(directory)

  return render_template('theme.html', list_themes=list_themes)

#Settings
@app.route('/settings', methods=['GET', 'POST'])
def settings(): 

  return render_template('settings.html')


#Save Settings
@app.route('/save_settings', methods=['POST'])
def save_settings():

  if request.method == 'POST':
    try:
        with open('static/settings/settings.json', 'r+') as f:
          data = json.load(f)
          data['lang'] = request.form.get("lang")
          data['outdoortemperature'] = request.form.get("outdoortemperature")
          data['indoortemperature'] = request.form.get("indoortemperature")
          data['order'] = request.form.get("order")
          data['homeydashdevicebrightness'] = request.form.get("homeydashdevicebrightness")
          data['version'] = request.form.get("version")
          f.seek(0)
          json.dump(data, f, indent=4)
          f.truncate()
          return jsonify(status=True)
    except Exception as e:
      return jsonify(status=False)

    

  return jsonify(status=False) 


#Save Settings
@app.route('/save_theme', methods=['POST'])
def save_theme():

  if request.method == 'POST':
    try:
        with open('static/settings/settings.json', 'r+') as f:
          data = json.load(f)

          data['theme'] = request.form.get("theme")
          data['interval_bg'] = request.form.get("interval_bg")
          data['backgroundopacity'] = request.form.get("backgroundopacity")
          data['showtime'] = request.form.get("showtime")
          data['activ_audio_open'] = request.form.get("activ_audio_open")
          data['activ_audio_clic'] = request.form.get("activ_audio_clic")
          data['showusername'] = request.form.get("showusername")
          data['background_progress'] = request.form.get("background_progress")
          data['zoom'] = request.form.get("zoom")

          f.seek(0)
          json.dump(data, f, indent=4)
          f.truncate()
          return jsonify(status=True)
    except Exception as e:
      return jsonify(status=False)

    

  return jsonify(status=False) 

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)