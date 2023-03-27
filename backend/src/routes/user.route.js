import express from "express";
import {
  create,
  list,
  userByID,
  read,
  update,
  remove,
  passwordComplexity,
  photo,
  defaultPhoto,
} from "../controllers/user.controller";
import { requireLogin, hasAuthorization } from "../controllers/auth.controller";
const userRouter = express.Router();
userRouter.route("/default-photo").get(defaultPhoto);
userRouter.route("/").get(requireLogin, list).post(passwordComplexity, create);
userRouter
  .route("/:userId")
  .get(requireLogin, read)
  .put(requireLogin, hasAuthorization, update)
  .delete(requireLogin, hasAuthorization, remove);
userRouter.route("/:userId/photo").get(photo, defaultPhoto);
userRouter.param("userId", userByID);
export default userRouter;
