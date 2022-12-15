### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:18-alpine as builder
RUN apk add chromium
ENV CHROME_BIN=/usr/bin/chromium-browser
RUN npm install -g @angular/cli

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app
COPY . .
RUN ng test --watch=false --browsers=Chrome_without_sandox

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --configuration production --output-path=dist


### STAGE 2: Setup ###

FROM nginx:alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]