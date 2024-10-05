let currentPlayer='';
let gameActive=false;
let board=["","","","","","","","",""];
let winConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let gameMode='';
document.getElementById('choose-x').addEventListener('click',()=>selectPlayer('X'));
document.getElementById('choose-o').addEventListener('click',()=>selectPlayer('O'));
document.getElementById('human-vs-human').addEventListener('click',()=>setGameMode('human'));
document.getElementById('human-vs-computer').addEventListener('click',()=>setGameMode('ai'));
function setGameMode(mode){
    gameMode=mode;
    document.getElementById('mode-selection').style.display='none'; 
    document.getElementById('player-selection').style.display='block';
}
function selectPlayer(player){
    currentPlayer=player;
    gameActive=true;
    document.getElementById('status').innerText =`You selected ${player}.Game started!`;
    document.getElementById('player-selection').style.display='none';
    document.getElementById('game-board').style.pointerEvents='auto';
}
function resetGame(){
    board = ["","","","","","","","",""];
    gameActive=false;
    document.querySelectorAll('.cell').forEach(cell=>{
        cell.innerText='';
        cell.classList.remove('x', 'o');
    });
    document.getElementById('status').innerText='Select mode to start the game.';
    document.getElementById('mode-selection').style.display='block'; 
    document.getElementById('player-selection').style.display='none'; 
    document.getElementById('game-board').style.pointerEvents='none'; 
}
function handleCellClick(clickedCellIndex){
    if(board[clickedCellIndex]!==""||!gameActive) return;
    board[clickedCellIndex]=currentPlayer;
    const clickedCell=document.querySelector(`.cell[data-index="${clickedCellIndex}"]`);
    clickedCell.innerText=currentPlayer;
    clickedCell.classList.add(currentPlayer==='X'?'x':'o');
    if(checkWin()){
        document.getElementById('status').innerText = `${currentPlayer} wins!`;
        gameActive=false;
        return;
    }
    else if(!board.includes("")){
        document.getElementById('status').innerText=`It's a draw!`;
        gameActive=false;
        return;
    }
    currentPlayer=currentPlayer==='X'?'O':'X';
    document.getElementById('status').innerText=`It's ${currentPlayer}'s turn`;
    if(gameMode==='ai'&&currentPlayer!=='X'){
        setTimeout(aiMove,500);
    }
}
function aiMove(){
    let emptyCells=board.map((val,index)=>val===""?index:null).filter(val=>val!==null);
    let randomCell=emptyCells[Math.floor(Math.random()*emptyCells.length)];
    handleCellClick(randomCell);
}
function checkWin(){
    for (let i=0;i<winConditions.length;i++) {
        const[a,b,c]=winConditions[i];
        if(board[a]&&board[a]===board[b]&&board[a]===board[c]){
            return true;
        }
    }
    return false;
}
document.querySelectorAll('.cell').forEach((cell,index)=>{
    cell.addEventListener('click',()=>handleCellClick(index));
});
document.getElementById('game-board').style.pointerEvents='none';
document.getElementById('reset').addEventListener('click',resetGame);
