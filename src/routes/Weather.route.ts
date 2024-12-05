import redisConnection from "@database/redis.db";
import { checkCache } from "@middlewares/weather.middleware";
import WeatherRepository from "@repositories/Weather.repository";
import WeatherService from "@services/Weather.service";
import MyLogger from "@utils/Logger";
import axios from "axios";
import { Router } from "express";

const WeatherRoute = Router();
const weatherRepository = new WeatherRepository();
const axiosInstance = axios.create();
const redisClient = redisConnection;
const Logger = MyLogger;

const weatherService = new WeatherService(
  weatherRepository,
  axiosInstance,
  redisClient,
  Logger
);

WeatherRoute.get("/fetch", checkCache, weatherService.fetchDataFromWeatherAPI);

WeatherRoute.get("/test", weatherService.test);

WeatherRoute.get("/asyncTest", weatherService.testAsync);

export default WeatherRoute;
