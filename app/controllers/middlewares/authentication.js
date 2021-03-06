import { ERROR_TYPES as errors } from '../../utils/errors';
import { isAuthenticated } from '../../security/authProvider';
import { getUserRequestHeaders } from '../../utils/cookieHelpers';
import users from '../../entities/user';

export default async function(req, _res, next) {
  const { userId, userEmail, userSessionId } = getUserRequestHeaders(req.headers);
  try {
    await isAuthenticated(userId, userEmail, userSessionId);
    const user = await users.getById(userId);
    req.user = user;
    next();
  } catch (error) {
    next(Error(errors.UNAUTHENTICATED));
  }
}
