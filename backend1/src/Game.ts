import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { INIT_GAME, MOVE, GAME_OVER } from "./Message";
export class Game {
  player1: WebSocket;
  player2: WebSocket;
  private board: Chess;
  private moves: { from: string; to: string }[];
  private startTime: Date;
  private numberOfMoves: any;
  // private chess: Chess;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.startTime = new Date();
    this.moves = [];
    this.board = new Chess();
    this.numberOfMoves = 0;
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
        },
      })
    );

    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );
  }

  public makeMove(
    player: WebSocket,
    move: {
      from: string;
      to: string;
    }
  ) {
    console.log("make move called", move);

    if (this.numberOfMoves % 2 === 0 && player !== this.player1) {
      return;
    }
    if (this.numberOfMoves % 2 === 1 && player !== this.player2) {
      return;
    }
    try {
      this.board.move(move);
      this.moves.push(move);
      this.numberOfMoves++;
      console.log("Make moved!!");
    } catch (e) {
      console.error("error while moving", e);
      return;
    }

    if (this.board.isGameOver()) {
      this.player1.emit(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "white" : "black",
          },
        })
      );
      this.player2.emit(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "white" : "black",
          },
        })
      );
    }

    if (this.numberOfMoves % 2 === 0) {
      this.player2.emit(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    } else {
      this.player1.emit(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }
  }
}
