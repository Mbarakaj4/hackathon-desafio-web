const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

class UserService {
  static async createUser(user) {
    if (!user.username) {
      return { success: false, message: "El nombre de usuario es requerido" };
    }
    if (!user.email) {
      return { success: false, message: "La dirección de correo es requerida" };
    }
    if (!user.password) {
      return { success: false, message: "La contraseña es requerida" };
    }

    const email = user.email;
    const userDB = await UserModel.findOne({ email });

    if (userDB) {
      return { success: false, message: "La dirección de correo ya existe" };
    }

    user.password = await bcrypt.hash(user.password, 10);

    await UserModel.create(user);

    return { success: true, message: "Usuario registrado exitosamente" };
  }

  static async getUsers() {
    return UserModel.find({}).select("-password");
  }

  static async getUserById(id) {
    return UserModel.findById(id);
  }
}

module.exports = UserService;
