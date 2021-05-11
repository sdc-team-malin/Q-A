FROM node:14
RUN mkdir /RP
ADD . /RP
WORKDIR /RP
RUN npm i
EXPOSE 80
CMD ["npm", "start"]