import fs from "fs";
import path from "path";

export default class WeatherRepository {
  findAll = () => {
    const filePath = path.join(__dirname, "../../src/data/weather.json");
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  };
}
