import "dotenv/config";

export const config = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/stream-mix",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "7d",
  PORT: process.env.PORT || 4000,
};
