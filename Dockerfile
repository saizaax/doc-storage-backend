# Install dependencies
FROM node:17 as dependencies
WORKDIR /doc-storage-backend

COPY package.json package-lock.json* ./
COPY prisma ./prisma/

RUN npm i -g typescript
RUN npm ci
RUN npx prisma generate

# Build
FROM node:17 as builder
WORKDIR /doc-storage-backend

COPY . .
COPY --from=dependencies /doc-storage-backend/node_modules ./node_modules
COPY --from=dependencies /doc-storage-backend/prisma ./prisma/

RUN npm run build

# Run
FROM node:17 as runner
WORKDIR /doc-storage-backend

ENV NODE_ENV production

COPY --from=builder /doc-storage-backend/dist ./dist
COPY --from=builder /doc-storage-backend/prisma ./prisma/
COPY --from=builder /doc-storage-backend/package.json ./package.json
COPY --from=builder /doc-storage-backend/node_modules ./node_modules

EXPOSE 8088

CMD ["npm", "run", "start:prod:migrate"]
