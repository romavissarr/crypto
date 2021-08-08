import mongoose from "mongoose";
import { fullEnvPath } from "../../api/env";
import { join } from "path";

const path = join(__dirname, "..", "..", "config", ".env");
fullEnvPath(path);

export default async function mongoConnect() {
  mongoose.connect(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose
}
