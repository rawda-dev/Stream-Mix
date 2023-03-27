import { Router } from "express";
import { create } from "../controllers/media.controller";
import { hasAuthorization, requireLogin } from "../controllers/auth.controller";
import { userByID } from "../controllers/user.controller";
const mediaRouter = Router();

mediaRouter.route("/users/:userId/media/").post(requireLogin, hasAuthorization, create);
mediaRouter.param("userId", userByID);
export default mediaRouter;
