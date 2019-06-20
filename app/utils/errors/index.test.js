const { expect } = require('chai');
const ERROR_TYPES = require('./errors/errorTypes');
const {
  ValidationError,
  NotFoundError,
  ConflictError,
  InternalServerError,
  AuthenticationError,
  AuthorizationError,
  InvalidInputError,
} = require('.');

describe('test error', () => {
  const testErrorObj = {
    testValidationError() {
      throw new ValidationError('validationError msg');
    },
    testConflictError() {
      throw new ConflictError('conflictError msg');
    },
    testNotFoundError() {
      throw new NotFoundError('notFoundError msg');
    },
    testInternalServerError() {
      throw new InternalServerError('internalServerError msg');
    },
    testAuthenticationError() {
      throw new AuthenticationError('authenticationError msg');
    },
    testAuthorizationError() {
      throw new AuthorizationError('authorizationError msg');
    },
    testInvalidInputError() {
      throw new InvalidInputError('invalidInputError msg');
    },
  };

  it('throws validation error', async () => {
    expect(testErrorObj.testValidationError).to.throw(ValidationError);
    expect(testErrorObj.testValidationError)
      .to.throw(ValidationError)
      .that.has.property('type')
      .eql(ERROR_TYPES.VALIDATION_FAILURE);
    expect(testErrorObj.testValidationError).to.throw('validationError msg');
  });

  it('throws conflict error', async () => {
    expect(testErrorObj.testConflictError).to.throw(ConflictError);
    expect(testErrorObj.testConflictError)
      .to.throw(ConflictError)
      .that.has.property('type')
      .eql(ERROR_TYPES.DATA_STATE_CONFILCT);
    expect(testErrorObj.testConflictError).to.throw('conflictError msg');
  });

  it('throws not found error', async () => {
    expect(testErrorObj.testNotFoundError).to.throw(NotFoundError);
    expect(testErrorObj.testNotFoundError)
      .to.throw(NotFoundError)
      .that.has.property('type')
      .eql(ERROR_TYPES.REQUEST_DATA_NOT_FOUND);
    expect(testErrorObj.testNotFoundError).to.throw('notFoundError msg');
  });

  it('throws internal server error', async () => {
    expect(testErrorObj.testInternalServerError).to.throw(InternalServerError);
    expect(testErrorObj.testInternalServerError)
      .to.throw(InternalServerError)
      .that.has.property('type')
      .eql(ERROR_TYPES.INTERNAL_SERVER_ERROR);
    expect(testErrorObj.testInternalServerError).to.throw('internalServerError msg');
  });

  it('throws authentication server error', async () => {
    expect(testErrorObj.testAuthenticationError).to.throw(AuthenticationError);
    expect(testErrorObj.testAuthenticationError)
      .to.throw(AuthenticationError)
      .that.has.property('type')
      .eql(ERROR_TYPES.UNAUTHENTICATED);
    expect(testErrorObj.testAuthenticationError).to.throw('authenticationError msg');
  });

  it('throws authorization server error', async () => {
    expect(testErrorObj.testAuthorizationError).to.throw(AuthorizationError);
    expect(testErrorObj.testAuthorizationError)
      .to.throw(AuthorizationError)
      .that.has.property('type')
      .eql(ERROR_TYPES.UNAUTHORIZED);
    expect(testErrorObj.testAuthorizationError).to.throw('authorizationError msg');
  });

  it('throws invalid input error', async () => {
    expect(testErrorObj.testInvalidInputError).to.throw(InvalidInputError);
    expect(testErrorObj.testInvalidInputError)
      .to.throw(InvalidInputError)
      .that.has.property('type')
      .eql(ERROR_TYPES.INVALID_INPUT_DATA);
    expect(testErrorObj.testInvalidInputError).to.throw('invalidInputError msg');
  });
});
