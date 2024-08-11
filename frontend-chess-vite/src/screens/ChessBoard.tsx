import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

export const ChessBoard = ({
  board,
  socket,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];

  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<Square | null>();
  const [to, setTo] = useState<Square | null>();
  return (
    <div>
      {JSON.stringify(board)}
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;
              return (
                <div
                  onClick={() => {
                    if (!from) {
                      setFrom(squareRepresentation);
                    } else {
                      setTo(squareRepresentation);
                      socket.send(
                        JSON.stringify({
                          type: "move",
                          payload: { from, to },
                        })
                      );
                      setFrom(null);
                    }
                  }}
                  key={j}
                  className={`w-16 h-16 ${
                    (i + j) % 2 === 0 ? "bg-green-500" : "bg-slate-500"
                  }`}
                >
                  {square ? square.type : ""}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
