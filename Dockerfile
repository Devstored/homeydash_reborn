FROM python:3.6
LABEL maintainer="Dino https://community.athom.com/u/dinorayn"

# upgrade pip
RUN pip install --upgrade pip

# install dependancies
COPY requirements.txt /tmp/
RUN pip3 install --requirement /tmp/requirements.txt
#COPY . /tmp/

EXPOSE 5000

COPY app /home/app/

WORKDIR /home/app/
CMD ["app.py"]
ENTRYPOINT ["python3"]