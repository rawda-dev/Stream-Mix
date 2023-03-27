import app from "../server";
import supertest from "supertest";
import mongoose from "mongoose";

import User from "../models/user.model";
import { connect } from "../utils/dbConnection";
const request = supertest(app);
describe("Auth", () => {
  beforeAll(async () => {
    await connect();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  afterEach(async () => {
    await User.deleteMany({});
  });

  it("should register a user", async () => {
    const res = await request.post("/api/users/").send({
      name: "Test",
      email: "test123@test.com",
      password: "testTest123*&",
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Successfully signed up!");
  });
});
