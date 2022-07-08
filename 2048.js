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