import express from 'express';
import healthControllers from './healthControllers';
import userControllers from './userControllers';
import departmentControllers from './departmentControllers';
const publicRouter = express.Router();

publicRouter.route('/health').get(healthControllers.check);
publicRouter.route('/users/password').post(userControllers.confirmForgetPassword);
publicRouter.route('/departments').get(departmentControllers.list);

export default publicRouter;
