import { fileURLToPath } from "url";
import path, { dirname } from "path";
import "dotenv/config";
import hbs from "hbs";
import express from "express";
import { getLatAndLong } from "./apis/geocoding.js";
import { getWeather } from "./apis/weather.js";

const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const viewsPath = path.join(__dirname, "../public/templates/views");
const partialsPath = path.join(__dirname, "../public/templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(`${__dirname}/../public`));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    name: "Rishu Sahu",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Rishu Sahu",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Rishu Sahu",
  });
});

app.get("/weather", (req, res) => {
  const location = req.query.address;
  if (!location) {
    return res.send({
      error: "Please Enter Address as Query",
    });
  }

  (async () => {
    const { lat, long, place, err } = await getLatAndLong(location);

    if (err) {
      return res.send({ error: err });
    }

    const { temp, err: err2 } = await getWeather(lat, long);

    if (err) {
      return res.send({ error: err2 });
    }

    res.json({
      address: place,
      temperature: temp,
    });
  })();
});

app.get("*", (req, res) => {
  res.status(404).send("404 Page Not Found");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
