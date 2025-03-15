import { userModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import {SECRET_PASSWORD} from '../utils.js';

export class userControllers {
  static login = async (req, res) => {
    try {

      const user = await userModel.loginUser(req.body); 
      
      if(!user) throw new Error("error al inciar sesion");
      
      const token = jwt.sign({ id: user._id }, SECRET_PASSWORD, {
        expiresIn: "1d",
      });

      //return data of user

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false, // ❌ No usar en producción
          sameSite: "lax", // 🔹 Alternativa si solo necesitas compartir en subdominios
        })
        .json({ user, message: "user login" });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };

  static register = async (req, res) => {
    try {
      console.log(req.body)
      const user = await userModel.registerUser(req.body);

      if (!user) throw new Error("error al registrar el usuario");

      const token = jwt.sign({ id: user._id }, SECRET_PASSWORD, {
        expiresIn: "1d",
      });

      //return data of user

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false, // ❌ No usar en producción
          sameSite: "lax", // 🔹 Alternativa si solo necesitas compartir en subdominios
        })
        .json({ user, message: "user register" });

    } catch (Error) {
      res.status(401).json({ message: Error.message }).clearCookie('access_token');
    }
  };

  static profile = async (req,res)=>{
    try{
      const infoUser = await userModel.getProfile();
      res.status(200).json({user:infoUser,message:"datos de profile"});
    }catch(e){
      res.status(303).json({message:e.message});
    }
  }
  static logout = async(req,res)=>{
    try{
      res.clearCookie('access_token').status(200).json({message:"sesion cerrada"})
    }catch(e){
      res.status(403).json({message:e.message})
    }
  }
}
