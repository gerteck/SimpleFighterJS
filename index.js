const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
// c stands for context. Shortened for convenience.

canvas.width = 1024;
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);


const gravity = 0.7;


class Sprite {

    // constructor is a method that runs when we create a new instance of a class
    constructor({position, velocity, color}){
        this.position = position;
        this.velocity = velocity;
        this.height = 100;
        this.lastKey;

        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50,
        }
        this.color = color;
    }

    draw(){
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, 50, 100);

        // attack box
        c.fillStyle = 'blue';
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height > canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }


    }

}


const player = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 10,
    },
    color: 'red',
});

const enemy = new Sprite({ 
    position: {
        x: 400,
        y: 400,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    color: 'green',
});

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },

    ArrowLeft: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
}

const SPEED = 5;

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;
    
    // player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -SPEED;
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = SPEED;
    }

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -SPEED;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = SPEED;
    }

}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
            player.velocity.y = -20;
            break;


        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20;
            break;
    }

});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }

    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }

});





