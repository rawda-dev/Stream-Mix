import Media from "../models/media.model";
import extend from "lodash/extend";
import fs from "fs";
import formidable from "formidable";
import mongoose from "mongoose";
let gridfs = null;
mongoose.connection.on("connected", () => {
  gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
});

export const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Video could not be uploaded",
      });
    }
    let media = new Media(fields);
    media.postedBy = req.profile;
    if (files.video) {
      let writestream = gridfs.openUploadStream(media._id, {
        contentType: files.video.mimetype || "binary/octet-stream",
      });
      fs.createReadStream(files.video.filepath).pipe(writestream);
    }
    try {
      let result = await media.save();
      result.postedBy.hashedPassword = undefined;
      result.postedBy.salt = undefined;
      result.postedBy.photo = undefined;
      res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
  });
};
