# Winter AI

## Goal
+ AI/ML and Feature Playground to Showcase Proactive Learning

## Use Agreement
+ This software is provided as is, without any warranty. Use it at your own risk. The developer is not liable for any damages arising from its use, including but not limited to data loss, system failure, or financial loss.
+ This project is under development

## Set Up
+ Run `docker compose up -d` to build and start project
+ Create `.env` files for the following services, see `.env.example` for examples
    + Client
    + Server

+ Database - in the Server Service Run
    + `alembic revision --autogenerate -m "Initial migration"`
    + `alembic upgrade head`

## Architecture

## Tech Stack
+ Client
    + React.js
    + TypeScript
    + Vite
    + Vitest
+ Server
    + FastAPI
    + SQLAlchemy
    + Alembic
    + PyTest

## Contact
+ Please Make An Issue on GitHub With Bug / Issue Description.

## Enjoy!