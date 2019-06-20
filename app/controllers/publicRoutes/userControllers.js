import { ERROR_TYPES as errors } from "../../utils/errors";
import entities from "../../entities";

const signup = async (req, res, next) => {
  if (!req.body.email) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + "_EMAIL"));
  } else if (!req.body.password) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + "_PASSWORD"));
  } else if (req.body.name === undefined || req.body.name === null) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + "_NAME"));
  } else if (req.body.phone === null || req.body.phone === undefined) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + "_PHONE"));
  } else if (req.body.consented === null || req.body.consented === undefined) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + "_CONSENTED"));
  } else {
    const data = req.body;
    const wechat = data.wechat ? data.wechat : "";
    entities.user
      .signup(
        data.email,
        data.password,
        data.name,
        data.phone,
        wechat,
        4,
        data.consented
      )
      .then(function() {
        res.response = {};
        next();
      })
      .catch(function(err) {
        if (err.message === errors.USER_DATA_CONFLICT) {
          res.statusCode = 401;
        }
        next(err);
      });
  }
};

const signin = async (req, res, next) => {
  if (!req.body.email) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + "_EMAIL"));
  } else if (!req.body.password) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + "_PASSWORD"));
  } else {
    const data = req.body;
    entities.user
      .signin(data.email, data.password, data.rememberSession)
      .then(function(result) {
        res.response = {
          data: {
            session_id: result.session_id,
            user_id: result.id,
            value: result.group
          }
        };
        next();
      })
      .catch(function(err) {
        if (err.message === errors.UNAUTHENTICATED) {
          res.statusCode = 401;
        }
        next(err);
      });
  }
};

const forgetPassword = async (req, res, next) => {
  if (!req.body.email) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + "_EMAIL"));
  } else if (!req.body.resetLink) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + "_RESET_LINK"));
  } else {
    entities.user
      .forgetPassword(req.body.email, req.body.resetLink)
      .then(() => {
        res.response = {};
        next();
      })
      .catch(err => {
        next(Error(err));
      });
  }
};

const confirmForgetPassword = async (req, res, next) => {
  if (
    !req.body.email ||
    req.body.email !== req.query.email.replace("%40", "@")
  ) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + "_EMAIL"));
  } else if (!req.body.password) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + "_PASSWORD"));
  } else {
    const email = req.body.email;
    const password = req.body.password;
    entities.user
      .confirmForgetPassword(email, req.query.hash)
      .then(() => {
        entities.user
          .resetPassword(email, password)
          .then(() => {
            res.response = {};
            next();
          })
          .catch(err => {
            next(Error(err));
          });
      })
      .catch(err => {
        next(Error(err));
      });
  }
};

export default { signup, signin, forgetPassword, confirmForgetPassword };
