FROM python:3.6
ADD requirements.txt /app/requirements.txt
WORKDIR /app/
RUN pip install -r requirements.txt
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN adduser --disabled-password --gecos '' finder
