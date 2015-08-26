// Enemies our player must avoid
var Enemy = function(Xloc, Yloc, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    'use strict';
    this.sprite = 'images/enemy-bug.png';
    this.x = Xloc;
    this.y = Yloc;
    this.speed = speed;
    this.width = 101;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //console.log(this.x);
    this.x += this.speed*dt;
     if(this.x > (405+101)){
       this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.reset = function(){
    'use strict';
    this.x = 0;
    this.speed = Math.floor((Math.random() * 100)) + 1;//Generate speed between 1 and 50

};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(Xloc, Yloc){

    'use strict';

    this.sprite = 'images/char-boy.png';
    this.x = Xloc;
    this.y = Yloc;
    this.width = 101;
    this.score = 0;

};

Player.prototype.update = function(dt){
    //Update player position
    'use strict';

};

Player.prototype.render = function(){
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(userInput){
    'use strict';
    if(userInput=='up' && this.y > 60){
        this.y -= 80;
        console.log(this.y);
    } else if(userInput=='down' && this.y < 380){
        this.y += 80;
    } else if(userInput=='left' && this.x > 5){
        this.x -= 100;
    } else if(userInput=='right' && this.x < 405){
        this.x += 100;

    } else if(this.y==60){ //Reach the water
        this.score += 10;
        this.reset();
        console.log("score" + player.score);
    }

};

Player.prototype.reset = function(){
    'use strict';
    this.x = 205;
    this.y = 380;
    this.render();
};

//Gem Class

var Gem = function(Xloc, Yloc, color) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    'use strict';
    this.sprite = 'images/Gem ' + color + '.png';
    this.x = Xloc;
    this.y = Yloc;
    this.width = 101;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Gem.prototype.update = function(dt) {
    'use strict';
};

// Draw the enemy on the screen, required method for game
Gem.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.reset = function(){
    'use strict';
    this.x = -500;

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Define a random speed for every enemy
var speedEnemy1 = (Math.floor(Math.random() * 10) + 1)*10;
var speedEnemy2 = (Math.floor(Math.random() * 10) + 1)*10;
var speedEnemy3 = (Math.floor(Math.random() * 10) + 1)*10;
var speedEnemy4 = (Math.floor(Math.random() * 10) + 1)*10;

var allEnemies = [
    new Enemy(0,60, speedEnemy1),
    new Enemy(0,140, speedEnemy2),
    new Enemy(0,60, speedEnemy3),
    new Enemy(0,220, speedEnemy4)
];

var player = new Player(205,380);
var allGems = [
    new Gem(304,60, 'Blue'),
    new Gem(102,140, 'Green'),
    new Gem(203,220, 'Orange')
];
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    'use strict';
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Check when the character collides with an enemy or a gem
function checkCollisions(){
    'use strict';
    //console.log("checkCollisions");
    allEnemies.forEach(function(enemy) {
            if(enemy.y === player.y){
                if(((enemy.x + enemy.width)>(player.x) && (enemy.x + enemy.width)<(player.x + player.width)) || ((enemy.x)>(player.x) && (enemy.x)<(player.x + player.width))){
                    console.log('BAM!');
                    player.score = 0;
                    console.log('score' + player.score);
                    player.reset();
                }
            }
        });


    allGems.forEach(function(gem) {
        if(gem.y === player.y){
            if(((player.x + player.width)>(gem.x + 4) && (player.x + player.width)<(gem.x + gem.width)) || ((player.x)>(gem.x) && (player.x)<(gem.x + gem.width))){
                console.log('YES!');
                player.score += 5;
                console.log('score' + player.score);
                gem.reset();
            }
        }
    });
}

//Update the score value
function updateScore(scoreValue){
    'use strict';
    score.innerHTML = scoreValue;
}

//This function captures the position of the mouse when the user click
function handleMouseClick(evt) {
    'use strict';
        var x = evt.clientX - canvas.offsetLeft;
        var y = evt.clientY - canvas.offsetTop;

        //Locate each character in the canvas and change the sprite in each case.
        if(y>438 && y<560){
            if(x>0 && x<100){
                //'images/char-boy.png'
                player.sprite = 'images/char-boy.png';

            }else if(x>101 && x<200){
                player.sprite = 'images/char-cat-girl.png';

            }else if(x>201 && x<300){
                player.sprite = 'images/char-horn-girl.png';

            }else if(x>301 && x<400){
                player.sprite = 'images/char-pink-girl.png';

            }else if(x>401 && x<500){
                player.sprite = 'images/char-princess-girl.png';
            }
            player.render();
        }
}
