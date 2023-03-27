import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import mediaRouter from "./routes/media.route";
import { config } from "./utils/config";
const app = express();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api", mediaRouter);
if (process.env.NODE_ENV === "development") {
  mongoose
    .connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
      console.log(`DB Connection Error: ${err.message}`);
    });
  app.listen(config.PORT, () => {
    console.log("Stream Mix listening on port 4000!!");
  });
}
// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});
export default app;