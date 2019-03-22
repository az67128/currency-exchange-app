import { types } from "mobx-state-tree";
import Pocket from "./Pocket";
import Rate from "./Rate";

const Store = types
  .model("Store", {
    pockets: types.array(Pocket),
    from: types.optional(types.number, 0),
    to: types.optional(types.number, 1),
    rates: types.array(Rate),
    rateRefreshSchedule: types.frozen(),
    activePocket: types.optional(
      types.enumeration("activePocket", ["from", "to"]),
      "from"
    )
  })
  .actions(store => ({
    setActivePocket(pocket) {
      store.activePocket = pocket;
      store.updateCurrentPockets();
    },
    resetExchangeAmount() {
      store.pockets.forEach(pocket => {
        pocket.setConvertedValue(0);
      });
    },

    exchange() {
      if (!store.canExchange) return;
      store.pockets[store.from].exchange();
      store.pockets[store.to].exchange();
      store.resetExchangeAmount();
    },

    changeSlideTo(index) {
      store.to = index;
      if (store.to === store.from) {
        const slideIndex =
          store.pockets.length - 1 === store.from ? 0 : store.from + 1;
        store.changeSlideFrom(slideIndex);
      }
      store.resetExchangeAmount();
    },

    changeSlideFrom(index) {
      store.from = index;
      if (store.to === store.from) {
        const slideIndex =
          store.pockets.length - 1 === store.to ? 0 : store.to + 1;
        store.changeSlideTo(slideIndex);
      }
      store.resetExchangeAmount();
    },

    getRates() {
      fetch(
        "https://cors-anywhere.herokuapp.com/https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml?72ccdfa65836f354d1f7e438e112d703"
      )
        .then(data => data.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => data.querySelectorAll("Cube[currency]"))
        .then(currencies =>
          [...currencies].map(currency => ({
            currency: currency.getAttribute("currency"),
            rate: Number(currency.getAttribute("rate"))
          }))
        )
        .then(rates => store.setRates(rates))
        .catch(err => console.log("Failed to get rates"))
        .finally(() => {
          store.updateCurrentPockets();
          // store.cheduleRateRefresh();
        });
    },

    updateCurrentPockets() {
      const activePocketIndex = store[store.activePocket];
      store.pockets[activePocketIndex].updateOppositeCurrency();
    },

    setRates(rates) {
      store.rates = rates;
    },

    cheduleRateRefresh() {
      clearTimeout(store.rateRefreshSchedule);
      store.rateRefreshSchedule = setTimeout(store.getRates, 10000);
    },

    afterCreate() {
      store.getRates();
    }
  }))
  .views(store => ({
    calculateRate(from, to) {
      let inEur = from.amount;
      if (from.currency !== "EUR") {
        const tmpEur = store.rates.find(
          rate => rate.currency === from.currency
        );
        if (!tmpEur) return 0;
        inEur = from.amount / tmpEur.rate;
      }
      if (to.currency === "EUR") return inEur;
      const targetCurrency = store.rates.find(
        rate => rate.currency === to.currency
      );
      if (!targetCurrency) return 0;
      return inEur * targetCurrency.rate;
    },

    get canExchange() {
      const from = store.pockets[store.from];
      return from.exchangeAmount * -1 <= from.availableAmount;
    },

    getPocketRate(direction) {
      const from = store.pockets[store[direction === "from" ? "from" : "to"]];
      const to = store.pockets[store[direction === "from" ? "to" : "from"]];
      return `1 ${from.currency} = ${Math.ceil(
        store.calculateRate(
          { currency: from.currency, amount: 1 },
          { currency: to.currency }
        ) * 1000
      ) / 1000} ${to.currency}`;
    }
  }));

export default Store;
