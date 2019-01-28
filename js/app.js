// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 550) { //if enemy has not crossed boundry
      this.x += this.speed * dt;   //move forward increase spped * dt
    } else {
      this.x = -100;  //reset to start point
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Place the enemy object in a variable called enemybug
const enemyBug1 = new Enemy(-140, 62, 60);
const enemyBug2 = new Enemy(-300, 145, 40);
const enemyBug3 = new Enemy(-150, 228, 75);
const enemyBug4 = new Enemy(-440, 62, 60);
const enemyBug5 = new Enemy(-600, 145, 40);
const enemyBug6 = new Enemy(-250, 228, 75);
const enemyBug7 = new Enemy(-550, 228, 75);


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
allEnemies.push(enemyBug1, enemyBug2, enemyBug3, enemyBug4, enemyBug5, enemyBug6, enemyBug7);


// Boat our player must get on to win
var Boat = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 580;
    this.y = 8;
    this.sprite = 'images/boat.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Boat.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= -250) {
      this.x -= 30 * dt;
    } else {
      this.x = 500;
    }
};


// Draw the enemy on the screen, required method for game
Boat.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Place the player object in a variable called player
const boat = new Boat();


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Char {
    constructor() {
      this.x = 200;
      this.y = 400;
      this.horizontal = 83;
      this.vertical = 101;
      this.sprite = 'images/char-pink-girl.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(input) {
      switch(input) {
        case 'left':
        if (this.x >= 1) {
          this.x -= 100;
        }
          break;
        case 'right':
        if (this.x <= 350) {
          this.x += 100;
        }
          break;
        case 'up':
        if (this.y >= 1) {
          this.y -= 82;
        }
          break;
        case 'down':
        if (this.y <= 350) {
          this.y += 82;
        }
          break;
      }
    }
}

// Place the player object in a variable called player
const player = new Char();

// Calls the check collisions b/w player and enemies/boat
function checkCollisions() {
    checkWin();
    allEnemies.forEach(function(enemy) {
        if( (player.y >= enemy.y-10 && player.y <= enemy.y+10) &&
            (player.x >= enemy.x-50 && player.x <= enemy.x+60) )
          {
            player.x = 200;
            player.y = 400;
         }
       });
     }

// Checks if player has reached the boat or water
function checkWin() {
  setTimeout(function(){
       if  ((player.y >= -11 && player.y <= 11) &&
            (player.x >= boat.x-45 && player.x <= boat.x+100 ))
          {
            victory();// Modal appears after Win
            player.x = 200;
            player.y = 400;
         }
       else if ((player.y === -10) && !(player.x >= boat.x-5 && player.x <= boat.x+100 ))
       {
           player.x = 200;// Player sent back if touches water
           player.y = 400;
       }
     }, 3000);
       }


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that restarts the game
var btn = document.getElementById("button");

// Open the model when player wins
function victory() {
    modal.style.display = "block";
}

// When the user clicks on the button, restars the game
btn.onclick = function() {
  modal.style.display = "none";
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
