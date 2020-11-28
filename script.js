const canvas = document.getElementById('snake');
const context = canvas.getContext('2d');
const square = 32;
const snake = [
    {
        x:8 * square,
        y:8 * square,
    }
];
let direction = 'right';
let food = {
    x: Math.floor(Math.random() * 15 + 1) * square,
    y: Math.floor(Math.random() * 15 + 1) * square,
}

function createBackground(){
    context.fillStyle = '#ccc';
    context.fillRect(0 ,0 ,16* square,16 * square)
}

function createSnake(){
    for (let i = 0; i < snake.length;i++){
        context.fillStyle = '#000';
        context.fillRect(snake[i].x,snake[i].y,square,square)
    }
}

function drawFood(){
    context.fillStyle = '#f00';
    context.fillRect(food.x, food.y, square ,square)
}

document.addEventListener('keydown',update);

function update(event){
    let controls = {
        ArrowDown(){
            direction = 'down'
        },
        ArrowUp(){
            direction = 'up'
        },
        ArrowRight(){
            direction = 'right';
        },
        ArrowLeft(){
            direction = 'left'
        }
    }
    if(!controls[event.key]) return;
    controls[event.key]();
}

function initGame(){
    createBackground();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX >= 512) snakeX = 1;
    if(snakeY >= 512) snakeY = 1;
    if(snakeX <= 0) snakeX = 512;
    if(snakeY <= 0) snakeY = 512;

    if(direction == 'right') snakeX += square;
    if(direction == 'left') snakeX -= square;
    if(direction == 'up') snakeY -= square;
    if(direction == 'down') snakeY += square;

    if(snakeX != food.x || snakeY != food.y) snake.pop();
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * square;
        food.y = Math.floor(Math.random() * 15 + 1) * square;
    }

    snake.unshift({ x: snakeX, y: snakeY });
}

const game = setInterval(initGame,100);