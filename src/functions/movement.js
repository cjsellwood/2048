export const moveRight = (movedBoard, movedTiles) => {
    let didMove = false;
    for (let i = 3; i >= 0; i--) {
      for (let j = 0; j <= 3; j++) {
        const tile = movedTiles.filter((tile) => {
          return tile.left === i && tile.top === j;
        });

        // Stop if not a tile or in position would leave moved if moved
        if (!tile.length || i + 1 > 3) {
          continue;
        }
        console.log(i, j);

        // Get index of tile in state
        const index = movedTiles.findIndex(
          (tile) => tile.left === i && tile.top === j
        );
        console.log(index);

        // Get how far the tile can move
        let distance = 0;
        let k = i + 1;
        while (k <= 3 && !movedBoard[j][k].occupied) {
          console.log("movedBoard", movedBoard[j][k]);
          distance++;
          k++;
        }

        console.log("di", distance);

        // Return if nothing can move
        if (!distance) {
          continue;
        }

        // Move to right unoccupied space
        movedTiles[index].left = movedTiles[index].left + distance;
        movedTiles[index].leftFrom = movedTiles[index].left;

        movedBoard[j][i].occupied = false;
        movedBoard[j][i + distance].occupied = true;
        didMove = true;
      }
    }
    return { movedBoard, movedTiles, didMove };
  };
