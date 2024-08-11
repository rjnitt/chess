import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { ChessBoard } from "./ChessBoard";

import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  useEffect(() => {
    if (!socket) return;
    console.log("use effect called");
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME:
          setChess(new Chess());
          setBoard(chess.board());
          console.log("Game Init..");
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move Made!");
          break;
        case GAME_OVER:
          console.log("Game Over!!");
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div> connecting...</div>;
  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-3/4 bg-slate-600">
          <ChessBoard socket={socket} board={board} />
        </div>
        <div className="basis-1/4 bg-slate-400">
          <button
            onClick={() => {
              socket != null &&
                socket.send(JSON.stringify({ type: INIT_GAME }));
            }}
            className="rounded text-2xl mt-2 font-bold px-4 py-2 hover:bg-green-600 bg-green-500/100"
          >
            {" "}
            Start
          </button>
        </div>
      </div>
    </div>
  );
};
