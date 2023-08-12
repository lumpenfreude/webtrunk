FROM node:18-alpine
RUN apk add --update nodejs npm 
ENV NODE_ENV=production
WORKDIR /app
ADD webtrunk.js /app
RUN cd /app
RUN npm install 
