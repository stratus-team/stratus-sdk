import Client from "../src/Client";

describe("Stratus SDK Client", () => {
  // TODO: Checks for apiURL
  test("Constructs without throwing", () => {
    const client = new Client({ apiKey: "invalid", apiURL: "invalid" });
  });
});
