import { Router } from "express";
import {
  create,
  increaseViews,
  list,
  mediaByID,
  video,
  listRelated,
} from "../controllers/media.controller";
import { hasAuthorization, requireLogin } from "../controllers/auth.controller";
import { userByID } from "../controllers/user.controller";
const mediaRouter = Router();

mediaRouter
  .route("/users/:userId/media/")
  .post(requireLogin, hasAuthorization, create)
  .get(requireLogin, hasAuthorization, list);
mediaRouter.route("/media/:mediaId").get(increaseViews, video);
mediaRouter.route("/media/:mediaId/related").get(listRelated);
mediaRouter.param("userId", userByID);
mediaRouter.param("mediaId", mediaByID);
export default mediaRouter;
