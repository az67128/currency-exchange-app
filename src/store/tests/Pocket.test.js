import Pocket from "../Pocket";
describe("Pocket unit test", () => {
  test("Pocket can be created", () => {
    const pocket = Pocket.create({ currency: "EUR" });
    expect(pocket.currency).toBe("EUR");
    expect(pocket.availableAmount).toBe(0);
    expect(pocket.exchangeAmount).toBe(0);
  });
  test("Can set converted value", () => {
    const pocket = Pocket.create({ currency: "EUR" });
    pocket.setConvertedValue(100);
    expect(pocket.exchangeAmount).toBe(-100);
  });
  test("Can exchange", () => {
    const pocket = Pocket.create({
      currency: "EUR",
      availableAmount: 100,
      exchangeAmount: -100
    });
    pocket.exchange();
    expect(pocket.availableAmount).toBe(0);
  });
});
