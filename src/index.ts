import express, { Express } from "express";
import dotenv from "dotenv";
import morganMiddleware from "@middlewares/morgan.middleware";
import logger from "@utils/Logger";
import WeatherRoute from "@routes/Weather.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8081;
app.use(morganMiddleware);

app.get("/api/status", (req, res) => {
  logger.info("Checking the API status: Everything is OK");
  res.status(200).send({
    status: "UP",
    message: "The API is up and running!",
  });
});

app.use("/api/weather", WeatherRoute);

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port} 🌸`);
});
