# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/modern/node_modules/.bin:$PATH

WORKDIR /modern

COPY modern/package.json ./
COPY package.json ./

WORKDIR ../

# add app
COPY . ./

WORKDIR /modern

RUN npm install --silent

# expose the app
EXPOSE 3000

# start app
CMD ["npm", "start"]

