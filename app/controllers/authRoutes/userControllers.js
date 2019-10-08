import { ERROR_TYPES as errors } from '../../utils/errors';
import entities from '../../entities';
import { getUserRequestHeaders } from '../../utils/cookieHelpers';

const signout = async (req, res, next) => {
  const { userEmail: emailCookieValue, userId, userSessionId } = getUserRequestHeaders(req.headers);
  if (!req.body.email) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_EMAIL'));
  }
  if (req.body.email !== emailCookieValue) {
    res.statusCode = 404;
    next(Error(errors.NOT_FOUND));
  } else {
    //logics
    const logoutAll = req.body.logoutAll ? req.body.logoutAll : false;
    entities.user.signout(userEmail, userId, userSessionId, logoutAll).then(function() {
      res.response = {};
      next();
    });
  }
};

const authenticate = async (req, res, next) => {
  const { userEmail, userId, userSessionId } = getUserRequestHeaders(req.headers);
  entities.user
    .authenticate(userId, userEmail, userSessionId)
    .then(function() {
      res.response = {};
      next();
    })
    .catch(function(err) {
      if (err.message === errors.UNAUTHENTICATED) {
        res.statusCode = 401;
      }
      next(err);
    });
};

const getProfile = async (req, res, next) => {
  entities.user.getProfile(req.params.userId).then(result => {
    if (!result) {
      res.response = { data: [], count: 0 };
    } else {
      res.response = { data: [result], count: 1 };
    }
    next();
  });
};

const updateSelfProfile = async (req, res, next) => {
  const {
    firstName = '',
    lastName = '',
    phone = '',
    wechat = '',
    yearOfGraduation = '',
    program = '',
    profession = '',
    city = '',
  } = req.body;
  const userId = req.params.userId;
  if (!userId) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_USER_ID'));
  } else {
    const userProfileObject = { firstName, lastName, phone, wechat, yearOfGraduation, program, profession, city };
    entities.userProfile
      .editProfile(userId, userProfileObject)
      .then(() => {
        res.response = {};
        next();
      })
      .catch(err => next(err));
  }
};

const updateSelfPassword = async (req, res, next) => {
  if (!req.body.userId || req.body.userId !== req.params.userId) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_USER_ID'));
  }
  if (!req.body.newPassword) {
    res.statusCode = 400;
    next(Error(errors.REQUEST_DATA_NOT_FOUND + '_NEW_PASSWORD'));
  } else {
    const userId = req.user.id;
    entities.user
      .updatePassword(userId, req.body.newPassword, req.body.password)
      .then(() => {
        res.response = {};
        next();
      })
      .catch(err => {
        next(err);
      });
  }
};

export default {
  signout,
  authenticate,
  getProfile,
  updateSelfProfile,
  updateSelfPassword,
};
