# Roy Didijean backend
## Requirements
- Docker with docker-compose v1
- node
- If running without an apple sillicon processor, comment the `platform` lines in the docker-compose.yml file.
## Running
1. Run `docker-compose up` in your terminal. This will initialize mysql with the 'roy_didijean' database and phpmyadmin at `localhost:8080` to check the database it's UI.
2. Run `npm run migrations:run` in your terminal.
3. Run `npm run migrations:seed` in your terminal.
4. Start the API with `npm run dev` command.
## Verify the API
```
curl --location 'http://localhost:3000/api/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "tony.stark",
    "password": "jarvis0503"
}'
```