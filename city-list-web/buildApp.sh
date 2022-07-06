#!/usr/bin/env bash
#Create docker volume for caching
docker volume create --name npm-cache

docker run --rm \
-v npm-cache:/home/root/.npm \
-v "$PWD":/Project -w /Project \
node:12 npm i && npm run build
