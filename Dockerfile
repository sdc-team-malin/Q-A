FROM node:14.15.0
#create app directory
WORKDIR /usr/src/app
#install app dependencies
RUN npm install
#copy app source code
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

