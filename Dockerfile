FROM node:alpine

ARG _NEXT_PUBLIC_FIREBASE_APIKEY
ARG _NEXT_PUBLIC_FIREBASE_AUTHDOMAIN
ARG _NEXT_PUBLIC_FIREBASE_PROJECTID
ARG _NEXT_PUBLIC_FIREBASE_STORAGEBUCKET
ARG _NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID
ARG _NEXT_PUBLIC_FIREBASE_APPID
ARG _NEXT_PUBLIC_FIREBASE_MEASUREMENTID

ENV NEXT_PUBLIC_FIREBASE_APIKEY=$_NEXT_PUBLIC_FIREBASE_APIKEY
ENV NEXT_PUBLIC_FIREBASE_AUTHDOMAIN=$_NEXT_PUBLIC_FIREBASE_AUTHDOMAIN
ENV NEXT_PUBLIC_FIREBASE_PROJECTID=$_NEXT_PUBLIC_FIREBASE_PROJECTID
ENV NEXT_PUBLIC_FIREBASE_STORAGEBUCKET=$_NEXT_PUBLIC_FIREBASE_STORAGEBUCKET
ENV NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID=$_NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID
ENV NEXT_PUBLIC_FIREBASE_APPID=$_NEXT_PUBLIC_FIREBASE_APPID
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENTID=$_NEXT_PUBLIC_FIREBASE_MEASUREMENTID

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
