import './App.css';
import Chessboard, {setPieces} from './components/Chessboard/Chessboard'
import {io} from "socket.io-client"

  
let socket = io(process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080', { transports: ["websocket"] });

socket.on("connect", () => {
  console.log("estamos conectados")
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  socket.emit('mensjae de oleh');
});

socket.on("connect_error", (err) => {
  console.log("socket error", err)
});

socket.on('dropPiecesBackend', (pieces) => {
  console.log('drop pieces desde backend', pieces);
  const newBoard = pieces
})


function App() {



  return (
    <div id='app'>
      <Chessboard socket={socket} />
    </div>
  );
}

export default App;
