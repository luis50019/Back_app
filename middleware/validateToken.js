import jwt from "jsonwebtoken";
import { SECRET_PASSWORD } from "../utils.js";

export default function validateToken(req, res, next) {
  const { access_token } = req.cookies;

  if (!access_token) {
    return res.status(401).json({ message: "El token no existe" }); // ✅ Se detiene la ejecución
  }

  try {
    const data = jwt.verify(access_token, SECRET_PASSWORD);
    console.log("Token válido:", data);
    req.user = data; // ✅ Guarda los datos del token en req.user
    next(); // ✅ Continúa con la siguiente función en la ruta
  } catch (e) {
    return res.status(401).json({ message: "El token no es válido" }); // ✅ Se detiene la ejecución
  }
}
