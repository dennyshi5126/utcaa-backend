const ERROR_TYPES = require('./errorTypes');
const BaseError = require('./BaseError');

/**
 * ConflictError - used when the stateful data has state conflict.
 */
class ConflictError extends BaseError {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = ERROR_TYPES.DATA_STATE_CONFILCT;
  }
}

module.exports = ConflictError;
