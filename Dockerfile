FROM node:14
RUN mkdir /SDC-Q-A
ADD . /SDC-Q-A
WORKDIR /SDC-Q-A
RUN npm i
EXPOSE 3000
CMD ["npm", "start"]