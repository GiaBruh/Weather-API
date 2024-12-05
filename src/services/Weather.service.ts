import { Request, Response } from "express-serve-static-core";
import WeatherRepository from "@repositories/Weather.repository";
import { AxiosInstance } from "axios";
import { RedisClientType } from "redis";
import { Logger } from "winston";
import { NextFunction } from "express";
import BadRequestError from "@lib/BadRequestError";

export default class WeatherService {
  constructor(
    private weatherRepository: WeatherRepository,
    private axios: AxiosInstance,
    private redisClient: RedisClientType,
    private logger: Logger
  ) {}

  fetchDataFromWeatherAPI = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const key = process.env.WEATHER_API_KEY;
    // const key = "";
    try {
      const response = await this.axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/vietnam?unitGroup=us&include=days%2Ccurrent%2Calerts&key=${key}&contentType=json`
      );
      this.redisClient.setEx("weather", 3600, JSON.stringify(response.data));
      res.status(200).json(response.data);
    } catch (err) {
      next(err);
    }
  };

  test = (req: Request, res: Response) => {
    throw new BadRequestError({
      code: 401,
      message: "synchronous",
      logging: false,
    });
  };

  testAsync = async (req: Request, res: Response, next: NextFunction) => {
    next(
      new BadRequestError({
        code: 400,
        message: "asynchronous",
        context: {
          method: req.method,
          url: req.originalUrl,
          headers: req.headers,
          body: req.body,
        },
        logging: true,
      })
    );
  };
}
