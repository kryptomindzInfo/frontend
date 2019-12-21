FROM node:12
ADD /package.json /tmp/package.json
WORKDIR /tmp
ADD . /tmp/
RUN npm install
EXPOSE 80
ENTRYPOINT npm start --port 80
