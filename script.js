const win_possible_moves = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let last_text = document.querySelector(".big_box");
let inner_text = document.querySelectorAll(".box");

let reset_btn = document.querySelector(".buton1");
let new_btn = document.querySelector(".buton2");

let player1_win_element = document.querySelector(".par1");
let player2_win_element = document.querySelector(".par2");

let winner = false;

const new_game_btn = () => {
    turn = true;
    player.innerText = "Player 1 turn !";
    enable();
}
const reset = () => {
    confirm("It will remove all current data !");
    turn = true;
    player.innerText = "Player 1 turn !";
    enable();
    for_reset_btn();
}

let turn = true;
let end_line = document.querySelector(".btn");
let player = document.createElement("p");
player.style.fontSize = "30px";
player.style.color = "aliceblue";
player.style.marginTop = "20px";
player.innerText = "Player 1 turn !";
end_line.after(player);

inner_text.forEach ((box) => {
    box.addEventListener( "click", ()  => {
        if (turn){
            player.innerText = "Player 2 turn !";
            end_line.after(player);
            box.innerText = "O";
            turn = false;
        }else{
            player.innerText = "Player 1 turn !";
            end_line.after(player);
            box.innerText = "X";
            turn = true;
        }
        box.disabled = true;
        checkWinner();
        draw();
    });
});

let player1_score = 0;
let player2_score = 0;

const checkWinner = () => {
    for (let win of win_possible_moves){
        let a = inner_text[win[0]].innerText;
        let b = inner_text[win[1]].innerText;
        let c = inner_text[win[2]].innerText;

        if(a != '' && b != '' && c != ''){
            if(a === b && b === c){
                player.innerText = `Winner is ${a}`;
                winner = true;
                disable();
            }
            if (a === b && b === c && a === 'O'){
                player1_score++;
                player1_win_element.innerText = `Player 1 wins : ${player1_score}`;
            }else if (a === b && b === c && a === 'X'){
                player2_score++;
                player2_win_element.innerText = `Player 2 wins : ${player2_score}`;
            }
        }
    }
}

let checkWinner_condition = checkWinner();
const draw = () => {
    let drawmoves = 0;
    for(let box of inner_text){
        if(box.innerText != ""){
            drawmoves++;
        }
    }
    if (drawmoves === 9 && winner != true){
        player.innerText = `It's a draw`;
        disable();
    }
}

const disable = () => {
    for(let box of inner_text){
        box.disabled = true;
    }
}
const enable = () => {
    for(let box of inner_text){
        box.disabled = false;
        box.innerText = "";
    }
}

const for_reset_btn = () => {
    player1_score = 0;
    player2_score = 0;
    player1_win_element.innerText = "";
    player2_win_element.innerText = "";
}
new_btn.addEventListener("click", new_game_btn);
reset_btn.addEventListener("click", reset);