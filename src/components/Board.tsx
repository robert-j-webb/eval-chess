import React, { Component } from 'react';
import '../App.css';
import Piece from '../models/pieces/piece';
import Color from '../static/color';
import Square from './Square';

export default class Board extends Component {
  public props: { squares: Piece[]; onClick: (i: number) => void };
  public renderSquare(i: number, squareShade: Color, boardPosition: string) {
    return (
      <Square
        key={i}
        piece={this.props.squares[i]}
        style={this.props.squares[i] ? this.props.squares[i].style : null}
        shade={squareShade}
        onClick={() => this.props.onClick(i)}
        boardPosition={boardPosition}
      />
    );
  }

  public render() {
    const board = getEmptyArray().map(i => (
      <div key={i} className="board-row">
        {this.getSquareRows(i)}
      </div>
    ));

    return <div>{board}</div>;
  }

  private getSquareRows(i: number) {
    return getEmptyArray().map(j =>
      this.renderSquare(
        i * 8 + j,
        getSquareShade(i, j),
        String.fromCharCode(64 + j + 1) + (8 - i)
      )
    );
  }
}

function getEmptyArray(len = 8) {
  return Array(len)
    .fill(0)
    .map((_, idx) => idx);
}

function getSquareShade(i: number, j: number): Color {
  return (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
    ? Color.white
    : Color.black;
}

function isEven(num: number) {
  return num % 2 === 0;
}
