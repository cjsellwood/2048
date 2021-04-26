import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [boardWidth, setBoardWidth] = useState(
    Math.min(0.8 * window.innerWidth, 0.7 * window.innerHeight)
  );

  // Create board
  const createBoard = () => {
    const board = [];
    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        row.push({
          left: j * 0.25,
          top: i * 0.25,
          occupied: false,
        });
      }
      board.push(row);
    }
    return board;
  };

  const [board, setBoard] = useState(createBoard());

  // Duplicate immutably
  const duplicateBoard = () => {
    const boardCopy = [];
    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        row.push({
          left: j * 0.25,
          top: i * 0.25,
          occupied: board[i][j].occupied,
        });
      }
      boardCopy.push(row);
    }
    return boardCopy;
  };


  const [tiles, setTiles] = useState([]);

  const spawnTile = () => {
    let occupied = true;
    let position;
    let row;
    let col;
    while (occupied) {
      row = Math.floor(Math.random() * 4);
      col = Math.floor(Math.random() * 4);
      position = board[row][col];
      occupied = position.occupied;
    }

    const newTile = {
      left: position.left,
      top: position.top,
      value: 2,
    };
    setTiles([...tiles, newTile]);

    // Set occupied on board
    const newBoard = duplicateBoard();
    newBoard[row][col].occupied = true;
    setBoard(newBoard);
  };

  // Update board width when window resized
  const windowResized = () => {
    setBoardWidth(Math.min(0.8 * window.innerWidth, 0.7 * window.innerHeight));
  };

  useEffect(() => {
    spawnTile();
    window.addEventListener("resize", windowResized);
  }, []);

  console.log(board);

  const move = () => {
    setBoard({ left: boardWidth * 0.25, top: 0 });
  };
  return (
    <div>
      <div className="App">
        {tiles.map((tile) => {
          const tileStyle = {
            left: `${tile.left * boardWidth}px`,
            top: `${tile.top * boardWidth}px`,
          };
          return (
            <div
              className="tile"
              style={tileStyle}
              key={`${tile.left}${tile.top}`}
            >
              <div>
                <p>{tile.value}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={move}>Move</button>
    </div>
  );
}

export default App;
