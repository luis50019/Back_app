import { userModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import { validateUserLogin,validateUserRegister } from "../Schema/userSchema.js";
import {SECRET_PASSWORD} from '../utils.js';

export class userControllers {
  static login = async (req, res) => {
    try {
      //first validate the data of the req
      const result = validateUserLogin(req.body);
      if (!result.success) {
        const messageError = [];
        result.error.errors.map((e) => {
          messageError.push(e.message);
        });
        throw new Error(messageError);
      }

      const user = await userModel.loginUser(req.body);
      if (!user) throw new Error({ errors: "error al inciar sesion" });

      const token = jwt.sign({ id: user._id }, SECRET_PASSWORD, {
        expiresIn: "1d",
      });
      //return data of user
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "None",
          expires: new Date(Date.now() + 86400000),
          path: "/",
        })
        .json({ user, message: "user login" });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };

  static register = async (req, res) => {
    try {
      const result = validateUserRegister(req.body);
      if (!result.success) {
        const messageError = [];
        result.error.errors.map((e) => {
          messageError.push(e.message);
        });
        throw new Error(messageError);
      }

      const user = await userModel.registerUser(req.body);
      if (!user) throw new Error("error al registrar el usuario");
      const token = jwt.sign({ id: user._id }, SECRET_PASSWORD, {
        expiresIn: 1,
      });
      //return data of user
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "None",
          expires: new Date(Date.now() + 86400000),
          path: "/",
        })
        .json({ user, message: "user register" });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };

  static profile = async (req, res) => {
    try {
      const infoUser = await userModel.getProfile();
      res.status(200).json({ user: infoUser, message: "datos de profile" });
    } catch (e) {
      res.status(303).json({ message: e.message });
    }
  };
  static logout = async (req, res) => {
    try {
      res
        .clearCookie("access_token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Asegúrate de que esto esté bien configurado
          sameSite: "None", // En caso de que tengas que manejar cookies entre dominios
          path: "/",
        })
        .status(200)
        .json({ message: "sesión cerrada" });
    } catch (e) {
      res.status(403).json({ message: e.message });
    }
  };

  static verifyToken = async (req, res) => {
    try {
      const { access_token } = req.cookies;

      if (!access_token) {
        throw new Error("El token no existe");
      }

      try {
        const dataToken = jwt.verify(access_token, SECRET_PASSWORD);
        res.status(200).json({ message: "token valido" });
      } catch (e) {
        throw new Error("El token no es valido");
      }
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };
}
