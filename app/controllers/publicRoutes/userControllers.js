import { ERROR_TYPES as errors } from '../../utils/errors';
import entities from '../../entities';

const signup = async (req, res, next) => {
  if (!req.body.email) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_EMAIL'));
  } else if (!req.body.password) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_PASSWORD'));
  } else if (req.body.name === undefined || req.body.name === null) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_NAME'));
  } else if (req.body.phone === null || req.body.phone === undefined) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_PHONE'));
  } else if (req.body.consented === null || req.body.consented === undefined) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_CONSENTED'));
  } else {
    //logics
  }
};

const signin = async (req, res, next) => {
  if (!req.body.email) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_EMAIL'));
  } else if (!req.body.password) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_PASSWORD'));
  } else {
    //logics
    const { email, password, remember_login } = req.body;

    entities.user.signin(email, password, remember_login).then(result => {
      res.response = {
        data: { userId: result.userId, sessionId: result.sessionId },
      };
      next();
    });
  }
};

const forgetPassword = async (req, res, next) => {
  if (!req.body.email) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_EMAIL'));
  } else {
    const { email } = req.body;
    entities.user
      .forgetPassword(email)
      .then(() => {
        res.statusCode = 200;
        res.respose = {};
        next();
      })
      .catch(err => {
        next(Error(errors.REQUEST_DATA_NOT_FOUND + err.message));
      });
  }
};

const confirmForgetPassword = async (req, res, next) => {
  if (!req.body.email || req.body.email !== req.query.email.replace('%40', '@')) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_EMAIL'));
  } else if (!req.body.password) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_PASSWORD'));
  } else if (!req.body.hash) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_HASH'));
  } else {
    entities.user.then(() => {
      res.status(200).send({});
      next();
    });
  }
};

export default { signup, signin, forgetPassword, confirmForgetPassword };
