sudo docker build -t uee-life-api:prod .
sudo docker run -d --restart unless-stopped -p 127.0.0.1:3001:3001 --name uee-life-api-prod uee-life-api:prod