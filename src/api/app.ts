import env from "./env";
env("/config");

import express from "express";
import routes from "./routes";

const app = express();
const API_PORT = process.env.API_PORT_MAIN || process.env.API_PORT_SECONDARY;

app.use('/api', routes)

app.listen(API_PORT, () => console.log(`Running on port "${API_PORT}"!`));
