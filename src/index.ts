import express, { Express } from "express";
import dotenv from "dotenv";
import morganMiddleware from "@middlewares/morgan.middleware";
import WeatherRoute from "@routes/Weather.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8081;
app.use(morganMiddleware);

app.use("/api/weather", WeatherRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
