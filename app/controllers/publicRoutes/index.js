import express from 'express';
import healthControllers from './healthControllers';
import userControllers from './userControllers';
import departmentControllers from './departmentControllers';
import eventControllers from './eventControllers';

const publicRouter = express.Router();

publicRouter.route('/health').get(healthControllers.check);
publicRouter
  .route('/users/password')
  .get(userControllers.confirmForgetPassword)
  .post(userControllers.resetPassword);
publicRouter.route('/departments').get(departmentControllers.list);
publicRouter.route('/register').post(userControllers.signup);
publicRouter.route('/user/signin').post(userControllers.signin);
publicRouter.route('/events').get(eventControllers.list);

export default publicRouter;
