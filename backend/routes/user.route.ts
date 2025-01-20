import express from 'express';
// import auth from '../middlewares/auth';
import userController from '../controllers/user.controller';

const router = express.Router();

router.route('/')
  .post(userController.createUser)
  .get(userController.getUsers);

router.route('/:userId')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;