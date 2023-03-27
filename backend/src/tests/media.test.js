import Media from "../models/media.model";
import User from "../models/user.model";
import supertest from "supertest";
import app from "../server";
import { connect } from "../utils/dbConnection";
import mongoose from "mongoose";
import { user, createUser, getUserHeader } from "./authHeader";
const request = supertest(app);
beforeAll(async () => {
  await connect();
});
afterAll(async () => {
  await mongoose.connection.close();
});
afterEach(async () => {
  await Media.deleteMany({});
  await User.deleteMany({});
});
describe("POST /api/media", () => {
  test("should upload a media", async () => {
    await createUser();
    const authHeader = await getUserHeader();
    const res = await request
      .post(`/api/users/${user._id}/media`)
      .set("Authorization", `Bearer ${authHeader}`)
      .set({ connection: "keep-alive" })
      .field("title", "Test")
      .field("genre", "Test")
      .field("description", "Test");

    expect(res.status).toBe(200);
  });
});
describe("GET /api/media", () => {
  test("should get all media", async () => {
    const res = await request.get("/api/media");
    expect(res.status).toBe(200);
  });
});
describe("GET /api/users/:userId/media", () => {
  test("should get all media by user", async () => {
    await createUser();
    const authHeader = await getUserHeader();
    const res = await request
      .get(`/api/users/${user._id}/media`)
      .set("Authorization", `Bearer ${authHeader}`);
    expect(res.status).toBe(200);
  });
});
describe("GET /api/media/list-popular", () => {
  test("should get all popular media", async () => {
    const res = await request.get("/api/media/list-popular");
    expect(res.status).toBe(200);
  });
});
describe("GET /api/media/list-new", () => {
  test("should get all new media", async () => {
    const res = await request.get("/api/media/list-new");
    expect(res.status).toBe(200);
  });
});