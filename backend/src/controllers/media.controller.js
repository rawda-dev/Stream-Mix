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
export const list = async (req, res) => {
  try {
    let media = await Media.find()
      .populate("postedBy", "_id name")
      .select("title description genre views created updated")
      .sort({ created: -1 });
    res.json(media);
  } catch (err) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
export const mediaByID = async (req, res, next, id) => {
  const media = await Media.findById(id).populate("postedBy", "_id name");
  if (!media)
    return res.status("401").json({
      error: "Media not found",
    });
  req.media = media;
  let files = await gridfs.find({ filename: media._id }).toArray();
  if (!files[0]) {
    return res.status(404).send({
      error: "No video found",
    });
  }
  req.file = files[0];
  next();
};

export const video = (req, res) => {
  const range = req.headers["range"];
  if (range && typeof range === "string") {
    const parts = range.replace(/bytes=/, "").split("-");
    const partialstart = parts[0];
    const partialend = parts[1];

    const start = parseInt(partialstart, 10);
    const end = partialend ? parseInt(partialend, 10) : req.file.length - 1;
    const chunksize = end - start + 1;

    res.writeHead(206, {
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Range": "bytes " + start + "-" + end + "/" + req.file.length,
      "Content-Type": req.file.contentType,
    });

    let downloadStream = gridfs.openDownloadStream(req.file._id, {
      start,
      end: end + 1,
    });
    downloadStream.pipe(res);
    downloadStream.on("error", () => {
      res.sendStatus(404);
    });
    downloadStream.on("end", () => {
      res.end();
    });
  } else {
    res.header("Content-Length", req.file.length);
    res.header("Content-Type", req.file.contentType);

    let downloadStream = gridfs.openDownloadStream(req.file._id);
    downloadStream.pipe(res);
    downloadStream.on("error", () => {
      res.sendStatus(404);
    });
    downloadStream.on("end", () => {
      res.end();
    });
  }
};