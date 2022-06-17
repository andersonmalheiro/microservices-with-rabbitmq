# Microservices with RabbitMQ

## 📝 Requirements

To run this project you will need to install some tools:
- [Docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)
- [Java](https://sdkman.io/)
- [Node](https://nodejs.org/en/)

## 🚀 Running

This project is configured with docker-compose, so all the services and necessary databases can be started with `docker-compose up`

### 🗄️ Databases

- Auth database: `docker-compose up auth-db`
- Products database: `docker-compose up products-db`
- Sales database: `docker-compose up sales-db`

### 🐰 RabbitMQ
- RabbitMQ: `docker-compose up rabbitmq`
