FROM oven/bun

COPY bun.lockb . 
COPY package.json . 

RUN bun install --frozen-lockfile

COPY . . 

ENV DB_URL ""
ENV MAIL_SERVICE_URL http://localhost:4000
ENV AUTH_SERVICE_SECRET "G+vs8Ex5NFvni1Lt1WQsIg=="

CMD ["bun", "src/http/server.ts"]