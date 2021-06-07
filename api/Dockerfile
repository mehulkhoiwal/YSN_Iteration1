FROM node:12.18.3

LABEL version="1.0"

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install
COPY . .

EXPOSE 3001

CMD ["node", "app.js"]