import express from 'express';
import userController from '../controllers/user.controller';
import auth from '../middlewares/auth';

const router = express.Router();

router.route('/')
  .post(auth(), userController.createUser)
  .get(auth(), userController.getUsers);

router.route('/:userId')
  .get(auth(), userController.getUser)
  .patch(auth(), userController.updateUser)
  .delete(auth(), userController.deleteUser);

export default router;