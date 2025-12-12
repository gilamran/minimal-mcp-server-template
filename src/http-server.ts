import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { Request, Response } from "express";
import express from "express";
import { getServer } from "./mcp-server.js";
import { SERVER_PORT } from "./config.js";

export async function runHttpServer(): Promise<() => Promise<void>> {
  const app = express();
  app.use(express.json());

  app.post("/mcp", async (req: Request, res: Response) => {
    const server = getServer();
    try {
      const transport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
      });
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
      res.on("close", () => {
        console.log("Request closed");
        transport.close();
        server.close();
      });
    } catch (error) {
      console.error("Error handling MCP request:", error);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: "2.0",
          error: {
            code: -32603,
            message: "Internal server error",
          },
          id: null,
        });
      }
    }
  });

  app.get("/", (req: Request, res: Response) => {
    res.send("MCP Stateless Streamable HTTP Server, try POST /mcp");
  });

  const httpServer = app.listen(SERVER_PORT, (error) => {
    if (error) {
      console.error("Failed to start server:", error);
    }
    console.log(`MCP Stateless Streamable HTTP Server listening on port ${SERVER_PORT}`);
  });

  return () => new Promise<void>((resolve, reject) => {
    httpServer.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
