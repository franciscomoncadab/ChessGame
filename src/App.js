import './App.css';
import Chessboard from './components/Chessboard/Chessboard'
import {io} from "socket.io-client"


console.log("creamos websocket !!!!");
  
let socket = io('http://localhost:8080', { transports: ["websocket"] });

socket.on("connect", () => {
  console.log("estamos conectados")
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  socket.emit('mensjae de oleh');
});

// socket.on("connect", (socket) => {
//   console.log("estamos conectados")
//   socket.emit('mensjae de oleh');
// });

socket.on("connect_error", (err) => {
  console.log("socket error", err)
});

socket.on('dropPiecesBackend', (pieces) => {
  console.log('drop pieces desde backend', pieces);
})

function App() {



  return (
    <div id='app'>
      <Chessboard socket={socket} />
    </div>
  );
}

export default App;
