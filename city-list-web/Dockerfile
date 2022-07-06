FROM node:12
COPY package.json ./
COPY ./build ./build
RUN npm i
RUN npm install -g serve
EXPOSE 3000
CMD serve -s build
