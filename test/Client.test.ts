import Client from "../src/Client";

describe("Stratus SDK Client", () => {
  test("Constructs without throwing", () => {
    new Client({ apiKey: "invalid" });
  });
});
