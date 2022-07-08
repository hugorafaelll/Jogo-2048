let board;
let score = 0;
let rows = 4 ;
let colums = 4;

window.onload=function () {
    setGame();
}

function setGame(){
    // board = [
    //     [0,0,0,0],
    //     [0,0,0,0],
    //     [0,0,0,0],
    //     [0,0,0,0]
    // ]
    board = [
        [2,2,2,2],
        [2,2,4,4],
        [8,8,16,16],
        [64,64,128,128]
    ]

    for (let r=0; r<rows; r++) {
        for (let c=0;c<colums; c++){
            //criar <div id="0-0"></div> para cada box 
            let tile = document.createElement("div");
            tile.id = r.toString() + "-"+ c.toString();
            let num = board[r][c];
            updateTile(tile,num);
            document.getElementById("board").append(tile)
        }
    }
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
    }
})

function filterZero(row){
    return row.filter(num => num !=0)  //cria um novo array sem os valores zero 
}

function slide(row) {
    //[0,2,2,2]
    row = filterZero(row);

    //slide   onde a magica acontece
    for (let i=0; i < row.length ; i++){
        //verifica cada linha 
        if(row[i] == row[i+1]){ // se a linah for igual a linha do lado 
            row[i]*2;  // multiplica o numero por 2  "merge"
            row[i+1] = 0; // o numero do lado e igual a zero 
            score += row[i] //acrecenta valor no score
        }
    }
    row = filterZero(row)   //[4,2]
    while (row.length <colums) {//adiciona os zeros nos campos vazios 
        row.push(0);    //[4,2,0,0]
    }
    return row;
}

function slideLeft(){
    for (let r= 0; r<rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] =row;

        for ( let c =0; c < colums ; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board [r][c];
            updateTile(tile,num);
        }
    }
};