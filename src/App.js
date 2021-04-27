import "./App.css";
import { useState, useEffect, useRef } from "react";
import * as movement from "./functions/movement.js";

function App() {
  const [spawn, setSpawn] = useState(true);

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

  // Press keys to move
  const keyPressed = (e) => {
    const newBoard = duplicateBoard();
    let newTiles = duplicateTiles();

    // Reset topFrom and leftFrom
    newTiles = newTiles.map((tile) => {
      return { ...tile, topFrom: tile.top, leftFrom: tile.left };
    });

    let move = { didMove: false };
    switch (e.key) {
      case "d":
      case "ArrowRight":
        move = movement.moveRight(newBoard, newTiles);
        break;
      case "a":
      case "ArrowLeft":
        move = movement.moveLeft(newBoard, newTiles);
        break;
      case "w":
      case "ArrowUp":
        move = movement.moveUp(newBoard, newTiles);
        break;
      case "s":
      case "ArrowDown":
        move = movement.moveDown(newBoard, newTiles);
        break;
      default:
        break;
    }

    if (move.didMove) {
      setBoard(move.movedBoard);
      setTiles(move.movedTiles);
      setSpawn(true);
    }
  };

  // Focus wrapper on start to allow key presses
  const wrapperRef = useRef(null);

  useEffect(() => {
    window.addEventListener("resize", windowResized);
    wrapperRef.current.focus();
    // eslint-disable-next-line
  }, []);

  // Spawn on first load and if last movement set it to true
  if (spawn) {
    spawnTile();
    setSpawn(false);
  }

  // console.log(board);
  // console.log("tiles", tiles);

  return (
    <div
      className="wrapper"
      onKeyDown={keyPressed}
      tabIndex="0"
      ref={wrapperRef}
    >
      <div className="App">
        {tiles.map((tile, index) => {
          const tileStyle = {
            left: `${tile.left * boardWidth * 0.25}px`,
            top: `${tile.top * boardWidth * 0.25}px`,
            "--left": `${tile.left * boardWidth * 0.25}px`,
            "--leftFrom": `${tile.leftFrom * boardWidth * 0.25}px`,
            "--top": `${tile.top * boardWidth * 0.25}px`,
            "--topFrom": `${tile.topFrom * boardWidth * 0.25}px`,
            // animation: "slide 0.1s", Turn off for now
          };

          // If last fade in after movement
          if (index === tiles.length - 1) {
            tileStyle.animation = "fadeIn 0.3s cubic-bezier(1,0,1,.001)";
          }
          return (
            <div
              className="tile"
              key={`${tile.left}${tile.top}`}
              style={tileStyle}
            >
              <div className={`tile-${tile.value}`}>
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
