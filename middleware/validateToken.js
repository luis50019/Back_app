import jwt from 'jsonwebtoken'
import { SECRET_PASSWORD } from '../utils.js';

export default function validateToken(req,res,next){
  const {access_token} = req.cookies;

  if(!access_token) res.status(401).json({message:"el token no existe"});

  try{
    const data = jwt.verify(access_token,SECRET_PASSWORD);
    console.log("token valido: ",data)
    next();
  }catch(e){
    res.status(401).json({messgae:"el token no es valido"});
  }
}

