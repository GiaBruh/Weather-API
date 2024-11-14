import { Request, Response } from "express-serve-static-core";
import WeatherRepository from "@repositories/Weather.repository";
import { AxiosInstance } from "axios";
import { RedisClientType } from "redis";
import { Logger } from "winston";
import { response } from "express";

export default class WeatherService {
  constructor(
    private weatherRepository: WeatherRepository,
    private axios: AxiosInstance,
    private redisClient: RedisClientType,
    private logger: Logger
  ) {}

  fetchDataFromWeatherAPI = async (req: Request, res: Response) => {
    const key = process.env.WEATHER_API_KEY;
    try {
      const response = await this.axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/vietnam?unitGroup=us&include=days%2Ccurrent%2Calerts&key=${key}&contentType=json`
      );
      this.redisClient.setEx("weather", 3600, JSON.stringify(response.data));
      res.status(200).json(response.data);
    } catch (error) {
      this.logger.error(error);
    }
  };
}
