FROM node:16 as builder

#######################################################################

RUN mkdir /app
WORKDIR /app

# NPM will not install any package listed in "devDependencies" when NODE_ENV is set to "production",
# to install all modules: "npm install --production=false".
# Ref: https://docs.npmjs.com/cli/v9/commands/npm-install#description

ENV NODE_ENV production

COPY . .
RUN npm install -g npm@9.4.0
RUN npm install
FROM node:16
LABEL fly_launch_runtime="nodejs"

COPY --from=builder /app /app

WORKDIR /app
ENV NODE_ENV production
EXPOSE 8080

CMD [ "npm", "run", "start" ]
