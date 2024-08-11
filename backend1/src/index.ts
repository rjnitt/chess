import { WebSocket, WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const wss = new WebSocketServer({ port: 8081 });

const gameManager = new GameManager();

wss.on("connection", function connection(ws) {
  gameManager.addUser(ws);
    ws.on("disconnect", ()=> gameManager.removeUser(ws));

  // ws.on("error", console.error);

  // ws.on("message", function message(data) {
  //   console.log("message:::" + data);
    
  // });

});
