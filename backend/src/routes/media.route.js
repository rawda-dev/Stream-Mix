import { Router } from "express";
import { create, list, mediaByID, video } from "../controllers/media.controller";
import { hasAuthorization, requireLogin } from "../controllers/auth.controller";
import { userByID } from "../controllers/user.controller";
const mediaRouter = Router();

mediaRouter
  .route("/users/:userId/media/")
  .post(requireLogin, hasAuthorization, create)
  .get(requireLogin, hasAuthorization, list);
mediaRouter.route("/media/:mediaId").get(video);
mediaRouter.param("userId", userByID);
mediaRouter.param("mediaId", mediaByID);
export default mediaRouter;
