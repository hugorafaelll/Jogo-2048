let board;
let score = 0;
let rows = 4 ;
let columns = 4;

window.onload=function () {
    setGame();
}

function setGame(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]


    for (let r=0; r<rows; r++) {
        for (let c=0;c<columns; c++){
            //criar <div id="0-0"></div> para cada box 
            let tile = document.createElement("div");
            tile.id = r.toString() + "-"+ c.toString();
            let num = board[r][c];
            updateTile(tile,num);
            document.getElementById("board").append(tile)
        }
    }/// cria 2 para comecar o jogo 
    setTwo();
    setTwo();
}

function updateTile(tile,num){
    tile.innerText = "";
    tile.classList.value =""; //limpa as classes 
    tile.classList.add("tile");
    if (num>0){
        tile.innerText = num.toString();
        if (num <= 4096){
            tile.classList.add("x"+num.toString());
        }else{
            tile.classList.add("x8192");
        }
    }
}


document.addEventListener("keyup", (e)=>{ // keyup e quando terminamos de apertar um botao ele toma uma ação 
    if(e.code == "ArrowLeft"){
        slideLeft();
        setTwo();   // every time move arrow at any position add new setTwo();
    }else if (e.code == "ArrowRight"){
        slideRight();
        setTwo();
    }else if (e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }else if (e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
})

function filterZero(row){
    return row.filter(num => num !=0)  //cria um novo array sem os valores zero 
}

function slide(row) {  //slide   onde a magica acontece
    //[0,2,2,2]
    row = filterZero(row);
    for (let i=0; i < row.length-1; i++){
        //verifica cada linha 
        if(row[i] == row[i+1]){ // se a linah for igual a linha do lado 
            row[i]*=2;  // multiplica o numero por 2  "merge"    >>> aqui estava o erro 
            row[i+1] = 0; // o numero do lado e igual a zero 
            score += row[i] //acrecenta valor no score
        }
    }
    row = filterZero(row)   //[4,2]
    while (row.length <columns) {//adiciona os zeros nos campos vazios 
        row.push(0);    //[4,2,0,0]
    }
    return row;
}

function slideLeft(){
    for (let r= 0; r<rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] =row;

        for ( let c =0; c < columns ; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board [r][c];
            updateTile(tile,num);
        }
    }
};

function slideRight(){
    for (let r= 0; r<rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] =row;

        for ( let c =0; c < columns ; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board [r][c];
            updateTile(tile,num);
        }
    }
};

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
       
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}





function setTwo(){
    if (!hasEmpyTyle()){
        return;
    }
    let found = false;
    while (!found){ //enquanto nao for found
        // numero randimico r,c para colocar um 2 dentro
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
            if (board[r][c] == 0) {
                board[r][c] = 2;
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                tile.innerText = "2";
                tile.classList.add("x2");
                found = true;
            }
    }
}




function hasEmpyTyle(){ // return true if find empy tile 
    let count = 0;
    for (let r=0;r<rows;r++){  //loop no board para verificar se tem alguma coisa igual a zero
        for (let c = 0;c<columns;c++){
            if (board [r][c] == 0){
                return true;
            }
        }
    } return false;
}