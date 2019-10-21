import express from 'express';
import userControllers from './userControllers';

const authRouter = express.Router();

authRouter.route('/users/authenticate').get(userControllers.authenticate);
authRouter.route('/users/:userId/signout').post(userControllers.signout);
authRouter.route('/users/:userId').patch(userControllers.updateSelfProfile);

export default authRouter;
