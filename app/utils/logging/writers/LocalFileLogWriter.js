const BaseWriter = require('./BaseWriter');
const winston = require('winston');
require('winston-daily-rotate-file');

class LocalFileLogWriter extends BaseWriter {
  /**
   * @param {*} sourceConfig: - optional: {dataPattern: 'YYYY-MM-DD', path: 'the path for files to go to'}
   */
  constructor(sourceConfig) {
    let dataPattern = 'YYYY-MM-DD';
    if (sourceConfig && sourceConfig.datePattern) {
      dataPattern = sourceConfig.datePattern;
    }
    const infoFile = new winston.transports.DailyRotateFile({
      name: 'info-logger',
      filename: sourceConfig.path + 'info.log',
      datePattern: dataPattern,
      level: 'info',
    });

    const errorFile = new winston.transports.DailyRotateFile({
      name: 'error-logger',
      filename: sourceConfig.path + 'error.log',
      datePattern: dataPattern,
      level: 'error',
    });

    super([infoFile, errorFile]);
  }
}

module.exports = LocalFileLogWriter;
