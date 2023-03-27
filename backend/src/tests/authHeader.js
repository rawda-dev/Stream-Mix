import User from "../models/user.model";
import supertest from "supertest";
import app from "../server";
const request = supertest(app);

export let user;
export const createUser = async () => {
  user = new User({
    name: "Test",
    email: "test1@test.com",
    password: "testTest123*&",
  });
  user = await user.save();
  return user;
};
export const getUserHeader = async () => {
  const res = await request.post("/api/auth/login").send({
    email: "test1@test.com",
    password: "testTest123*&",
  });

  return res.body.token;
};
