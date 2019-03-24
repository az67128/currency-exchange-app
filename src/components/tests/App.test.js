import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Store from '../../store/Store';

const store = Store.create({
  pockets: [
    { currency: 'GBP', availableAmount: 2 },
    { currency: 'USD', availableAmount: 1 },
    { currency: 'EUR', availableAmount: 1 },
  ],
});

describe('App unit test', () => {
  it('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App store={store} />, div);
    expect(div.querySelector('.pocketView__currency').innerHTML).toBe('GBP');
    expect(div.querySelector('.pocketView__youHave').innerHTML).toBe('You have 2');
  });
});
