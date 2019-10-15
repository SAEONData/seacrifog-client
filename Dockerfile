FROM nginx:latest
WORKDIR /app

# Copy files to Docker container
COPY . .

# Add Node.js
RUN apt-get update
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install nodejs -y

# Build the client
RUN npm ci
RUN npm run build

# Configure Nginx
RUN mv nginx.conf /etc/nginx/conf.d/default.conf
RUN mv build/* /usr/share/nginx/html/

EXPOSE 80