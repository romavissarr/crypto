import { config } from "dotenv";
import { join } from "path";

export default function env(initialPath: string) {
  const completePath = join(__dirname, "..", "..", initialPath, ".env");

  config({ path: completePath });
}

export function fullEnvPath(path: string) {
  config({ path: path })
}
