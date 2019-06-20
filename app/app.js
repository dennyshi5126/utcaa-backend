import express from "express";
import { ERROR_TYPES as errors } from "./utils/errors";
import logger from "./utils/logging";
import cuid from "cuid";
import bodyParser from "body-parser";
import corsFilter from "cors";
import fileUpload from "express-fileupload";
import authenticate from "../app/controllers/middlewares/authentication";
import authRoutes from "./controllers/authRoutes";
import publicRoutes from "./controllers/publicRoutes";

const app = express();

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(corsFilter());
app.use(fileUpload());
app.options("*", corsFilter());

app.use(function(req, _, next) {
  req.requestId = cuid();
  logger.info(
    "request id: " + req.requestId + " request url: " + req.originalUrl
  );
  logger.info("request id: " + req.requestId + " request verb: " + req.method);
  next();
});

try {
  app.use("/utcaa/api/public", publicRoutes);
  app.use("/utcaa/api/auth", authenticate);
  app.use("/utcaa/api/auth", authRoutes);
} catch (error) {
  next(Error(error));
}

app.use(function(req, res, next) {
  if (res.response) {
    res.send(res.response);
    logger.info(
      "request id: " +
        req.requestId +
        " response status: " +
        JSON.stringify(res.statusCode)
    );
    logger.info(
      "request id: " +
        req.requestId +
        " response headers: " +
        JSON.stringify(res.headers)
    );
    logger.info(
      "request id: " +
        req.requestId +
        " response body: " +
        JSON.stringify(res.response)
    );
  } else {
    next();
  }
});

app.use("*", function(_, res, next) {
  // any url that didn't match our routes will get to this middleware.
  if (res.statusCode === 200) {
    res.statusCode = 404;
  }
  next(Error(errors.NOT_FOUND));
});

// error handlers
app.use(function(err, req, res, _) {
  logger.error(
    "request id: " +
      req.requestId +
      " response headers: " +
      JSON.stringify(res.headers)
  );
  if (res.statusCode === 404 || res.statusCode === 200) {
    res.statusCode = 404;
    logger.error("request id: " + req.requestId + " response status: 404");
    logger.error("request id: " + req.requestId + " response body: " + err);
    res.send({ result: false, data: err.message || err });
  } else if (res.statusCode === 400) {
    res.statusCode = 400;
    logger.error("request id: " + req.requestId + " response status: 400");
    logger.error("request id: " + req.requestId + " response body: " + err);
    res.send({ result: false, data: err.message || err });
  } else {
    res.statusCode = res.statusCode || 500;
    logger.error("request id: " + req.requestId + " response status: 500");
    logger.error("request id: " + req.requestId + " response body: " + err);
    res.send({ result: false, data: err.message || err });
  }
});

export default app;
