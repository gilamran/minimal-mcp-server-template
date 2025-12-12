Minimal MCP server template with both STDIO and HTTP transports.

As an example, the server is exposing a single `get_tvs` tool that filters a small in-memory TV catalog.

Quick start
- Install: `yarn install`
- Build: `yarn build`
- Watch: `yarn watch` (will build and run the server on changes)

Run as stdio MCP server
- Default mode; no env needed. After building: `node dist/main.js` (connect via an MCP-aware client over stdio).

Run as HTTP MCP server
- Create a `.env` file in the root directory and set the `MCP_SERVER_TRANSPORT_TYPE` environment variable to `HTTP`.
- The server listens on `POST /mcp` and uses the MCP streamable HTTP transport.
Note that in order to make the server available to the outside world, you need to use a reverse proxy like ngrok: run `npx ngrok http 9000` to get a public URL
