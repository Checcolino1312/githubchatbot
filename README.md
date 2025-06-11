# Github Chatbot

This repository contains a backend and a frontend, each with its own `docker-compose.yml` file. To keep them separated while allowing the containers to communicate, both stacks share a Docker network named `app-network`.

## Usage

1. Start the backend (this creates the network `app-network` automatically):
   ```bash
   docker-compose -f backend/docker-compose.yml up -d
   ```
2. Then start the frontend which joins the same network:
   ```bash
   docker-compose -f frontend/docker-compose.yml up -d
   ```

The Nginx configuration in the frontend already proxies requests with prefix `/api` to the `backend` service on the shared network.
