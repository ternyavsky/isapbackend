FROM node

WORKDIR /app

COPY . ./

RUN yarn install

COPY . .

CMD [ "npm", "run", "start:dev" ]