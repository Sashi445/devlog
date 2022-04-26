const supertest = require("supertest");
const app = require("./../server");

test("GET /users/info/:username", async () => {
  await supertest(app)
    .get("/users/info/djiajunustc")
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual(
        JSON.parse(`
        {"id":15307049,"username":"djiajunustc","avatar":"https://avatars.githubusercontent.com/u/15307049?v=4","followers":74,"following":26,"posts":[],"exists":false}
          `)
      );
    });
});


