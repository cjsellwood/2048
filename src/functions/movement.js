export const moveRight = (movedBoard, movedTiles) => {
  let didMove = false;
  for (let i = 3; i >= 0; i--) {
    for (let j = 0; j <= 3; j++) {
      const tile = movedTiles.filter((tile) => {
        return tile.left === i && tile.top === j;
      });

      // Stop if not a tile or in position would leave moved if moved
      if (!tile.length || i === 3) {
        continue;
      }

      // Get index of tile in state
      const index = movedTiles.findIndex(
        (tile) => tile.left === i && tile.top === j
      );

      // Get how far the tile can move
      let distance = 0;
      let k = i + 1;
      while (k <= 3 && !movedBoard[j][k].occupied) {
        distance++;
        k++;
      }

      // Get index of hit tile
      const hitIndex = movedTiles.findIndex(
        (tile) => tile.left === i + distance + 1 && tile.top === j
      );

      // Check if can merge
      if (
        distance + i + 1 <= 3 &&
        movedBoard[j][i + distance + 1].occupied &&
        hitIndex !== -1 &&
        movedTiles[hitIndex].value === movedTiles[index].value
      ) {
        console.log("merge");

        console.log("mer", movedTiles[index], movedTiles[hitIndex]);

        // If values equal merge tiles

        console.log("go");
        // Change value of hit tile
        movedTiles[hitIndex].value = movedTiles[hitIndex].value * 2;

        // Delete current tile
        movedTiles.splice(index, 1);

        // Change to unoccupied
        movedBoard[j][i].occupied = false;

        didMove = true;
      } else {
        // Return if nothing can move
        if (!distance) {
          continue;
        }

        // Move to right unoccupied space
        movedTiles[index].leftFrom = movedTiles[index].left;
        movedTiles[index].left = movedTiles[index].left + distance;

        console.log(movedTiles);

        movedBoard[j][i].occupied = false;
        movedBoard[j][i + distance].occupied = true;
        didMove = true;
      }
    }
  }
  return { movedBoard, movedTiles, didMove };
};

export const moveLeft = (movedBoard, movedTiles) => {
  let didMove = false;
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
      const tile = movedTiles.filter((tile) => {
        return tile.left === i && tile.top === j;
      });

      // Stop if not a tile or in position would leave moved if moved
      if (!tile.length || i === 0) {
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
      let k = i - 1;
      console.log("movedBoard", movedBoard[j][k]);
      while (k >= 0 && !movedBoard[j][k].occupied) {
        console.log("k", k);
        console.log("movedBoard", movedBoard[j][k]);
        distance++;
        k--;
      }

      console.log("di", distance);

      // Return if nothing can move
      if (!distance) {
        continue;
      }

      // Move to right unoccupied space
      movedTiles[index].leftFrom = movedTiles[index].left;
      movedTiles[index].topFrom = movedTiles[index].top;
      movedTiles[index].left = movedTiles[index].left - distance;

      movedBoard[j][i].occupied = false;
      movedBoard[j][i - distance].occupied = true;
      didMove = true;
    }
  }
  return { movedBoard, movedTiles, didMove };
};

export const moveUp = (movedBoard, movedTiles) => {
  let didMove = false;
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
      const tile = movedTiles.filter((tile) => {
        return tile.left === j && tile.top === i;
      });

      // Stop if not a tile or in position would leave moved if moved
      if (!tile.length || i === 0) {
        continue;
      }
      console.log({ i, j });

      // Get index of tile in state
      const index = movedTiles.findIndex(
        (tile) => tile.left === j && tile.top === i
      );
      console.log(index);

      // Get how far the tile can move
      let distance = 0;
      let k = i - 1;
      while (k >= 0 && !movedBoard[k][j].occupied) {
        console.log("movedBoard", movedBoard[k][j]);
        distance++;
        k--;
      }

      console.log("di", distance);

      // Return if nothing can move
      if (!distance) {
        continue;
      }

      // Move to right unoccupied space
      movedTiles[index].topFrom = movedTiles[index].top;
      movedTiles[index].leftFrom = movedTiles[index].left;
      movedTiles[index].top = movedTiles[index].top - distance;

      movedBoard[i][j].occupied = false;
      movedBoard[i - distance][j].occupied = true;
      didMove = true;
    }
  }
  return { movedBoard, movedTiles, didMove };
};

export const moveDown = (movedBoard, movedTiles) => {
  let didMove = false;
  for (let i = 3; i >= 0; i--) {
    for (let j = 0; j <= 3; j++) {
      const tile = movedTiles.filter((tile) => {
        return tile.left === j && tile.top === i;
      });

      // Stop if not a tile or in position would leave moved if moved
      if (!tile.length || i === 3) {
        continue;
      }
      console.log(i, j);

      // Get index of tile in state
      const index = movedTiles.findIndex(
        (tile) => tile.left === j && tile.top === i
      );
      console.log(index);

      // Get how far the tile can move
      let distance = 0;
      let k = i + 1;
      while (k <= 3 && !movedBoard[k][j].occupied) {
        console.log("movedBoard", movedBoard[k][j]);
        distance++;
        k++;
      }

      console.log("di", distance);

      // Return if nothing can move
      if (!distance) {
        continue;
      }

      // Move to right unoccupied space
      movedTiles[index].topFrom = movedTiles[index].top;
      movedTiles[index].leftFrom = movedTiles[index].left;
      movedTiles[index].top = movedTiles[index].top + distance;

      movedBoard[i][j].occupied = false;
      movedBoard[i + distance][j].occupied = true;
      didMove = true;
    }
  }
  return { movedBoard, movedTiles, didMove };
};
