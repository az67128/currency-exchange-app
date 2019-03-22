import Store from "../Store";
describe("Store unit test", () => {
  test("store can be created", () => {
    const store = Store.create({
      pockets: [
        { currency: "GBP", availableAmount: 100 },
        { currency: "USD", availableAmount: 200 },
        { currency: "EUR", availableAmount: 300 }
      ]
    });
    expect(
      store.pockets.find(pocket => pocket.currency === "GBP").availableAmount
    ).toBe(100);
    expect(
      store.pockets.find(pocket => pocket.currency === "USD").availableAmount
    ).toBe(200);
    expect(
      store.pockets.find(pocket => pocket.currency === "EUR").availableAmount
    ).toBe(300);
  });
  test("store can set active pocket", () => {
    const store = Store.create({
      pockets: [
        { currency: "GBP", availableAmount: 100 },
        { currency: "USD", availableAmount: 200 }
      ]
    });
    store.setActivePocket("from");
    expect(store.activePocket).toBe("from");
  });
  test("store can reset values", () => {
    const store = Store.create({
      pockets: [
        { currency: "GBP", availableAmount: 100 },
        { currency: "USD", availableAmount: 200 }
      ]
    });
    store.resetExchangeAmount();
    expect(store.pockets[0].exchangeAmount).toBe(0);
    expect(store.pockets[1].exchangeAmount).toBe(0);
  });
  test("store can exchange", () => {
    const store = Store.create({
      pockets: [
        { currency: "EUR", availableAmount: 100 },
        { currency: "USD", availableAmount: 200 }
      ],
      from: 0,
      to: 1,
      rates: [{ currency: "USD", rate: 2 }]
    });
    store.pockets[0].onChange({ target: { value: "- 1" } });
    expect(store.pockets[0].exchangeAmount).toBe(-1);
    expect(store.pockets[1].exchangeAmount).toBe(2);
    store.exchange();
    expect(store.pockets[0].availableAmount).toBe(99);
    expect(store.pockets[1].availableAmount).toBe(202);
  });
});
