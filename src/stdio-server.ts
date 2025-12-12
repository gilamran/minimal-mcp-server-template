import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getServer } from "./mcp-server.js";

export async function runStdioServer(): Promise<() => Promise<void>> {
  const transport = new StdioServerTransport();
  const server = getServer();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
  return server.close;
}
