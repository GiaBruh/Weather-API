import express, { Express } from "express";
import dotenv from "dotenv";
import morganMiddleware from "@middlewares/morgan.middleware";
import MyLogger from "@utils/Logger";
import WeatherRoute from "@routes/Weather.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8081;
app.use(morganMiddleware);

app.get("/api/status", (req, res) => {
  MyLogger.info("Checking the API status: Everything is OK");
  res.status(200).send({
    status: "UP",
    message: "The API is up and running!",
  });
});

app.use("/api/weather", WeatherRoute);

app.listen(port, () => {
  MyLogger.info(`Server is running at http://localhost:${port} 🌸`);
});
