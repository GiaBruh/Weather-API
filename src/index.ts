import express from "express";
import dotenv from "dotenv";
import { morganMiddleware } from "@middlewares/morgan.middleware";
import MyLogger from "@utils/Logger";
import WeatherRoute from "@routes/Weather.route";
import { errorHandler } from "@middlewares/error.middleware";

dotenv.config();

const app = express();
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

app.use(errorHandler);

app.listen(port, () => {
  MyLogger.info(`Server is running at http://localhost:${port} 🌸`);
});
