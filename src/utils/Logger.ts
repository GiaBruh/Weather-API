import winston from "winston";

const { combine, timestamp, json, prettyPrint } = winston.format;

const logger = winston.createLogger({
  level: "http",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    json(),
    prettyPrint()
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
