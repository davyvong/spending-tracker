FROM node:16

WORKDIR /app

COPY . .

RUN npm ci

RUN npx babel src --out-dir build --source-maps --copy-files

CMD node build/index.js
