import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import WeatherRoute from "@routes/Weather.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  app.use("/api/weather", WeatherRoute);
});
