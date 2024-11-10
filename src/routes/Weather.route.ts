import WeatherRepository from "@repositories/Weather.repository";
import WeatherService from "@services/Weather.service";
import { Router } from "express";

const WeatherRoute = Router();
const weatherRepository = new WeatherRepository();
const weatherService = new WeatherService(weatherRepository);

WeatherRoute.get("/all", weatherService.getAllWeatherData);

export default WeatherRoute;
