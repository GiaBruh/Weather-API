import MyLogger from "@utils/Logger";
import { createClient, RedisClientType } from "redis";

const redisConnection: RedisClientType = createClient({
  url: "redis://localhost:6379",
});

redisConnection.on("error", (err) => {
  MyLogger.error("Redis Client Error", err);
});

redisConnection
  .connect()
  .then(() => {
    MyLogger.info("Connected to Redis 🌶️");
  })
  .catch((err) => {
    MyLogger.error("Failed to connect to Redis", err);
  });

export default redisConnection;
