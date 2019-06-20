const USER_ID_COOKIE = "utcaa_user_id";
const EMAIL_COOKIE = "utcaa_em";
const SESSION_ID_COOKIE = "utcaa_s";

export const getUserRequestHeaders = headers => {
  return {
    userId: headers[USER_ID_COOKIE],
    userEmail: headers[EMAIL_COOKIE],
    userSessionId: headers[SESSION_ID_COOKIE]
  };
};
