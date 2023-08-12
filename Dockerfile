FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY . ./
RUN npm install 
