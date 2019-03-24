import Rate from "../Rate";
describe("Rate unit test", () => {
  test("Rate can be created", () => {
    const rate = Rate.create({ currency: "EUR", rate: 1.1 });
    expect(rate.currency).toBe("EUR");
    expect(rate.rate).toBe(1.1);
  });
});
