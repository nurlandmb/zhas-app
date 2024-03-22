const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, 'favoryalanurlanacc', {
      expiresIn: '24h',
    });
    const refreshToken = jwt.sign(payload, 'favoryalanurlanrfr', {
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, 'favoryalanurlanacc');
      return userData;
    } catch (err) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, 'favoryalanurlanrfr');
      return userData;
    } catch (err) {
      return null;
    }
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }
  async removeToken(refreshToken) {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    return tokenData;
  }
  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ refreshToken: refreshToken });
    return tokenData;
  }
}
module.exports = new TokenService();
