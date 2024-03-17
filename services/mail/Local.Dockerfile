FROM oven/bun

COPY bun.lockb . 
COPY package.json . 

RUN bun install --frozen-lockfile

COPY . . 

ENV RESEND_API_TOKEN re_8GmRMqEC_DG6FsV4cR1HJVVywnhisr4T3
ENV MAIL_SERVICE_PORT 4000
ENV MAIL_SERVICE_URL http://localhost:4000
ENV RESEND_FROM_EMAIL "Bank App <onboarding@resend.dev>"
ENV BANK_APP_URL http://localhost:3000

CMD ["bun", "src/http/server.ts"]