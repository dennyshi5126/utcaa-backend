import express from 'express';
import healthControllers from './healthControllers';
import userControllers from './userControllers';
import departmentControllers from './departmentControllers';

const publicRouter = express.Router();

publicRouter.route('/health').get(healthControllers.check);
publicRouter.route('/users/password').post(userControllers.confirmForgetPassword);
publicRouter.route('/departments').get(departmentControllers.list);
publicRouter.route('/register').post(userControllers.signup);
publicRouter.route('/user/signin').post(userControllers.signin);

export default publicRouter;
