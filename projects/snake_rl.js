class SnakeRL {
    constructor() {
        this.canvas = document.getElementById('snakeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.cols = Math.floor(this.canvas.width / this.gridSize);
        this.rows = Math.floor(this.canvas.height / this.gridSize);
        
        // Calculate middle position of the grid
        const middleX = Math.floor(this.cols / 2);
        const middleY = Math.floor(this.rows / 2);
        
        this.snake = [
            {x: middleX, y: middleY},
            {x: middleX - 1, y: middleY},
            {x: middleX - 2, y: middleY},
            {x: middleX - 3, y: middleY},
            {x: middleX - 4, y: middleY}
        ];
        this.food = this.generateFood();
        this.direction = 'right';
        this.score = 0;
        this.episodes = 1;
        this.learningRate = 0.1;
        this.qTable = {};
        this.epsilon = 0.3;
        
        this.gameLoop = null;
        this.startGame();
    }

    generateFood() {
        let food;
        const head = this.snake[0];
        
        // Always place food within reasonable distance from head to prevent timeouts
        const maxDistance = 8; // Maximum distance from head
        do {
            food = {
                x: head.x + Math.floor(Math.random() * (2 * maxDistance + 1)) - maxDistance,
                y: head.y + Math.floor(Math.random() * (2 * maxDistance + 1)) - maxDistance
            };
            // Ensure food is within bounds
            food.x = Math.max(0, Math.min(this.cols - 1, food.x));
            food.y = Math.max(0, Math.min(this.rows - 1, food.y));
        } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
        
        return food;
    }

    getState() {
        const head = this.snake[0];
        const food = this.food;
        
        // Calculate relative positions
        const foodDirX = food.x > head.x ? 1 : food.x < head.x ? -1 : 0;
        const foodDirY = food.y > head.y ? 1 : food.y < head.y ? -1 : 0;
        
        // Check danger in each direction
        const dangerUp = this.isCollision(head.x, head.y - 1);
        const dangerDown = this.isCollision(head.x, head.y + 1);
        const dangerLeft = this.isCollision(head.x - 1, head.y);
        const dangerRight = this.isCollision(head.x + 1, head.y);
        
        return `${foodDirX},${foodDirY},${dangerUp},${dangerDown},${dangerLeft},${dangerRight}`;
    }

    isCollision(x, y) {
        // Wall collision
        if (x < 0 || x >= this.cols || y < 0 || y >= this.rows) return true;
        // Self collision
        return this.snake.some(segment => segment.x === x && segment.y === y);
    }

    getAction(state) {
        if (Math.random() < this.epsilon) {
            // Exploration: random action
            return ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)];
        } else {
            // Exploitation: best action from Q-table
            if (!this.qTable[state]) {
                this.qTable[state] = {up: 0, down: 0, left: 0, right: 0};
            }
            return Object.keys(this.qTable[state]).reduce((a, b) => 
                this.qTable[state][a] > this.qTable[state][b] ? a : b);
        }
    }

    updateQValue(state, action, reward, nextState) {
        if (!this.qTable[state]) {
            this.qTable[state] = {up: 0, down: 0, left: 0, right: 0};
        }
        if (!this.qTable[nextState]) {
            this.qTable[nextState] = {up: 0, down: 0, left: 0, right: 0};
        }
        
        const maxNextQ = Math.max(...Object.values(this.qTable[nextState]));
        this.qTable[state][action] += this.learningRate * (reward + 0.9 * maxNextQ - this.qTable[state][action]);
    }

    move() {
        const state = this.getState();
        const action = this.getAction(state);
        
        const head = {...this.snake[0]};
        switch(action) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }
        
        let reward = -1; // Small penalty for each move
        let gameOver = false;
        // let collisionType = '';
        
        // Check collision
        if (this.isCollision(head.x, head.y)) {
            reward = -100;
            gameOver = true;
            
            // // Determine collision type for debugging
            // if (head.x < 0 || head.x >= this.cols || head.y < 0 || head.y >= this.rows) {
            //     collisionType = 'wall';
            // } else {
            //     collisionType = 'self';
            // }
            
            // console.log(`Game Over - Episode ${this.episodes}: ${collisionType} collision at (${head.x}, ${head.y}), Score: ${this.score}`);
        } else {
            this.snake.unshift(head);
            
            // Check if food eaten
            if (head.x === this.food.x && head.y === this.food.y) {
                reward = 100;
                this.score += 10;
                this.food = this.generateFood();
                // console.log(`Food eaten! Score: ${this.score}, Snake length: ${this.snake.length}`);
            } else {
                this.snake.pop();
            }
        }
        
        const nextState = this.getState();
        this.updateQValue(state, action, reward, nextState);
        
        if (gameOver) {
            this.resetGame();
        }
        
        this.updateStats();
    }

    resetGame() {
        // Calculate middle position of the grid
        const middleX = Math.floor(this.cols / 2);
        const middleY = Math.floor(this.rows / 2);
        
        this.snake = [
            {x: middleX, y: middleY},
            {x: middleX - 1, y: middleY},
            {x: middleX - 2, y: middleY},
            {x: middleX - 3, y: middleY},
            {x: middleX - 4, y: middleY}
        ];
        this.food = this.generateFood();
        this.direction = 'right';
        this.episodes++;
        this.epsilon = Math.max(0.01, this.epsilon * 0.995); // Decay exploration
    }

    updateStats() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('episodes').textContent = this.episodes;
        document.getElementById('learning-rate').textContent = this.learningRate.toFixed(2);
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw snake
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                // Head: dark cyan
                this.ctx.fillStyle = '#006064';
            } else {
                // Body: light cyan
                this.ctx.fillStyle = '#00bcd4';
            }
            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });
        
        // Draw food (red)
        this.ctx.fillStyle = '#f44336';
        this.ctx.fillRect(
            this.food.x * this.gridSize + 2,
            this.food.y * this.gridSize + 2,
            this.gridSize - 4,
            this.gridSize - 4
        );
    }

    startGame() {
        this.gameLoop = setInterval(() => {
            this.move();
            this.draw();
        }, 100);
    }
}

// Initialize Snake RL when page loads
window.addEventListener('DOMContentLoaded', () => {
    new SnakeRL();
}); 