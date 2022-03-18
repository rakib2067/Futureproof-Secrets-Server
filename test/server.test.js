const request = require("supertest");
const app = require("../server.js");
// const Pdata = require("../assets/post.json");qq
const model = require("../models/model");

describe("server testing", () => {
  let testapp;
  let testPost = {
    id: 1,
    title: "Test",
    content: "Hello",
    giphy: "https://www.google.com/",
    emo1: 0,
    emo2: 0,
    emo3: 0,
    comment: [],
  };
  let testPost2 = {
    id: 2,
    title: "Test2",
    content: "Hello2",
    giphy: "https://www.google.com/",
    emo1: 0,
    emo2: 0,
    emo3: 0,
    comment: [],
  };
  let testComment = {
    id: 1,
    comment: { datetime: "10/3/2022 - 18:9:6", input: "Hello" },
  };
  let testComment2 = {
    id: 1,
    comment: { datetime: "10/3/2022 - 18:9:6", input: "Hello2" },
  };
  let testEmojiData = {
    id: 1,
    emo: "emo1",
  };

  beforeAll(() => {
    testapp = app.listen(5000, () => {
      console.log(`running the test server`);
    });
  });

  afterAll(function (done) {
    console.log("stopping test server");
    testapp.close(done);
  });

  it("get all post", (done) => {
    request(testapp).get("/").expect(200, done);
  });

  it("responds to post /create with status 201", (done) => {
    request(testapp)
      .post("/create")
      .send(testPost)
      .set("Accept", "application/json")
      .expect(201)
      .expect(
        {
          id: 1,
          title: "Test",
          content: "Hello",
          giphy: "https://www.google.com/",
          emo1: 0,
          emo2: 0,
          emo3: 0,
          comment: [],
        },
        done
      );
  });
  it("responds to post /create for a second post with status 201", (done) => {
    request(testapp)
      .post("/create")
      .send(testPost2)
      .set("Accept", "application/json")
      .expect(201)
      .expect(
        {
          id: 2,
          title: "Test2",
          content: "Hello2",
          giphy: "https://www.google.com/",
          emo1: 0,
          emo2: 0,
          emo3: 0,
          comment: [],
        },
        done
      );
  });

  it("responds to post /comment with status 201", (done) => {
    request(testapp)
      .post("/comment")
      .send(testComment)
      .set("Accept", "application/json")
      .expect(201)
      .expect(
        {
          id: 1,
          title: "Test",
          content: "Hello",
          giphy: "https://www.google.com/",
          emo1: 0,
          emo2: 0,
          emo3: 0,
          comment: [{ datetime: "10/3/2022 - 18:9:6", input: "Hello" }],
        },
        done
      );
  });
  it("responds to post /comment with status 200", (done) => {
    request(testapp)
      .post("/comment")
      .send(testComment2)
      .set("Accept", "application/json")
      .expect(201)
      .expect(
        {
          id: 1,
          title: "Test",
          content: "Hello",
          giphy: "https://www.google.com/",
          emo1: 0,
          emo2: 0,
          emo3: 0,
          comment: [
            { datetime: "10/3/2022 - 18:9:6", input: "Hello" },
            { datetime: "10/3/2022 - 18:9:6", input: "Hello2" },
          ],
        },
        done
      );
  });
  it("responds to post /emo with status 200", (done) => {
    request(testapp)
      .post("/emo")
      .send(testEmojiData)
      .set("Accept", "application/json")
      .expect(200)
      .expect(
        {
          id: 1,
          title: "Test",
          content: "Hello",
          giphy: "https://www.google.com/",
          emo1: 1,
          emo2: 0,
          emo3: 0,
          comment: [
            { datetime: "10/3/2022 - 18:9:6", input: "Hello" },
            { datetime: "10/3/2022 - 18:9:6", input: "Hello2" },
          ],
        },
        done
      );
  });
  it("responds to post /create with status 404", (done) => {
    request(testapp)
      .post("/create")
      .send({})
      .set("Accept", "application/json")
      .expect(404, done);
  });
  it("responds to post /comment with status 404", (done) => {
    request(testapp)
      .post("/comment")
      .send({ id: 1, comment: "" })
      .set("Accept", "application/json")
      .expect(404, done);
  });
});
