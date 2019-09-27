import express from 'express';
import healthControllers from './healthControllers';
const publicRouter = express.Router();

publicRouter.route('/health').get(healthControllers.check);

export default publicRouter;
