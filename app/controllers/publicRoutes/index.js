import express from 'express';
import userControllers from './userControllers';
import healthControllers from './healthControllers';
const publicRouter = express.Router();

publicRouter.route('/health').get(healthControllers.check);
publicRouter.route('/users').post(userControllers.signup);
publicRouter.route('/users/password').post(userControllers.forgetPassword);
publicRouter.route('/users/password/confirm').post(userControllers.confirmForgetPassword);

export default publicRouter;
