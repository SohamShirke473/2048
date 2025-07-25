document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.querySelector("#score");
  const resultDisplay = document.querySelector("#result");
  const width = 4;
  let squares = [];
  let score = 0;

  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
  }

  function generate() {
    const randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
    } else {
      generate();
    }
  }

  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (i % 4 !== 3 && squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
  }

  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + 4].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 4].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 4].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
  }

  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;

        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];

        console.log(newRow);
      }
    }
  }

  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;

        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];

        console.log("Left: ", newRow);
      }
    }
  }

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let column = [
        parseInt(squares[i].innerHTML),
        parseInt(squares[i + 4].innerHTML),
        parseInt(squares[i + 8].innerHTML),
        parseInt(squares[i + 12].innerHTML),
      ];

      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filteredColumn);

      squares[i].innerHTML = newColumn[0];
      squares[i + 4].innerHTML = newColumn[1];
      squares[i + 8].innerHTML = newColumn[2];
      squares[i + 12].innerHTML = newColumn[3];
    }
  }

  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let column = [
        parseInt(squares[i].innerHTML),
        parseInt(squares[i + 4].innerHTML),
        parseInt(squares[i + 8].innerHTML),
        parseInt(squares[i + 12].innerHTML),
      ];

      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = filteredColumn.concat(zeros);

      squares[i].innerHTML = newColumn[0];
      squares[i + 4].innerHTML = newColumn[1];
      squares[i + 8].innerHTML = newColumn[2];
      squares[i + 12].innerHTML = newColumn[3];
    }
  }
  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = "You WIN 🎉";
        document.removeEventListener("keydown", control);
      }
    }
  }

  function checkForGameOver() {
    let zeroCount = squares.filter((square) => square.innerHTML == 0).length;
    if (zeroCount === 0) {
      let canMove = false;

      for (let i = 0; i < 16; i++) {
        if (i % 4 !== 3 && squares[i].innerHTML === squares[i + 1].innerHTML) {
          canMove = true;
        }
        if (i < 12 && squares[i].innerHTML === squares[i + 4].innerHTML) {
          canMove = true;
        }
      }

      if (!canMove) {
        resultDisplay.innerHTML = "Game Over 💀";
        document.removeEventListener("keydown", control);
      }
    }
  }

  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generate();
    checkForWin();
    checkForGameOver();
  }

  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generate();
    checkForWin();
    checkForGameOver();
  }

  function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generate();
    checkForWin();
    checkForGameOver();
  }

  function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generate();
    checkForWin();
    checkForGameOver();
  }

  function control(e) {
    if (e.key === "ArrowRight") {
      keyRight();
    } else if (e.key === "ArrowLeft") {
      keyLeft();
    } else if (e.key === "ArrowUp") {
      keyUp();
    } else if (e.key === "ArrowDown") {
      keyDown();
    }
  }

  document.addEventListener("keydown", control);
  createBoard();
});
