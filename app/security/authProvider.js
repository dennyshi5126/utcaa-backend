import { addDays } from '../utils/dateHandlers';
import logger from '../utils/logging';
import { ERROR_TYPES as errors } from '../utils/errors';
import userSessions from '../entities/userSession';

export function isAuthenticated(id, email, sessionId) {
  const authenticateAction = new Promise((resolve, reject) => {
    if (!id || !email || !sessionId) {
      reject(new Error(errors.UNAUTHENTICATED));
    } else {
      const emailData = email.replace('%40', '@');
      userSessions
        .findActiveSessionsByUser(emailData, id, sessionId)
        .then(function(session) {
          if (!session) {
            reject(new Error(errors.UNAUTHENTICATED));
          } else {
            session.update({ expireAt: addDays(new Date(), 2) }).then(function() {
              logger.info('session ' + sessionId + ' for user ' + id + ' is now refreshed.');
              resolve(true);
            });
          }
        })
        .catch(function(err) {
          reject(new Error(err));
        });
    }
  });
  return authenticateAction;
}

export function isWhiteListRequest(url) {
  if (url === '/') {
    return true;
  }
  const whiteListedEndpoints = ['/', '/users/signin', '/users/signup', '/users/authenticate'];
  for (let endpoint of whiteListedEndpoints) {
    if (url.indexOf(endpoint) === 0) {
      return true;
    }
  }
  return false;
}
