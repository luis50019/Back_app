import userSchema from '../Schema/user.js';
import bcrypt from 'bcryptjs'
export class userModel{
  static loginUser = async(user)=>{
    try{
      const userFound  = await userSchema.findOne({email:user.email});
      if(!userFound) throw new Error("El email no existe");

      const comparePassword = await bcrypt.compare(user.password,userFound.password);

      if(!comparePassword) throw new Error("La contraseña no es la correcta");

      return userFound;
    }catch(error){
      throw new Error(error.message);
    }
  }
  static registerUser = async(data)=>{
    try{
      
      const userExist = await userSchema.findOne({email:data.email});

      if(userExist) throw new Error("El correo ya esta en uso");
      
      const passwordHash = await bcrypt.hash(data.password,10);
      
      const user = new userSchema({
        name:data.name,
        email:data.email,
        password:passwordHash
      })
      const userRegister = await user.save();
      return userRegister;

    }catch(e){
      throw new Error(e.message);
    }
  }

  static getProfile = async()=>{
    try{  
      const userExist = await userSchema.find();
      if (!userExist) throw new Error("Usuario no encontrado");

      return userExist;

    }catch(e){
      throw new Error(e.message);
    }
  }

}