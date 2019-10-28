import express from 'express';
import healthControllers from './healthControllers';
import userControllers from './userControllers';
import departmentControllers from './departmentControllers';
import eventControllers from './eventControllers';

const publicRouter = express.Router();

publicRouter.route('/health').get(healthControllers.check);
publicRouter.route('/users/password').post(userControllers.confirmForgetPassword);
publicRouter.route('/departments').get(departmentControllers.list);
publicRouter.route('/register').post(userControllers.signup);
publicRouter.route('/users/signin').post(userControllers.signin);
publicRouter.route('/users/password/reset').post(userControllers.forgetPassword);
publicRouter.route('/events').get(eventControllers.list);

export default publicRouter;
