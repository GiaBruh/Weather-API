import { Request, Response, NextFunction } from "express";
import MyLogger from "@utils/Logger";
import BadRequestError from "@lib/BadRequestError";
import chalk from "chalk";
import { error } from "console";
import { inspect } from "util";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handled errors
  if (err instanceof BadRequestError) {
    const { statusCode, errors, logging } = err;
    if (logging) {
      console.error(chalk.red.bold(`[ERROR] Status: ${statusCode}`));
      console.error(
        chalk.yellow("Errors:"),
        inspect(errors, { depth: null, colors: true })
      );
      console.trace(err.stack);
    }
    return res.status(statusCode).json({ errors });
  }

  // Unhandled errors
  console.error(err);
  return res
    .status(500)
    .json({ errors: [{ message: "Something went wrong" }] });
};
