import express from 'express';
import { login, logout, sendSurveyData, signup } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.route('/register').post(signup);

router.route('/login').post(login);

router.route('/logout').post(verifyJWT,logout)

router.route('/survey').post(verifyJWT,sendSurveyData)

export default router