const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/JwtUtil");

class SecurityService {
  static async login(user) {
    if (!user.email) {
      return {
        success: false,
        statusCode: 400,
        message: "La dirección de correo es requerida",
      };
    }
    if (!user.password) {
      return {
        success: false,
        statusCode: 400,
        message: "La contraseña es requerida",
      };
    }

    const email = user.email;
    const userDB = await UserModel.findOne({ email });

    if (!userDB) {
      return {
        success: false,
        statusCode: 401,
        message: "Contraseña o email incorrecto",
      };
    }

    const { password } = userDB;
    const isMatch = await bcrypt.compare(user.password, password);
    if (!isMatch) {
      return {
        success: false,
        statusCode: 401,
        message: "Contraseña o email incorrecto",
      };
    }

    const accessToken = jwtUtils.generateAccessToken(userDB);
    const refreshToken = jwtUtils.generateRefreshToken(userDB);

    return {
      success: true,
      message: "Autenticación exitosa",
      user: {
        username: userDB.username,
        userId: userDB._id,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  static refreshToken(accessToken) {
    if (!accessToken) {
      return {
        success: false,
        statusCode: 400,
        message: "El access token es requerido",
      };
    }

    const result = jwtUtils.verifyRefreshToken(accessToken);
    if (!result.success) {
      return {
        success: false,
        statusCode: 403,
        message: "Refresh token inválido",
      };
    }

    const user = result.data;
    const newAccessToken = jwtUtils.generateAccessToken(user);
    return {
      success: true,
      message: "Access token renovado con éxito",
      accessToken: newAccessToken,
    };
  }
}

module.exports = SecurityService;
