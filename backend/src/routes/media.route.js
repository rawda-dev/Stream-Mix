import { Router } from "express";
import {
  create,
  increaseViews,
  list,
  mediaByID,
  video,
  listRelated,
  update,
  remove,
  listByUser,
  listPopular,
  listNew
} from "../controllers/media.controller";
import { hasAuthorization, requireLogin } from "../controllers/auth.controller";
import { userByID } from "../controllers/user.controller";
const mediaRouter = Router();
mediaRouter.route("/media/list-popular").get(listPopular);
mediaRouter.route("/media/list-new").get(listNew);
mediaRouter.route("/media").get(list);
mediaRouter
  .route("/users/:userId/media/")
  .post(requireLogin, hasAuthorization, create)
  .get(requireLogin, listByUser); 

mediaRouter.route("/media/:mediaId").get(increaseViews, video);
mediaRouter.route("/media/:mediaId/related").get(listRelated);

mediaRouter
  .route("/users/:userId/media/:mediaId")
  .put(requireLogin, hasAuthorization, update)
  .delete(requireLogin, hasAuthorization, remove);
mediaRouter.param("userId", userByID);
mediaRouter.param("mediaId", mediaByID);
export default mediaRouter;
