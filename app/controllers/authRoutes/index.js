import express from 'express';
import userControllers from './userControllers';

const authRouter = express.Router();

authRouter.route('/users/:userId/avatar').post(userControllers.uploadAvatar);
authRouter.route('/users/authenticate').get(userControllers.authenticate);
authRouter.route('/users/:userId').patch(userControllers.updateSelfProfile);

export default authRouter;
