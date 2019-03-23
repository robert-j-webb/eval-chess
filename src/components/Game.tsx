import React from 'react';
import '../App.css';
import Piece from '../models/pieces/piece';
import Color from '../static/color';
import initializeChessBoard from '../static/initializeChessBoard';
import Board from './Board';
import FallenSoldierBlock from './FallenSoldiersBlock';

interface IState {
  squares: Piece[];
  whiteFallenSoldiers: any[];
  blackFallenSoldiers: any[];
  player: number;
  sourceSelection: number;
  status: string;
  turn: Color;
}

export default class Game extends React.Component {
  public state: IState;
  constructor(props, context: any) {
    super(props, context);
    this.state = {
      blackFallenSoldiers: [],
      player: 1,
      sourceSelection: -1,
      squares: initializeChessBoard(),
      status: '',
      turn: Color.white,
      whiteFallenSoldiers: []
    };
  }

  public handleClick(i) {
    const sourceSelection = this.state.sourceSelection;
    let squares = this.state.squares.slice();
    const modifySquare = (index, modifyFn: (s: Piece) => void) =>
      this.setState((current: IState) => {
        const clone = current.squares[index].clone();
        modifyFn(clone);
        current.squares[index] = clone;
        return current;
      });

    if (sourceSelection === -1) {
      if (!squares[i] || squares[i].player !== this.state.player) {
        this.setState(current => ({
          ...current,
          status:
            'Wrong selection. Choose player ' + this.state.player + ' pieces.'
        }));
        squares[i] ? delete squares[i].style.backgroundColor : null;
      } else {
        squares[i].style = {
          ...squares[i].style,
          backgroundColor: 'RGB(111,143,114)'
        }; // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
        this.setState(current => ({
          ...current,
          status: 'Choose destination for the selected piece',
          sourceSelection: i
        }));
      }
    } else if (sourceSelection > -1) {
      modifySquare(
        sourceSelection,
        square => (square.style.backgroundColor = '')
      );
      if (squares[i] && squares[i].player === this.state.player) {
        this.setState(current => ({
          ...current,
          status: 'Wrong selection. Choose valid source and destination again.',
          sourceSelection: -1
        }));
      } else {
        squares = this.state.squares.slice();
        const whiteFallenSoldiers = this.state.whiteFallenSoldiers.slice();
        const blackFallenSoldiers = this.state.blackFallenSoldiers.slice();
        const isDestEnemyOccupied = squares[i] ? true : false;
        const isMovePossible = squares[sourceSelection].isMovePossible(
          sourceSelection,
          i,
          isDestEnemyOccupied
        );
        const srcToDestPath = squares[sourceSelection].getSrcToDestPath(
          sourceSelection,
          i
        );
        const isMoveLegal = this.isMoveLegal(srcToDestPath);

        if (isMovePossible && isMoveLegal) {
          if (squares[i] !== null) {
            if (squares[i].player === 1) {
              whiteFallenSoldiers.push(squares[i]);
            } else {
              blackFallenSoldiers.push(squares[i]);
            }
          }
          squares[i] = squares[sourceSelection];
          squares[sourceSelection] = null;
          const player = this.state.player === 1 ? 2 : 1;
          const turn =
            this.state.turn === Color.white ? Color.black : Color.white;
          this.setState(current => ({
            ...current,
            sourceSelection: -1,
            squares,
            whiteFallenSoldiers,
            blackFallenSoldiers,
            player,
            status: '',
            turn
          }));
        } else {
          this.setState(current => ({
            ...current,
            status:
              'Wrong selection. Choose valid source and destination again.',
            sourceSelection: -1
          }));
        }
      }
    }
  }

  /**
   * Check all path indices are null. For one steps move of pawn/others or jumping moves of knight array is empty, so  move is legal.
   * @param  {[type]}  srcToDestPath [array of board indices comprising path between src and dest ]
   * @return {Boolean}
   */
  public isMoveLegal(srcToDestPath) {
    let isLegal = true;
    for (let i = 0; i < srcToDestPath.length; i++) {
      if (this.state.squares[srcToDestPath[i]] !== null) {
        isLegal = false;
      }
    }
    return isLegal;
  }

  public render() {
    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={this.state.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <h3>Turn</h3>
            <div
              id="player-turn-box"
              style={{
                backgroundColor:
                  this.state.turn === Color.white ? 'white' : 'black'
              }}
            />
            <div className="game-status">{this.state.status}</div>

            <div className="Fallen-soldier-block">
              {
                <FallenSoldierBlock
                  whiteFallenSoldiers={this.state.whiteFallenSoldiers}
                  blackFallenSoldiers={this.state.blackFallenSoldiers}
                />
              }
            </div>
          </div>
        </div>

        <div className="icons-attribution">
          <div>
            {' '}
            <small>
              {' '}
              Chess Icons And Favicon (extracted) By en:User:Cburnett [
              <a href="http://www.gnu.org/copyleft/fdl.html">GFDL</a>,{' '}
              <a href="http://creativecommons.org/licenses/by-sa/3.0/">
                CC-BY-SA-3.0
              </a>
              , <a href="http://opensource.org/licenses/bsd-license.php">BSD</a>{' '}
              or <a href="http://www.gnu.org/licenses/gpl.html">GPL</a>],{' '}
              <a href="https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces">
                via Wikimedia Commons
              </a>{' '}
            </small>
          </div>
        </div>
      </div>
    );
  }
}
