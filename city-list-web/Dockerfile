FROM node:12

RUN npm i -g serve

COPY ./ /app/

WORKDIR /app/

RUN npm i && npm run build

EXPOSE 3000

CMD serve -s build
