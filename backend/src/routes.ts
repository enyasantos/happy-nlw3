import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import AuthController from './controllers/AuthController';
import OrphanagesController from './controllers/OrphanagesController';
import StatusOrphanagesController from './controllers/StatusOrphanagesController';
import UsersController from './controllers/UsersController';
import ForgotPasswordController from './controllers/ForgotPasswordController';

import authMiddleware from './middleware/authMiddleware';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/auth', AuthController.authenticate);
routes.post('/forgot-password', ForgotPasswordController.forgotPassword);
routes.put('/forgot-password/:key', ForgotPasswordController.changePassword);

routes.get('/users', UsersController.index);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.put('/orphanages/:id', authMiddleware, upload.array('images'), OrphanagesController.update);
routes.delete('/orphanages/:id', authMiddleware, OrphanagesController.delete);

routes.get('/orphanages-status', StatusOrphanagesController.show);

export default routes;