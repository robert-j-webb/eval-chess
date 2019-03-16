import React from 'react';
import '../App.css';
import Piece from '../models/pieces/piece';

export default function Square(props: {
  style: { backgroundImage: string; backgroundColor: string };
  onClick: () => void;
  shade: string;
  piece: Piece;
}) {
  return (
    <button
      className={'square ' + props.shade}
      onClick={props.onClick}
      style={props.style}
    />
  );
}
