import entities from '../../entities';

const getDepartments = async (_, res, next) => {
  entities.department.getDepartments().then(result => {
    if (!result) {
      res.response = { data: [], count: 0 };
    } else {
      res.response = { data: [result], count: result.length };
    }
    next();
  });
};

export default { getDepartments };
