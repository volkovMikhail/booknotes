const { Router } = require('express');
const { body } = require('express-validator');
const validationResult = require('../middlewares/validation-result');
const UserModel = require('../db/user-model');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');

const authRouter = Router();

authRouter.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 32 }),
  body('username').isLength({ min: 3, max: 32 }),
  validationResult('Validation error'),
  async (req, res) => {
    const { email, password, username } = req.body;
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      return res.json({ message: 'User with this email already exist' });
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({ email, username, createdAt: new Date() });
    //await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = user;
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto._id, tokens.refreshToken, hashPassword, activationLink);

    const userData = { ...tokens, user: userDto };
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return res.status(200).json(userData);
  }
);

module.exports = authRouter;
