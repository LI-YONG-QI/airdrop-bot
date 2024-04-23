
# FROM node:18-alpine
# WORKDIR /app
# COPY . .
# RUN yarn install --production
# CMD ["node", "src/index.js"]
# EXPOSE 3000

FROM node:20.12.2-alpine3.19
WORKDIR /app
COPY . .
RUN yarn install
CMD ["npm", "run", "dev"]
EXPOSE 3000