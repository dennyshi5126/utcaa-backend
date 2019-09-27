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
  }
};

const forgetPassword = async (req, res, next) => {
  if (!req.body.email) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_EMAIL'));
  } else if (!req.body.resetLink) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_RESET_LINK'));
  } else {
    //logics
    entities.user
      .then(() => {
        res.respose = {};
        next();
      })
      .catch(err => {
        next(err);
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
  } else {
    //logics
  }
};

export default { signup, signin, forgetPassword, confirmForgetPassword };
