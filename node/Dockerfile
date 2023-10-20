# FROM ubuntu:latest
FROM alpine:latest

# RUN apt update && apt upgrade -y && apt install npm -y && apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y
RUN apk update
RUN apk add npm
RUN apk add gcompat libuuid
RUN apk add make gcc g++
RUN apk add libjpeg-turbo-dev imagemagick ghostscript
RUN apk add git build-base curl
RUN apk add cairo-dev jpeg-dev pango-dev giflib-dev
# RUN apk add python3
# RUN apk add libc6-compat
# build-essential
# libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# RUN npm cache clean -f
# RUN npm install -g n stable
#RUN n stable

# Install dependencies
WORKDIR /src/

# Expose the app port
EXPOSE 8081

# Start the app
CMD npm install && npm start
