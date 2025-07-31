import request from "supertest";
import app from "../app.js";

//  Positive test
describe("GET /users", () => {
  it("should return all users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return specific user by username", async () => {
    const res = await request(app).get("/users?username=jdoe");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].username.toLowerCase()).toContain("jdoe");
  });

  it("should return 400 if username is empty string", async () => {
    const res = await request(app).get("/users?username=");
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(/username is required/i);
  });
});

// Negative test for creation

describe("POST /users", () => {
  it("should return 400 if required fields missing", async () => {
    const res = await request(app)
      .post("/users")
      .send({ username: "", password: "" });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(/username and password are required/i);
  });

  it("should return 400 if user already exists", async () => {
    await request(app).post("/users").send({
      username: "existinguser",
      password: "password",
      name: "Existing User",
      email: "exist@example.com",
      phoneNumber: "123456789",
    });

    const res = await request(app).post("/users").send({
      username: "existinguser",
      password: "password",
      name: "Existing User",
      email: "exist@example.com",
      phoneNumber: "123456789",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(/username already exists/i);
  });
});
