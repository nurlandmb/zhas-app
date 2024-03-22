const ApiError = require('../exceptions/api-error');
const tokenService = require("../services/token-service");

module.exports = function (req, res, next) {
    try {
        if(!req.user || req.user.type !== "admin"){
            return next(ApiError.UnauthorizedError());
        }
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};