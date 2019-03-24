import React from 'react';
import { render } from 'react-testing-library';
import App from './App';

it('you can take a pawn', async () => {
  const { findByTestId } = render(<App />);
  const find = async function(sel): Promise<HTMLElement> {
    const elem = await findByTestId(sel);
    if (elem instanceof Error) {
      return null;
    }
    return elem;
  };
  const pawn1 = await find('E2');
  expect(pawn1).toBeTruthy();
  pawn1.click();
  let status = await find('status');
  expect(status.innerHTML).toEqual('Choose destination for the selected piece');
  const e4 = await find('E4');
  e4.click();
  status = await find('status');
  expect(status.innerHTML).toEqual('');
  const pawn2 = await find('D7');
  pawn2.click();
  const d5 = await find('D5');
  d5.click();
  expect(status.innerHTML).toEqual('');
  e4.click();
  d5.click();
  expect((await find('fallen-black-soldiers')).childElementCount).toEqual(1);
});
