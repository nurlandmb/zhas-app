const userService = require('../services/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const tokenService = require('../services/token-service');
const userModel = require('../models/user-model')
const productService = require("../services/product-service");
class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка при валидации', errors.array())
        );
      }
      const userData = await userService.registration(req.body);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { phone, password } = req.body;
      const userData = await userService.login(phone, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      console.log(e)
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async imgUpload(req, res, next) {
    try {
      const imgLink = await userService.imgUpload(req.file.buffer);
      res.send(imgLink.secure_url);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getUser(req, res, next) {
    try{

      const user = await userService.getUser(req.cookies.refreshToken);
      return res.json(user)
    }catch (e){
      next(e);
    }
  }

  async getUsers(req, res, next){
    try {
      const users = await userService.getUsers();
      return res.json(users);
    }catch(e){
      next(e);
    }
  }

  async update(req, res, next){
    try{
      const userData = await userService.update(req.body);
      return res.json(userData)
    }catch (e){
      next(e);
    }
  }

  async updatePassword(req, res, next){
    try{
      const userData = await userService.updatePassword({...req.body, id: req.user.id});
      return res.json(userData)
    }catch (e){
      next(e);
    }
  }
}

module.exports = new UserController();
