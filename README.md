# Server explorer

## Requirements

- Node v12.13.0 (LTS)

## Project instalation

- create a copy of the `.env.examle` file and add the `WS_URL` key
- use `npm start` to start the development server
- use `npm run build` to create a minified bundle for production

## TODOS

- add test for OrderBook component
- add tests for the generic components, Button, Dropdown etc.
- add integration test by mocking the websocket connection by injecting a mock as wsClient in AppProviders component
- add websocket reconnection algorithm for when the device goes idle and the ws connections gets interrupted
