import app from "../app/app";
import logger from "../app/utils/logging";
import config from "../app/config/config";

app.listen(config.port, function() {
  logger.info(`Listening on port ${config.port}`);
});
