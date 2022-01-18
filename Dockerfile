FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Listen port
EXPOSE 4000

# Copy app
COPY . .

# Install dependencies
RUN yarn

# Run app (and check container node version)
CMD yarn start