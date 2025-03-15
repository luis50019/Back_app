import userSchema from '../Schema/user.js';
export class userModel{
  static loginUser = async(user)=>{
    try{
      const userFound  = await userSchema.findOne({email:user.email});
      if(!userFound) throw new Error("Error el usuario no existe");

      return userFound;
    }catch(error){
      throw new Error("error el logearse");
    }
  }
  static registerUser = async(data)=>{
    try{
      
      const userExist = await userSchema.findOne({email:data.email});

      if(userExist) throw new Error("El correo ya esta en uso");

      const user = new userSchema({
        name:data.name,
        email:data.email,
        password:data.password
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