window.addEventListener("DOMContentLoaded", () => {

    const grid = document.querySelector(".grid");
    const width = 8;
    const squares = [];
    let scoreDiv = document.getElementById("score");
    let score = 0

    const candyColors = [
        "url(/images/blue-candy.png)",
        "url(/images/green-candy.png)",
        "url(/images/yellow-candy.png)",
        "url(/images/orange-candy.png)",
        "url(/images/red-candy.png)",
        "url(/images/purple-candy.png)"  
    ]

    //create a game board
    function createBoard() {
        for(let i = 0; i < width * width; i++) {
            const square = document.createElement("div");
            square.setAttribute("draggable", true);
            square.setAttribute("id", i);
            let randomColor = Math.floor(Math.random() * candyColors.length);
            square.style.background = candyColors[randomColor]
            squares.push(square);
            grid.appendChild(square)
        }
    }
    createBoard()

    //Dragging candies
    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingdragged;
    let squareIdBeingReplaced;

    // squares.forEach(square => square.addEventListener("dragstart", dragStart));
    // squares.forEach(square => square.addEventListener("dragover", dragOver));
    // squares.forEach(square => square.addEventListener("dragenter", dragEnter));
    // squares.forEach(square => square.addEventListener("dragleave", dragLeave));
    // squares.forEach(square => square.addEventListener("dragend", dragEnd));
    // squares.forEach(square => square.addEventListener("drop", dragDrop));

    function dragStart() {
        colorBeingDragged = this.style.background;
        squareIdBeingdragged = parseInt(this.id)
        console.log(this.id, colorBeingDragged)
    }
    function dragOver(event) {
        event.preventDefault();
        // console.log(this.id, "dragOver")
    }
    function dragEnter(event) {
        event.preventDefault();
        // console.log(this.id,"dragEnter")
    }
    function dragLeave(){
        // console.log(this.id, "DragLeave")
    }
    function dragEnd() {
       //validMoves
        let validMoves = [
            squareIdBeingdragged - 1,
            squareIdBeingdragged - width,
            squareIdBeingdragged + 1,
            squareIdBeingdragged + width
        ]

        let legalMove = validMoves.includes(squareIdBeingReplaced);

        if(legalMove && squareIdBeingReplaced) {
            squareIdBeingReplaced = null;
        } else if(squareIdBeingReplaced && !legalMove) {
            squares[squareIdBeingReplaced].style.background = colorBeingReplaced;
            squares[squareIdBeingdragged].style.background = colorBeingDragged;
        } else {
            squares[squareIdBeingdragged].style.background = colorBeingDragged;
        }
    }

    //candies moveDown

    function candiesMoveDown() {
        for(let i = 0; i < 55; i++){
            if(squares[i + width].style.background === "") {
                squares[i + width].style.background = squares[i].style.background;
                squares[i].style.background = "";
            }
            const firstRow = [0,1,2,3,4,5,6,7];
            const isInFirstRow = firstRow.includes(i);

            if(isInFirstRow && squares[i].style.background ==="") {
                let randomColor = Math.floor(Math.random() * candyColors.length);
                squares[i].style.background = candyColors[randomColor];
            }
        } 
    }

    //rowOfThree

    function CheckRowOfThree() {
        for(let i = 0; i < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2];
            let firstSquareColor = squares[i].style.background;
            let firstSquareIsMissing = squares[i].style.background === "";
            
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,]

            if(notValid.includes(i)) {
                continue
            }

            if(rowOfThree.every((index) => squares[index].style.background === firstSquareColor && !firstSquareIsMissing)){
                score += 3
                scoreDiv.innerHTML = score;
                rowOfThree.forEach((index) => {
                    squares[index].style.background = "";
                })
            }
        }
    }

    //rowOfFour
    function CheckRowOfFour() {
        for(let i = 0; i < 60; i++) {
            let rowOfFour = [i, i+1, i+2, i+3];
            let firstSquareColor = squares[i].style.background;
            let firstSquareIsMissing = squares[i].style.background === "";
            let notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55];

            if(notValid.includes(i)) continue

            if(rowOfFour.every((index) => squares[index].style.background === firstSquareColor && !firstSquareIsMissing)){
                score += 4
                scoreDiv.innerHTML = score;
                rowOfFour.forEach((index) => {
                    squares[index].style.background = "";
                })
            }
        }
    }


        //colunmOfThree

        function CheckColumnOfThree() {
            for(let i = 0; i < 47; i++) {
                let columnOfThree = [i, i + width, i + (width*2)];
                let firstSquareColor = squares[i].style.background;
                const firstSquareIsMissing = squares[i].style.background === "";
                
                if(columnOfThree.every((index) => squares[index].style.background === firstSquareColor && !firstSquareIsMissing)){
                    score += 3
                    scoreDiv.innerHTML = score;
                    columnOfThree.forEach((index) => {
                        squares[index].style.background = "";
                    })
                }
            }
        }

        //colunmOfFour

        function CheckColumnOfFour() {
            for(let i = 0; i < 39; i++) {
                let columnOfFour = [i, i + width, i + (width*2), i + (width*3)];
                let firstSquareColor = squares[i].style.background;
                const firstSquareIsMissing = squares[i].style.background === "";
                
                if(columnOfFour.every((index) => squares[index].style.background === firstSquareColor && !firstSquareIsMissing)){
                    score += 4
                    scoreDiv.innerHTML = score;
                    columnOfFour.forEach((index) => {
                        squares[index].style.background = "";
                    })
                }
            }
        }

       
        //start the game
        document.querySelector(".start").addEventListener("click", () => {

            squares.forEach(square => square.addEventListener("dragstart", dragStart));
            squares.forEach(square => square.addEventListener("dragover", dragOver));
            squares.forEach(square => square.addEventListener("dragenter", dragEnter));
            squares.forEach(square => square.addEventListener("dragleave", dragLeave));
            squares.forEach(square => square.addEventListener("dragend", dragEnd));
            squares.forEach(square => square.addEventListener("drop", dragDrop));

                window.setInterval(() =>{
                    candiesMoveDown()
                    // generateCandies()
                    CheckRowOfFour()
                    CheckColumnOfFour();
                    CheckRowOfThree();
                    CheckColumnOfThree();
                    }, 100)
            })



    function dragDrop(){
        colorBeingReplaced = this.style.background;
        squareIdBeingReplaced = parseInt(this.id)
        squares[squareIdBeingdragged].style.background = colorBeingReplaced;
        this.style.background = colorBeingDragged;
    }


    

})