import express from 'express';
import signinControllers from '../publicRoutes/userControllers';

const signinRouter = express.Router();

signinRouter.route('/user/signin').post(signinControllers.signin);

export default signinRouter;
