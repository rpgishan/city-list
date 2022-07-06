FROM node:12
COPY package.json ./
COPY ./build ./build
RUN npm i
EXPOSE 3000
CMD npm start
