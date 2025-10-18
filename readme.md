# Project Monitoring

This project is a monitoring application. 

## Setup Instructions

1.  **Rename Files:**
    *   Rename `storage/users_example.json` to `storage/users.json`. **(Sesuaikan isi `storage/users.json` sesuai kebutuhan Anda setelah penggantian nama)**

## Run manual (npm start)

1. **Install Dependencies:**
    ```bash
    npm install
    ```
    
2. **Run the Application:**
    ```bash
    npm start
    ```
## Run with Docker

1.  **Rename Docker Compose file:**
    *   Rename `docker-compose-example.yml` to `docker-compose.yml`.
2.  **Build and run the Docker containers:**
    ```bash
    docker-compose up -d
    ```

## Project Structure

*   `index.js`: Main application file.
*   `package.json`: Project dependencies and scripts.
*   `Dockerfile`: Docker configuration for the application.
*   `docker-compose.yml`: Docker Compose configuration for local development.
*   `storage/users.json`: User data storage (after renaming).
*   `template/show-data.html`: HTML template for displaying data.