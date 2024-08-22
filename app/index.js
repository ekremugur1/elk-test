const express = require("express");
const winston = require("winston");
const LogstashTransport = require("winston-logstash/lib/winston-logstash-latest");

const port = 3000;
const app = express();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new LogstashTransport({
      host: "logstash",
      port: 5044,
    }),
  ],
});

app.use((req, res, next) => {
  logger.info("Request received", { url: req.url, method: req.method });
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => console.log(`listening on port ${port}`));
