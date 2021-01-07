# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/modern/node_modules/.bin:$PATH

WORKDIR /modern

COPY modern/package.json ./
COPY modern/package-lock.json ./
COPY package.json ./

WORKDIR ../

EXPOSE 3001

# add app
COPY . ./

WORKDIR /modern

RUN npm install --silent

# start app
CMD ["npm", "start"]