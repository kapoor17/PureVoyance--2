FROM node:14.17.0-alpine3.12

WORKDIR /usr/src/app

COPY . .

RUN npm install -g @angular/cli

RUN npm install

RUN npm run build

EXPOSE 4200

CMD ["npm", "run", "start:prod"]
