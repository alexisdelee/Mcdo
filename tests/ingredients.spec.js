const { getTypeOfHttpCode, get, post } = require("./assets/http");

/* test("get all ingredients", async () => {
  const response = await get("/ingredients");

  expect(getTypeOfHttpCode(response.statusCode)).toBe(2);
  expect(response.body.items.length).not.toBe(0);
});

test("get an ingredient", async () => {
  const response = await get("/ingredients/5aae7a4fbdd2ad35bce7121c");

  expect(getTypeOfHttpCode(response.statusCode)).toBe(2);
  expect(response.body.items.length).not.toBe(0);
}); */

(async () => {
  const response = await post("/users/token/authorization", {
    login: "root",
    password: "root"
  }, {
    "Content-Type": "application/json"
  });

  console.log(response.body.token);
})();
