import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const IS_DEV = process.env.NODE_ENV !== "production";

if (IS_DEV) {
  dotenv.config({ path: path.join(process.cwd(), ".env") });
}

const packageJsonPath = path.join(process.cwd(), "package.json");
const rawPackageJson = fs.readFileSync(packageJsonPath).toString();
const PackageJson = JSON.parse(rawPackageJson);
const { version: VERSION } = PackageJson;

// server
const SERVER_PORT = process.env.PORT || 9000;
const MCP_SERVER_TRANSPORT_TYPE = process.env.MCP_SERVER_TRANSPORT_TYPE || "STDIO";

export { IS_DEV, VERSION, SERVER_PORT, MCP_SERVER_TRANSPORT_TYPE };
