FROM node:latest

RUN mkdir /app
WORKDIR /app
COPY package.json /app/

RUN npm install body-parser
RUN npm install serve-favicon
RUN npm install mongoose
RUN npm install --save multer
RUN npm install

CMD [ "npm", "start" ]
