import { Router } from "express";
import { userControllers } from "../controllers/user.controlllers.js";
import validateToken from "../middleware/validateToken.js";

const userRouter = Router();

userRouter.post('/login',userControllers.login);
userRouter.post('/register',userControllers.register);
userRouter.get('/',validateToken,userControllers.profile);
userRouter.get('/verify',userControllers.verifyToken);
userRouter.post('/logout',validateToken,userControllers.logout);

export default userRouter;