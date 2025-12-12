import { MCP_SERVER_TRANSPORT_TYPE } from "./config.js";
import { runHttpServer } from "./http-server.js";
import { runStdioServer } from "./stdio-server.js";

async function main() {
  const serverRunner = MCP_SERVER_TRANSPORT_TYPE === "STDIO" ? runStdioServer : runHttpServer;
  const closeServerFunc = await serverRunner();
  process.on("SIGINT", async () => {
    console.log("Shutting down server...");
    await closeServerFunc();
    process.exit(0);
  });
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
