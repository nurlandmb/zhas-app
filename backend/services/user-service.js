const ApiError = require('../exceptions/api-error');
const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const UserDto = require('../dtos/user-dto');
const tokenService = require('./token-service');
const userModel = require("../models/user-model");
const {v2} = require("cloudinary");
const streamifier = require("streamifier");

class UserService {
  async registration({ phone, password, type, code }) {
    const candidate = await UserModel.findOne({ phone });
    if (candidate) {
      throw ApiError.BadRequest('Данный номер уже зарегистрирован!');
    }
    const hashPassword = await bcrypt.hash(password, 3);
    let user = await UserModel.create({
      phone,
      password: hashPassword,
      type: type,
      code
    });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async login(phone, password) {
    try {
      const user = await UserModel.findOne({ phone });
      if (!user) {
        throw ApiError.BadRequest('Аккаунт не найден!');
      }
      const isPassEqual = await bcrypt.compare(password, user.password);
      if (!isPassEqual) {
        throw ApiError.BadRequest('Неправильный пароль!');
      }
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return { ...tokens, user: userDto };
    } catch (error) {
      throw ApiError.BadRequest(
        'Что-то пошло не так. Пожалуйста, попробуйте снова'
      );
    }
  }

  async update(user){
    try{
      const newUser = await UserModel.findById(user.id);
      newUser.info = user.info;
      await newUser.save();
      const userDto = new UserDto(newUser);
      return userDto;
    }catch(error){
      throw ApiError.BadRequest('Неправильные данные')
    }
  }

  async updatePassword(data){
    const user = await UserModel.findById(data.id);
    if (!user) {
      throw ApiError.BadRequest('Аккаунт не найден!');
    }
    const isPassEqual = await bcrypt.compare(data.oldPassword, user.password);
    if (!isPassEqual) {
      throw ApiError.BadRequest('Неправильный пароль!');
    }
    user.password = await bcrypt.hash(data.newPassword, 3);
    await user.save();
    const userDto = new UserDto(user);
    return userDto;
  }

  async logout(refreshToken) {
    try {
      const token = await tokenService.removeToken(refreshToken);
      return token;
    } catch (error) {
      throw ApiError.BadRequest(
        'Что-то пошло не так. Пожалуйста, попробуйте снова'
      );
    }
  }

  async imgUpload(buffer) {
    v2.config({
      cloud_name: 'dhpbvnpiz',
      api_key: '896769557669824',
      api_secret: 'RNKzHCq-IjdPK3y8ZsehCyXL7Ss',
    });
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = v2.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };
    const result = await streamUpload(buffer);
    return result;
  }

  async getUser(refreshToken){
    const data = tokenService.validateRefreshToken(refreshToken)
    const userData = await userModel.findById(data.id);
    const userDto = new UserDto(userData);
    return userDto;
  }

  async getUsers(){
    const users = await userModel.find();
    const usersDto = users.map(user => new UserDto(user));
    const sortedUsers = usersDto.sort((a, b) => a.code > b.code ? 1 : -1)
    return sortedUsers;
  }

  async refresh(refreshToken) {
    try {
      if (!refreshToken) {
        throw ApiError.UnauthorizedError;
      }
      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenService.findToken(refreshToken);
      if (!userData || !tokenFromDb) {
        throw ApiError.UnauthorizedError();
      }
      const user = await UserModel.findById(userData.id);
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return { ...tokens, user: userDto };
    } catch (error) {
      throw ApiError.BadRequest(
        'Что-то пошло не так. Пожалуйста, попробуйте снова'
      );
    }
  }
}

module.exports = new UserService();
