// Game Constants and Variables


let direction ={x:0,y:0};
const foodSound= new Audio('music/food.mp3');
const gameOverSound=new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

let speed=5;
let lastPaintTime=0;
let score=0;
let snakeArr=[
    {
        x:13,y:15
    }
];

food = {x:6 , y:7};


// Game function
function main(ctime)
{
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if(((ctime-lastPaintTime)/1000) <(1/speed))
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}


function isCollide(snake)
{
    //bump with itself
    for(let i=1;i<snake.length;i++)
    {
        if(snake[0].x===snake[i].x && snake[0].y===snake[i].y)
        {
            return true;
        }
    }
    //bump with wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
    {
        return true;
    }
    return false;
}

function gameEngine()
{
    musicSound.play();
    //Part 1: Updating the snake  & Food
    if(isCollide(snakeArr))
    {
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game over . Press any key to play again!");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
        ScoreBox.innerHTML = "Score : " + score;
    }
    //If you have eaten the food , increment the score
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y)
    {
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        score+=1;
        if(score>High_score_val)
        {
            High_score_val=score;
            localStorage.setItem("High_score", JSON.stringify(High_score_val));
            High_Score_Box.innerHTML = "High Score : " + High_score_val;

        }
        ScoreBox.innerHTML="Score : " +score;
    }
    //Moving the snake
    for(let i=snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;


    //Part 2: Display the snake and Food
    // Display the food
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');//used to create element - div type
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
       // snakeElement.classList.add('snake');//used to add class 
        if(index===0)
        {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);//used to append snakeElement to the board
    });

    // Display the food
    
    foodElement = document.createElement('div');//foodElement element get created of div type
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);//used to append foodElement to the board

}




let High_score = localStorage.getItem("High_score");
if (High_score === null) {
    High_score_val = 0;
    localStorage.setItem("High_score", JSON.stringify(High_score_val));
}
else {
    // High_score_val=high
    High_score_val =JSON.parse(High_score); 
    High_Score_Box.innerHTML = "High Score : " + High_score_val;
}





//Main logic starts here
window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir={x:0 ,y:1} //Start the game
    moveSound.play();

    switch(e.key)
    {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = +1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = +1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});