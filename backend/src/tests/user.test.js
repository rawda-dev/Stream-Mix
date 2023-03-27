import app from "../server";
import supertest from "supertest";
import mongoose from "mongoose";

import User from "../models/user.model";
import { connect } from "../utils/dbConnection";
const request = supertest(app);
describe("User", () => {
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
  test("should not register a user with an existing email", async () => {
    const user = new User({
      name: "Test",
      email: "test123@test.com",
      password: "testTest123*&",
    });
    await user.save();
    const res = await request.post("/api/users/").send({
      name: "Test",
      email: "test123@test.com",
      password: "testTest123*&",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Email already exists");
  });
  test("should not register a user with an invalid email", async () => {
    const res = await request.post("/api/users/").send({
      name: "Test",
      email: "test123test.com",
      password: "testTest123*&",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid email");
  });
});
