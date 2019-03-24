import React from 'react';
import { render } from 'react-testing-library';
import App from './App';

function initial() {
  const { findByTestId } = render(<App />);
  const find = async function(sel): Promise<HTMLElement> {
    const elem = await findByTestId(sel);
    if (elem instanceof Error) {
      return null;
    }
    return elem;
  };
  const click = async function(sel: string) {
    return (await find(sel.toUpperCase())).click();
  };

  const getStatus = async function(): Promise<string> {
    const status = await find('status');
    return status.innerHTML;
  };
  return { find, click, getStatus };
}

it('you can take a pawn with a pawn', async () => {
  const { find, click, getStatus } = initial();

  const pawn1 = await find('E2');
  expect(pawn1).toBeTruthy();
  pawn1.click();
  expect(await getStatus()).toEqual(
    'Choose destination for the selected piece'
  );
  click('e4');
  expect(await getStatus()).toEqual('');
  click('d7');
  click('d5');
  expect(await getStatus()).toEqual('');
  click('e4');
  click('e6');
  expect(await getStatus()).toEqual(
    'Wrong selection. Choose valid source and destination again.'
  );
  click('e4');
  click('d5');
  const fallenBlackSoldiers = await find('fallen-black-soldiers');
  expect(fallenBlackSoldiers.childElementCount).toEqual(1);
  expect(
    (fallenBlackSoldiers.childNodes[0] as HTMLElement).getAttribute(
      'data-pieceid'
    )
  ).toEqual('Pawn6');
});

it('you can take a pawn with a knight', async () => {
  const { find, click, getStatus } = initial();

  click('b1');
  click('c3');
  click('d7');
  click('d5');
  click('c3');
  click('d6');
  expect(await getStatus()).toEqual(
    'Wrong selection. Choose valid source and destination again.'
  );
  click('c3');
  click('d5');
  const fallenBlackSoldiers = await find('fallen-black-soldiers');
  expect(fallenBlackSoldiers.childElementCount).toEqual(1);
  expect(
    (fallenBlackSoldiers.childNodes[0] as HTMLElement).getAttribute(
      'data-pieceid'
    )
  ).toEqual('Pawn6');
});

it('you can take a pawn with a bishop', async () => {
  const { find, click, getStatus } = initial();

  click('d2');
  click('d4');
  click('h7');
  click('h6');
  click('c1');
  click('h7');
  expect(await getStatus()).toEqual(
    'Wrong selection. Choose valid source and destination again.'
  );
  click('c1');
  click('h6');
  const fallenBlackSoldiers = await find('fallen-black-soldiers');
  expect(fallenBlackSoldiers.childElementCount).toEqual(1);
  expect(
    (fallenBlackSoldiers.childNodes[0] as HTMLElement).getAttribute(
      'data-pieceid'
    )
  ).toEqual('Pawn14');
});

it('you can take a pawn with a queen', async () => {
  const { find, click, getStatus } = initial();

  click('e2');
  click('e4');
  click('h7');
  click('h5');
  click('d1');
  click('h6');
  expect(await getStatus()).toEqual(
    'Wrong selection. Choose valid source and destination again.'
  );
  click('d1');
  click('h5');
  const fallenBlackSoldiers = await find('fallen-black-soldiers');
  expect(fallenBlackSoldiers.childElementCount).toEqual(1);
  expect(
    (fallenBlackSoldiers.childNodes[0] as HTMLElement).getAttribute(
      'data-pieceid'
    )
  ).toEqual('Pawn14');
});

it('you can take a pawn with a rook', async () => {
  const { find, click, getStatus } = initial();

  click('h2');
  click('h4');
  click('g7');
  click('g5');
  click('e2');
  click('e4');
  click('g5');
  click('h4');
  click('h1');
  click('h5');
  expect(await getStatus()).toEqual(
    'Wrong selection. Choose valid source and destination again.'
  );
  click('h1');
  click('h4');
  const fallenBlackSoldiers = await find('fallen-black-soldiers');
  expect(fallenBlackSoldiers.childElementCount).toEqual(1);
  expect(
    (fallenBlackSoldiers.childNodes[0] as HTMLElement).getAttribute(
      'data-pieceid'
    )
  ).toEqual('Pawn12');
});

it('you can take a pawn with a king', async () => {
  const { find, click, getStatus } = initial();

  click('e2');
  click('e4');
  click('d7');
  click('d5');
  click('e1');
  click('e2');
  click('d5');
  click('e4');
  click('e2');
  click('e3');
  click('h7');
  click('h5');
  click('e3');
  click('e5');
  expect(await getStatus()).toEqual(
    'Wrong selection. Choose valid source and destination again.'
  );
  click('e3');
  click('e4');
  const fallenBlackSoldiers = await find('fallen-black-soldiers');
  expect(fallenBlackSoldiers.childElementCount).toEqual(1);
  expect(
    (fallenBlackSoldiers.childNodes[0] as HTMLElement).getAttribute(
      'data-pieceid'
    )
  ).toEqual('Pawn6');
});

it('shows helpful message when moving wrong pieces', async () => {
  const { click, getStatus } = initial();

  click('e2');
  expect(await getStatus()).toEqual(
    'Choose destination for the selected piece'
  );
  click('e4');
  click('e4');
  expect(await getStatus()).toEqual('Wrong selection. Choose player 2 pieces.');
  click('d7');
  click('e6');
  expect(await getStatus()).toEqual(
    'Wrong selection. Choose valid source and destination again.'
  );
});
