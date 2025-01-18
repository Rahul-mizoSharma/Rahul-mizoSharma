const player = document.getElementById('player');
const bullet = document.getElementById('bullet');
const gameArea = document.getElementById('gameArea');

let bulletInterval;
let enemyInterval;
let enemies = []; // Array to keep track of enemies

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        movePlayer(-10);
    } else if (event.key === 'ArrowRight') {
        movePlayer(10);
    } else if (event.key === ' ') {
        shoot();
    }
});

function movePlayer(direction) {
    const playerRect = player.getBoundingClientRect();
    const gameAreaRect = gameArea.getBoundingClientRect();
    
    if (playerRect.left + direction >= gameAreaRect.left && 
        playerRect.right + direction <= gameAreaRect.right) {
        player.style.left = `${player.offsetLeft + direction}px`;
    }
}

function shoot() {
    bullet.style.display = 'block';
    bullet.style.left = `${player.offsetLeft + 22}px`; // Center the bullet
    bullet.style.bottom = '60px'; // Position above the player

    clearInterval(bulletInterval);
    bulletInterval = setInterval(() => {
        const bulletBottom = parseInt(bullet.style.bottom);
        if (bulletBottom < gameArea.offsetHeight) {
            bullet.style.bottom = `${bulletBottom + 5}px`; // Move bullet up
            checkBulletCollision(); // Check for collisions with enemies
        } else {
            clearInterval(bulletInterval);
            bullet.style.display = 'none'; // Hide bullet when it goes out of bounds
        }
    }, 20);
}

// Function to spawn enemies
function spawnEnemy() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = `${Math.random() * (gameArea.offsetWidth - 30)}px`; // Random horizontal position
    enemy.style.top = '0px'; // Start from the top
    gameArea.appendChild(enemy);
    enemies.push(enemy); // Add enemy to the array

    let enemyInterval = setInterval(() => {
        const enemyBottom = parseInt(enemy.style.top) || 0;
        if (enemyBottom < gameArea.offsetHeight) {
            enemy.style.top = `${enemyBottom + 2}px`; // Move enemy down
            checkPlayerCollision(enemy); // Check for collision with player
        } else {
            clearInterval(enemyInterval);
            gameArea.removeChild(enemy); // Remove enemy when it goes out of bounds
            enemies = enemies.filter(e => e !== enemy); // Remove from array
        }
    }, 20);
}

// Check for bullet collision with enemies
function checkBulletCollision() {
    const bulletRect = bullet.getBoundingClientRect();
    enemies.forEach(enemy => {
        const enemyRect = enemy.getBoundingClientRect();
        if (bulletRect.bottom <= enemyRect.bottom &&
            bulletRect.top >= enemyRect.top &&
            bulletRect.right >= enemyRect.left &&
            bulletRect.left <= enemyRect.right) {
            // Collision detected
            gameArea.removeChild(enemy); // Remove enemy
            bullet.style.display = 'none'; // Hide bullet
            clearInterval(bulletInterval); // Stop bullet movement
            enemies = enemies.filter(e => e !== enemy); // Remove from array
        }
    });
}

// Check for player collision with enemies
function checkPlayerCollision(enemy) {
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();
    if (playerRect.bottom >= enemyRect.top &&
        playerRect.top <= enemyRect.bottom &&
        playerRect.right >= enemyRect.left &&
        playerRect.left <= enemyRect.right) {
        // Collision detected
        alert("Game Over! You were hit by an enemy."); // Game over message
        resetGame(); // Reset the game
    }
}

// Reset the game
function resetGame() {
    // Remove all enemies
    enemies.forEach(enemy => gameArea.removeChild(enemy));
    enemies = [];
    bullet.style.display = 'none'; // Hide bullet
    clearInterval(bulletInterval); // Stop bullet movement
}

// Start spawning enemies at intervals
setInterval(spawnEnemy, 2000); // Spawn an enemy every 2 seconds
