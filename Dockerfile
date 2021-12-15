FROM node:lts

COPY . ./app/car-booking

WORKDIR /app/car-booking

RUN yarn

EXPOSE 80

