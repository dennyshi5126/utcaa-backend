import express from 'express';
import publicUserController from '../publicRoutes/userControllers';

const forgetPasswordRouter = express.Router();

forgetPasswordRouter.route('/public/users/password/reset').post(publicUserController.forgetPassword);

export default forgetPasswordRouter;
