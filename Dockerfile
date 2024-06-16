FROM node:current-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV production

RUN npm run build

EXPOSE 3003

CMD ["npm", "start"]