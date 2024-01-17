FROM node:slim
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
USER root
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends
# RUN apt-get install culmus xfonts-efont-unicode xfonts-efont-unicode-ib xfonts-intl-european -y

RUN rm -rf /var/lib/apt/lists/*
COPY /fonts /usr/share/fonts

ENV PORT 3000
ENV HOST "http://localhost:3000"
EXPOSE 3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
VOLUME /usr/src/app/image
CMD ["npm", "start"]
