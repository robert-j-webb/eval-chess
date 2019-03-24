import React, { Component } from 'react';
import '../App.css';
import Piece from '../models/pieces/piece';
import Color from '../static/color';
import Square from './Square';

export default class Board extends Component {
  public props: { squares: Piece[]; onClick: (i: number) => void };
  public renderSquare(i, squareShade, boardPosition: string) {
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
    const board = [];
    for (let i = 0; i < 8; i++) {
      const squareRows = [];
      for (let j = 0; j < 8; j++) {
        const squareShade =
          (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
            ? Color.white
            : Color.black;
        squareRows.push(
          this.renderSquare(
            i * 8 + j,
            squareShade,
            String.fromCharCode(64 + j + 1) + (8 - i)
          )
        );
      }
      board.push(
        <div key={i} className="board-row">
          {squareRows}
        </div>
      );
    }

    return <div>{board}</div>;
  }
}

function isEven(num) {
  return num % 2 === 0;
}
