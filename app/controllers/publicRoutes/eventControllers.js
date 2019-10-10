import entities from '../../entities';

const list = async (req, res, next) => {
  entities.event.list().then(result => {
    if (!result) {
      res.response = { data: [], count: 0 };
    } else {
      res.response = { data: [result], count: result.length };
    }
    next();
  });
};

export default { list };
