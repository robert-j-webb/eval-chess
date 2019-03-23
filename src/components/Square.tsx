import React from 'react';
import '../App.css';
import Piece from '../models/pieces/piece';
import Color from '../static/color';

export default function Square(props: {
  style: { backgroundImage: string; backgroundColor?: string };
  onClick: () => void;
  shade: Color;
  piece?: Piece;
}) {
  return (
    <button
      data-testid={
        props.piece && props.piece.constructor.name + props.piece.idx
      }
      className={
        'square ' +
        (props.shade === Color.white ? 'light-square' : 'dark-square')
      }
      onClick={props.onClick}
      style={props.style}
    />
  );
}
