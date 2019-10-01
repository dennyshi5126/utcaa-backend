import express from 'express';
import healthControllers from './healthControllers';
import userControllers from './userControllers';
const publicRouter = express.Router();

publicRouter.route('/health').get(healthControllers.check);
publicRouter.route('/users/password').post(userControllers.confirmForgetPassword);
export default publicRouter;
