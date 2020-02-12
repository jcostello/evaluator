const request = require("supertest");
const app = require("../../app");

const Form = require("./../../models/form");
const formFactory = require("../../../test/factories/formFactory");

describe("GET /api/forms", () => {
  beforeEach(async () => {
    forms = formFactory.buildList(3);

    await Form.create(forms);
  });

  it("Test", async () => {
    const response = await request(app).get("/api/forms");

    expect(response.status).toBe(200);

    expect(response.body.length).toBe(3);
  });
});

describe("POST /api/forms", () => {
  it("Test", async () => {
    formData = formFactory.build();

    const response = await request(app)
      .post("/api/forms")
      .send(formData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(formData.name);
  });
});

describe("DELETE /api/forms", () => {
  it("Test", async () => {
    const formData = formFactory.build();
    const form = await Form.create(formData);

    const response = await request(app).delete(`/api/forms/${form.id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(formData.name);
  });
});
