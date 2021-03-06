// Get index of current tile in tiles array
const getIndex = (tiles, left, top) => {
  return tiles.findIndex((tile) => tile.left === left && tile.top === top);
};

export const moveRight = (movedBoard, movedTiles, movedScore) => {
  let didMove = false;
  for (let i = 3; i >= 0; i--) {
    for (let j = 0; j <= 3; j++) {
      // Get index of tile in state
      const index = getIndex(movedTiles, i, j);

      // Stop if not a tile
      if (index === -1) continue;

      // Get how far the tile can move
      let distance = 0;
      let k = i + 1;
      while (k <= 3 && !movedBoard[j][k].occupied) {
        distance++;
        k++;
      }

      // Get index of hit tile
      const hitIndex = getIndex(movedTiles, i + distance + 1, j);

      // Check if can merge
      if (
        distance + i + 1 <= 3 &&
        movedBoard[j][i + distance + 1].occupied &&
        hitIndex !== -1 &&
        movedTiles[hitIndex].value === movedTiles[index].value
      ) {
        // Add to score
        movedScore += movedTiles[hitIndex].value * 2;

        // Change value of hit tile
        movedTiles[hitIndex].value *= 2;

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

        movedBoard[j][i].occupied = false;
        movedBoard[j][i + distance].occupied = true;
        didMove = true;
      }
    }
  }
  return { movedBoard, movedTiles, didMove, movedScore };
};

export const moveLeft = (movedBoard, movedTiles, movedScore) => {
  let didMove = false;
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
      // Get index of tile in state
      const index = getIndex(movedTiles, i, j);

      // Stop if not a tile
      if (index === -1) continue;

      // Get how far the tile can move
      let distance = 0;
      let k = i - 1;
      while (k >= 0 && !movedBoard[j][k].occupied) {
        distance++;
        k--;
      }

      // Get index of hit tile
      const hitIndex = getIndex(movedTiles, i - distance - 1, j);

      // Check if can merge
      if (
        i - distance - 1 >= 0 &&
        movedBoard[j][i - distance - 1].occupied &&
        hitIndex !== -1 &&
        movedTiles[hitIndex].value === movedTiles[index].value
      ) {
        // Add to score
        movedScore += movedTiles[hitIndex].value * 2;

        // Change value of hit tile
        movedTiles[hitIndex].value *= 2;

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
        movedTiles[index].left = movedTiles[index].left - distance;

        movedBoard[j][i].occupied = false;
        movedBoard[j][i - distance].occupied = true;
        didMove = true;
      }
    }
  }
  return { movedBoard, movedTiles, didMove, movedScore };
};

export const moveUp = (movedBoard, movedTiles, movedScore) => {
  let didMove = false;
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
      // Get index of tile in state
      const index = getIndex(movedTiles, j, i);

      // Stop if not a tile
      if (index === -1) continue;

      // Get how far the tile can move
      let distance = 0;
      let k = i - 1;
      while (k >= 0 && !movedBoard[k][j].occupied) {
        distance++;
        k--;
      }

      // Get index of hit tile
      const hitIndex = getIndex(movedTiles, j, i - distance - 1);

      // Check if can merge
      if (
        i - distance - 1 >= 0 &&
        movedBoard[i - distance - 1][j].occupied &&
        hitIndex !== -1 &&
        movedTiles[hitIndex].value === movedTiles[index].value
      ) {
        // Add to score
        movedScore += movedTiles[hitIndex].value * 2;

        // Change value of hit tile
        movedTiles[hitIndex].value *= 2;

        // Delete current tile
        movedTiles.splice(index, 1);

        // Change to unoccupied
        movedBoard[i][j].occupied = false;

        didMove = true;
      } else {
        // Return if nothing can move
        if (!distance) {
          continue;
        }
        // Move to right unoccupied space
        movedTiles[index].topFrom = movedTiles[index].top;
        movedTiles[index].top = movedTiles[index].top - distance;

        movedBoard[i][j].occupied = false;
        movedBoard[i - distance][j].occupied = true;
        didMove = true;
      }
    }
  }
  return { movedBoard, movedTiles, didMove, movedScore };
};

export const moveDown = (movedBoard, movedTiles, movedScore) => {
  let didMove = false;
  for (let i = 3; i >= 0; i--) {
    for (let j = 0; j <= 3; j++) {
      // Get index of tile in state
      const index = getIndex(movedTiles, j, i);

      // Stop if not a tile
      if (index === -1) continue;

      // Get how far the tile can move
      let distance = 0;
      let k = i + 1;
      while (k <= 3 && !movedBoard[k][j].occupied) {
        distance++;
        k++;
      }

      // Get index of hit tile
      const hitIndex = getIndex(movedTiles, j, i + distance + 1);

      // Check if can merge
      if (
        i + distance + 1 <= 3 &&
        movedBoard[i + distance + 1][j].occupied &&
        hitIndex !== -1 &&
        movedTiles[hitIndex].value === movedTiles[index].value
      ) {
        // Add to score
        movedScore += movedTiles[hitIndex].value * 2;

        // Change value of hit tile
        movedTiles[hitIndex].value *= 2;

        // Delete current tile
        movedTiles.splice(index, 1);

        // Change to unoccupied
        movedBoard[i][j].occupied = false;

        didMove = true;
      } else {
        // Return if nothing can move
        if (!distance) {
          continue;
        }

        // Move to right unoccupied space
        movedTiles[index].topFrom = movedTiles[index].top;
        movedTiles[index].top = movedTiles[index].top + distance;

        movedBoard[i][j].occupied = false;
        movedBoard[i + distance][j].occupied = true;
        didMove = true;
      }
    }
  }
  return { movedBoard, movedTiles, didMove, movedScore };
};
