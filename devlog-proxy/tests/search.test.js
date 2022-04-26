const supertest = require("supertest");
const app = require("./../server");

test("GET /search/:query", async () => {
  await supertest(app)
    .get("/search/djiajunustc")
    .expect(200)
    .then((response) => {
        expect(Array.isArray(response.body));
        expect(response.body.length).toEqual(1);
        expect(response.body[0]).toEqual(
            {
              "login": "djiajunustc",
              "id": 15307049,
              "node_id": "MDQ6VXNlcjE1MzA3MDQ5",
              "avatar_url": "https://avatars.githubusercontent.com/u/15307049?v=4",
              "gravatar_id": "",
              "url": "https://api.github.com/users/djiajunustc",
              "html_url": "https://github.com/djiajunustc",
              "followers_url": "https://api.github.com/users/djiajunustc/followers",
              "following_url": "https://api.github.com/users/djiajunustc/following{/other_user}",
              "gists_url": "https://api.github.com/users/djiajunustc/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/djiajunustc/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/djiajunustc/subscriptions",
              "organizations_url": "https://api.github.com/users/djiajunustc/orgs",
              "repos_url": "https://api.github.com/users/djiajunustc/repos",
              "events_url": "https://api.github.com/users/djiajunustc/events{/privacy}",
              "received_events_url": "https://api.github.com/users/djiajunustc/received_events",
              "type": "User",
              "site_admin": false,
              "score": 1
            }
          )

    });
});
