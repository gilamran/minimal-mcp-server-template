import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getTVProducts, ITVProduct } from "./data-provider.js";

const server = new McpServer({
  name: "tv-products",
  version: "1.0.0",
});

server.registerTool(
  "get_tvs",
  {
    title: "Get TVs",
    description: "Get a list of available TVs",
    inputSchema: {
      brand: z.string().describe("Brand name"),
      maxInches: z.number().describe("Max inches"),
      minInches: z.number().describe("Min inches"),
    },
  },
  async ({ brand, maxInches, minInches }) => {
    const tvProducts = await getTVProducts(brand, maxInches, minInches);
    if (!tvProducts) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve TV products",
          },
        ],
      };
    }

    const formattedTVProducts = tvProducts.map((tv: ITVProduct) => `${tv.brand} - ${tv.model} - ${tv.inches} inches`);

    const tvProductsText = `TV products for ${brand}:\n\n${formattedTVProducts.join("\n")}`;

    return {
      content: [
        {
          type: "text",
          text: tvProductsText,
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
