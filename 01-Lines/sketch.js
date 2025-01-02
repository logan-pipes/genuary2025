/*
 * Genuary Day 1
 * Vertical or horizontal lines only.
 *
 * Logan Pipes
 */

let length_mod = 0.3;
let repro_mod = 0.8;
let x_mult_from_dir = [1, 0,-1, 0];
let y_mult_from_dir = [0,-1, 0, 1];

function setup() {
    createCanvas(400,400);
    background(255);

    spawn(200, 350, 1, 250, 1);
}

function mouseClicked() {
    setup();
}

function spawn(x, y, direction, length, reproduction_number) {
    let endX = x + x_mult_from_dir[direction] * length;
    let endY = y + y_mult_from_dir[direction] * length;
    line(x,y,endX,endY);

    let num_children = Math.floor((random()*reproduction_number) / 0.1);
    for (let i = 0; i < num_children; i++) {
        let dist_from_root = random()*length;

        let newX = x + x_mult_from_dir[direction] * dist_from_root;
        let newY = y + y_mult_from_dir[direction] * dist_from_root;

        let newDir = (direction + random( [-1,1] )) % 4;
        if (newDir < 0) newDir += 4;

        spawn(newX, newY, newDir, length*length_mod, reproduction_number*repro_mod);
    }
}
