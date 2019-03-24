import React from 'react';
import { render } from 'react-testing-library';
import Pawn from '../models/pieces/pawn';
import FallenSoldiersBlock from './FallenSoldiersBlock';

const DUMMY_URL = 'lorempixel.com/200/200/1';

async function getSoldiersBlock(jsx) {
  const { findByTestId } = render(jsx);
  const whiteSoldiers = (await findByTestId(
    'fallen-white-soldiers'
  )) as HTMLElement;
  return whiteSoldiers;
}

it('renders an empty fallen soldiers block', async () => {
  const whiteSoldiers = await getSoldiersBlock(
    <FallenSoldiersBlock whiteFallenSoldiers={[]} blackFallenSoldiers={[]} />
  );
  expect(whiteSoldiers).toBeTruthy();
  expect(whiteSoldiers.childElementCount).toEqual(0);
});

it('renders a square of a soldier block', async () => {
  const soldiers = [new Pawn(0, 0)];
  const whiteSoldiers = await getSoldiersBlock(
    <FallenSoldiersBlock
      whiteFallenSoldiers={soldiers}
      blackFallenSoldiers={[]}
    />
  );
  expect(whiteSoldiers).toBeTruthy();
  expect(whiteSoldiers.childElementCount).toEqual(1);
  expect(
    (whiteSoldiers.childNodes[0] as HTMLElement).getAttribute('data-pieceid')
  ).toEqual('Pawn0');
});
