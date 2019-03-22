import React from "react";
import { observer } from "mobx-react";
import "../scss/Exchange.scss";
import PocketView from "./PocketView";
import Carousel from "nuka-carousel";

const Exchange = ({
  className,
  pockets,
  from,
  to,
  changeSlideFrom,
  changeSlideTo,
  setActivePocket,
  rate
}) => {
  return (
    <div className={`exchange ${className || ""}`}>
      <div className="exchange__fromCurrency currencyView">
        <Carousel wrapAround slideIndex={from} afterSlide={changeSlideFrom}>
          {pockets.map(pocket => (
            <PocketView
              key={pocket.currency}
              slideIndex={pockets.to}
              pocket={pocket}
              from
              setActivePocket={setActivePocket}
            />
          ))}
        </Carousel>
      </div>
      <div className="exchange__toCurrency currencyView">
        <Carousel wrapAround slideIndex={to} afterSlide={changeSlideTo}>
          {pockets.map(pocket => (
            <PocketView
              key={pocket.currency}
              pocket={pocket}
              setActivePocket={setActivePocket}
              rate={rate}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default observer(Exchange);
