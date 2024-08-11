import { WebSocket } from "ws";
import { Game } from "./Game";
import { INIT_GAME, MOVE, GAME_OVER } from "./Message";

export class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];

  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  public addUser(socket: WebSocket) {
    console.log("Adding user");
    this.users.push(socket);
    this.addHandler(socket);
  }

  public removeUser(socket: WebSocket) {
    console.log("Removing user");
    this.users = this.users.filter((user) => user !== socket);
  }

  private addHandler(socket: WebSocket) {
    console.log("inside handle message: ");

    socket.on("message", (data) => {
      // console.log("data inside handle message1: ", data);
      const message = JSON.parse(data.toString());
      console.log("data inside handle message2: ", message);

      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
          // start game
          console.log("Starting game with pending user");
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          console.log("Setting pending user");
          this.pendingUser = socket;
        }
      }
      if (message.type === MOVE) {
        // this.games.filter(game => game.player1 === socket || game.player2===socket)
        const game = this.games.find(
          (game) => game.player1 === socket || game.player2 === socket
        );
        game?.makeMove(socket, message.move);
      }
    });
  }
}
