FROM node:16.17-alpine AS client

WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .

CMD ["ng", "serve", "--port", "4200", "--host", "0.0.0.0", "--poll", "2000"]