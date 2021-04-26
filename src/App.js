import "./App.css";
import { useState, useEffect, useRef } from "react";

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
          left: j,
          top: i,
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
          left: j,
          top: i,
          occupied: board[i][j].occupied,
        });
      }
      boardCopy.push(row);
    }
    return boardCopy;
  };

  const [tiles, setTiles] = useState([]);

  const duplicateTiles = () => {
    const newTiles = [];
    tiles.forEach((tile) => {
      newTiles.push({ ...tile });
    });
    return newTiles;
  };

  // Spawn new tile in random position
  const spawnTile = () => {
    let occupied = true;
    let position;
    let row;
    let col;

    // If board full don't spawn
    if (tiles.length === 16) {
      return;
    }

    // Search for empty space
    while (occupied) {
      row = Math.floor(Math.random() * 4);
      col = Math.floor(Math.random() * 4);
      position = board[row][col];
      occupied = position.occupied;
    }

    const newTile = {
      left: position.left,
      top: position.top,
      leftFrom: position.left,
      topFrom: position.top,
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

  // Move all tiles to the right
  const moveRight = () => {
    const newBoard = duplicateBoard();
    const newTiles = duplicateTiles();

    for (let i = 3; i >= 0; i--) {
      for (let j = 0; j <= 3; j++) {
        const tile = tiles.filter((tile) => {
          return tile.left === i && tile.top === j;
        });

        // Stop if not a tile or in position would leave board if moved
        if (!tile.length || i + 1 > 3) {
          continue;
        }
        console.log(i, j);

        // Get index of tile in state
        const index = tiles.findIndex(
          (tile) => tile.left === i && tile.top === j
        );
        console.log(index);

        // Get how far the tile can move
        let distance = 0;
        let k = i + 1;
        while (k <= 3 && !board[j][k].occupied) {
          console.log("board", board[j][k]);
          distance++;
          k++;
        }

        console.log("di", distance);

        // Move to right unoccupied space
        newTiles[index].left = newTiles[index].left + distance;
        newTiles[index].leftFrom = newTiles[index].left;

        newBoard[j][i].occupied = false;
        newBoard[j][i + distance].occupied = true;
      }
    }
    setTiles(newTiles);
    setBoard(newBoard);
  };

  // Press keys to move
  const keyPressed = (e) => {
    console.log(e);
    if (e.key === "ArrowRight") {
      moveRight();
    }
  };

  // Focus wrapper on start to allow key presses
  const wrapperRef = useRef(null);

  useEffect(() => {
    spawnTile();
    window.addEventListener("resize", windowResized);
    // window.addEventListener("keydown", keyPressed, false);
    wrapperRef.current.focus();
    // eslint-disable-next-line
  }, []);

  console.log(board);
  console.log("tiles", tiles);

  return (
    <div
      className="wrapper"
      onKeyDown={keyPressed}
      tabIndex="0"
      ref={wrapperRef}
    >
      <div className="App">
        {tiles.map((tile) => {
          const tileStyle = {
            left: `${tile.left * boardWidth * 0.25}px`,
            top: `${tile.top * boardWidth * 0.25}px`,
          };
          return (
            <div
              className="tile"
              key={`${tile.left}${tile.top}`}
              style={tileStyle}
            >
              <div>
                <p>{tile.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
