FROM node

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3333

ENV DATABASE_URL="postgresql://user:password@postgres:5432/librarygenius?schema=public&connect_timeout=60"

RUN yarn prisma-generate
RUN yarn nx run backend:build

CMD ["node","dist/apps/backend/main.js"]