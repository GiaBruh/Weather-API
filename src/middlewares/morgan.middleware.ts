import morgan from "morgan";
import chalk from "chalk";
import MyLogger from "@utils/Logger";
import { Request, Response } from "express";

const stream = {
  // Use the http severity
  write: (message: any) => MyLogger.http(message.trim()),
};
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const methodColors: { [key: string]: string } = {
  GET: "#FFFFFF",
  POST: "#8ADB18",
  PUT: "#FFAA00",
  PATCH: "#FFFF00",
  DELETE: "#FF0000",
  OPTION: "#00CCFF",
  HEAD: "#00CCFF",
  DEFAULT: "#7E8694",
};

const statusColors: { [key: string]: string } = {
  "2xx": "#8ADB18", // Green
  "3xx": "#FFFF00", // Yellow
  "4xx": "#FFAA00", // Orange
  "5xx": "#FF0000", // Red
  DEFAULT: "#FFFFFF", // White
};

const colorizeMethod = (method: string) => {
  const color = methodColors[method] || methodColors.DEFAULT;
  return chalk.hex(color).bold(`[${method}]`);
};

const colorizeStatusCode = (code: string) => {
  const range = `${code[0]}xx`;
  const color = statusColors[range] || statusColors.DEFAULT;
  return chalk.hex(color).bold(code);
};

export const morganMiddleware = morgan(
  (tokens, req: Request, res: Response) => {
    const method = tokens.method(req, res) || "undefined";
    const status = tokens.status(req, res) || "undefined";
    return [
      colorizeMethod(method),
      tokens.url(req, res),
      colorizeStatusCode(status),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  },
  { stream, skip }
);
