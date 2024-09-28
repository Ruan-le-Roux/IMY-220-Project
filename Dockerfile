FROM node:20

WORKDIR /express

COPY . .

RUN npm install

CMD [ "npm", "start" ]

EXPOSE 3000