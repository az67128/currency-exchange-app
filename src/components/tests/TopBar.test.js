import React from 'react';
import ReactDOM from 'react-dom';
import TopBar from '../TopBar';

describe('TopBar unit test', () => {
  it('TopBar renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TopBar />, div);
  });
  it('TopBar can display rate', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TopBar rate={'RATE'} />, div);
    expect(div.querySelector('.exchange__topBar div:nth-child(2)').innerHTML).toBe('RATE');
  });
  it('TopBar can render exchange button', () => {
    const canExchange = true;
    const div = document.createElement('div');
    ReactDOM.render(<TopBar canExchange={canExchange} />, div);
    expect(div.querySelectorAll('.topBar__button').length).toBe(1);
  });
  it('TopBar not render exchange button', () => {
    const canExchange = false;
    const div = document.createElement('div');
    ReactDOM.render(<TopBar canExchange={canExchange} />, div);
    expect(div.querySelectorAll('.topBar__button').length).toBe(0);
  });
});
