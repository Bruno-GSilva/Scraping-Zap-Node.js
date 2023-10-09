const { sum } = require("./scraping");

describe("math funcs", () => {
  //beforeAll
  beforeAll(() => {
    console.log("Inicialize");
  });
  //beforeAllFunc
  beforeEach(() => {
    console.log("clearAll()");
  });
  // tests
  it("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("adds 1 + 2 to equal 5", () => {
    expect(sum(1, 4)).toBe(5);
  });
  // after all
  afterAll(() => {
    console.log("acabou");
  });
  //afterAllFunc
  afterEach(() => {
    console.log("clearAll()");
  });
});