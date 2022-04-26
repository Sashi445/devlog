const supertest = require("supertest");
const app = require("./../server");

test("GET /tags/all", async () => {
  await supertest(app)
    .get("/tags/all")
    .expect(200)
    .then((response) => {
        expect(Array.isArray(response.body));
        expect(response.body.length).toEqual(3);
        expect(response.body[0].value).toBe("dev")

    });
});


