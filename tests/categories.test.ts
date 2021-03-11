const  fetch = require("fetch");

describe("Human jest", () => {
     
 
  it("Human should have a name", () => {
    console.log("I'm alive")
  });

  it("get categories", () => {
    
    fetch("http://localhost:3000/categories").then(response => response.json())
    .then(data => console.log(data));
    console.log(fetch)
  })

  it.todo("get single categories")

  it.todo("patch categories")

  it.todo("delete categories")

  it.todo("create categories")

  // it("should return 2 for Human Legs", () => {
  //   expect(instance.getLegs()).toBe(2);
  // });

  // it.todo("Algo que tengo que codear")

  // it.skip("should return 4 for Human Legs", () => {
  //   expect(instance.getLegs()).toBe(4);
  // });
});