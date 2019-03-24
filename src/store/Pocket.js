import { types, getParent } from "mobx-state-tree";

const Pocket = types
  .model("Pocket", {
    currency: types.identifier,
    availableAmount: types.optional(types.number, 0),
    exchangeAmount: types.optional(types.number, 0)
  })
  .actions(pocket => ({
    onChange(e) {
      const value = Number(e.target.value.replace(/\s/g, ""));
      pocket.exchangeAmount = value;
      pocket.updateOppositeCurrency();
    },
    updateOppositeCurrency() {
      const store = getParent(pocket, 2);
      const exchangingToIndex =
        pocket.exchangeAmount > 0 ? store.from : store.to;
      const exchangedValue = getParent(pocket, 2).calculateRate(
        { currency: pocket.currency, amount: pocket.exchangeAmount },
        store.pockets[exchangingToIndex]
      );
      store.pockets[exchangingToIndex].setConvertedValue(exchangedValue);
    },
    setConvertedValue(value) {
      pocket.exchangeAmount = (Math.ceil(value * 100) / 100) * -1;
    },
    exchange() {
      pocket.availableAmount = pocket.availableAmount + pocket.exchangeAmount;
    }
  }))
  .views(pocket => ({
    get value() {
      return Math.ceil(pocket.availableAmount * 100) / 100;
    }
  }));
export default Pocket;
