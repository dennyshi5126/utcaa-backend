const ValidationError = require('./errors/ValidationError');
const NotFoundError = require('./errors/NotFoundError');
const ConflictError = require('./errors/ConflictError');
const InternalServerError = require('./errors/InternalServerError');
const AuthenticationError = require('./errors/AuthenticationError');
const AuthorizationError = require('./errors/AuthorizationError');
const InvalidInputError = require('./errors/InvalidInputError');

module.exports = {
  ValidationError,
  NotFoundError,
  ConflictError,
  InternalServerError,
  AuthenticationError,
  AuthorizationError,
  InvalidInputError,
  ERROR_TYPES: require('./errors/errorTypes'),
};