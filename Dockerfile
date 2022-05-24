FROM node:lts-alpine
WORKDIR /home/node

COPY . .

RUN npm install

CMD npm run build && npm run start
