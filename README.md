# EvaExchange

**EvaExchange** is a trading game backend developed to simulate share trading. It uses NestJS, Sequelize, and PostgreSQL to handle buy and sell operations for registered users, managing portfolios and shares while ensuring data integrity.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)

## Features

- User creation.
- Portfolio creation, management, and validation.
- Buy and sell operations for trading shares.
- PostgreSQL database with Sequelize ORM for relational data management.

## Technologies

- **NestJS**: Backend framework for building scalable applications.
- **Sequelize**: ORM for managing the PostgreSQL database.
- **PostgreSQL**: Relational database to store users, portfolios, shares, and trades.
- **Docker**: For containerized PostgreSQL.

## Getting Started

### Prerequisites

- Node.js (v14+)
- Docker (for PostgreSQL)
- Postman (for API testing)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/cemkiranli/Exchange-App
   cd eva-exchange

### Installation Dependencies
  npm install

### Env file

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=eva-exchange
REDIS_HOST=localhost
REDIS_PORT=6379

### Setup Docker

docker-compose up -d

