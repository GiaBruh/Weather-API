import redisConnection from "@database/redis.db";
import MyLogger from "@utils/Logger";
import { Request, Response, NextFunction } from "express-serve-static-core";

export const checkCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cachedData = await redisConnection.get("weather");
  if (cachedData) {
    MyLogger.info("Cache hit");
    res.status(200).json(JSON.parse(cachedData));
  } else {
    MyLogger.info("Cache miss");
    next();
  }
};
