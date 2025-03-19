import jwt from "jsonwebtoken";
import { SECRET_PASSWORD } from "../utils.js";

export default function validateToken(req, res, next) {

  if (req.path === "/health") {
    return next(); // No se valida el token para esta ruta
  }

  const { access_token } = req.cookies;

  if (!access_token) {
    return res.status(401).json({ message: "El token no existe" }); 
  }

  try {
    const data = jwt.verify(access_token, SECRET_PASSWORD);
    req.user = data; 
    next();
  } catch (e) {
    return res.status(401).json({ message: "El token no es válido" });
  }
}
