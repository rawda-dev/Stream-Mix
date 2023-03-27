import app from "../server";
import supertest from "supertest";
import mongoose from "mongoose";

import User from "../models/user.model";
import { connect } from "../utils/dbConnection";
import { user, createUser, getUserHeader } from "./authHeader";
const request = supertest(app);
beforeAll(async () => {
  await connect();
});
afterAll(async () => {
  await mongoose.connection.close();
});
afterEach(async () => {
  await User.deleteMany({});
});
describe("POST /api/users", () => {
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
describe("DELETE /api/users/:userId", () => {
  test("should delete a user", async () => {
    await createUser();
    const authHeader = await getUserHeader();

    const res = await request
      .delete(`/api/users/${user._id}`)
      .set("Authorization", `Bearer ${authHeader}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe("test1@test.com");
    expect(res.body.name).toBe("Test");
  });
  test("should not delete user with invalid credentials", async () => {
    await createUser();
    const authHeader = await getUserHeader();

    const res = await request
      .delete(`/api/users/${user._id}`)
      .set("Authorization", `Bearer ${authHeader}123`);
    expect(res.status).toBe(401);
    expect(res.body.error).toContain("Unauthorized");
  });
});
describe("GET /api/users/:userId", () => {
  test("should get a user", async () => {
    await createUser();
    const authHeader = await getUserHeader();
    const res = await request
      .get(`/api/users/${user._id}`)
      .set("Authorization", `Bearer ${authHeader}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe("test1@test.com");
    expect(res.body.name).toBe("Test");
  });
  test("should not get user with invalid credentials", async () => {
    await createUser();
    const authHeader = await getUserHeader();
    const res = await request
      .get(`/api/users/${user._id}`)
      .set("Authorization", `Bearer ${authHeader}123`);
    expect(res.status).toBe(401);
    expect(res.body.error).toContain("Unauthorized");
  });
});

describe("PUT /api/users/:userId", () => {
  test("should update a user", async () => {
    await createUser();
    const authHeader = await getUserHeader();
    const res = await request
      .put(`/api/users/${user._id}`)
      .set("Authorization", `Bearer ${authHeader}`)
      .set({ connetion: "keep-alive" })
      .field("name", "Test2");

    expect(res.status).toBe(200);
    expect(res.body.email).toBe("test1@test.com");
    expect(res.body.name).toBe("Test2");
  });
});
