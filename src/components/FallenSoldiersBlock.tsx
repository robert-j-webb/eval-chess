import React from 'react';
import '../App.css';
import Piece from '../models/pieces/piece';
import Color from '../static/color';
import Square from './Square';

export default class FallenSoldierBlock extends React.Component {
  public props: { whiteFallenSoldiers: Piece[]; blackFallenSoldiers: Piece[] };

  public renderSquare(square: Piece, i, squareShade) {
    return (
      <Square
        key={i}
        piece={square}
        style={square.style}
        onClick={() => null}
        shade={squareShade}
      />
    );
  }

  public render() {
    return (
      <div>
        <div data-testid="fallen-white-soldiers" className="board-row">
          {this.props.whiteFallenSoldiers.map((ws, index) =>
            this.renderSquare(ws, index, Color.white)
          )}
        </div>
        <div data-testid="fallen-black-soldiers" className="board-row">
          {this.props.blackFallenSoldiers.map((bs, index) =>
            this.renderSquare(bs, index, Color.black)
          )}
        </div>
      </div>
    );
  }
}
