import express from 'express';
import authController from '../controllers/auth.controller';
import validate from '../middlewares/validate';
import authValidation from '../validations/auth.validation';

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);

export default router;