import express from 'express';
import userControllers from './userControllers';

const authRouter = express.Router();

authRouter.route('/users/signout').post(userControllers.signout);
authRouter.route('/users/:userId/avatar').post(userControllers.uploadAvatar);
authRouter.route('/users/:userId/profile').get(userControllers.getProfile);
authRouter.route('/users/:userId/profile').put(userControllers.updateSelfProfile);
authRouter.route('/users/authenticate').get(userControllers.authenticate);
authRouter.route('/users/:userId/password').put(userControllers.updateSelfPassword);

export default authRouter;
