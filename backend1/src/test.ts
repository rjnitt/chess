
const socket = new WebSocket('ws://localhost:8081');

socket.onopen = () => {
  console.log("WebSocket connection established");
  socket.send(JSON.stringify({ type: "init_game" }));
};

socket.onmessage = (event) => {
    console.log("Message from server: ", event.data);
  };
  
  socket.onerror = (error) => {
    console.error("WebSocket error: ", error);
  };
  
  socket.onclose = (event) => {
    console.log("WebSocket connection closed: ", event);
  };