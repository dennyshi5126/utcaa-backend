import pack from '../../../package.json';

const check = async (_, res, next) => {
  res.response = { data: { version: pack.version, name: 'utcaa-backend' } };
  next();
};

export default { check };
