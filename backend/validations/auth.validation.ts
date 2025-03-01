import Joi from 'joi';

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email().max(254),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).max(128),
  })
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

export default {
  register,
  login,
  logout,
  refreshTokens
}