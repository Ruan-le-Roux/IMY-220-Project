FROM node:20

WORKDIR /express

<<<<<<< HEAD
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
=======
COPY . .

RUN npm install

CMD [ "npm", "start" ]

EXPOSE 3000
>>>>>>> c3b177c548132364a39b4a06607525ef25b74eb9
